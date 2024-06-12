import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

import { extendServerRpc, onDevToolsInitialized, startSubprocess } from '@nuxt/devtools-kit'
import type { Resolver } from '@nuxt/kit'
import type { Nuxt } from 'nuxt/schema'
import { resolve } from 'pathe'
import terminate from 'terminate'

import {
	RPC_NAMESPACE,
	SliceMachineStatus,
	type ISlicemachineServerFunctions,
	type ISlicemachineClientFunctions,
} from './types'

const DEVTOOLS_UI_ROUTE = '/__prismic-client'
const DEVTOOLS_UI_LOCAL_PORT = 3300

let subProcess: null | ReturnType<typeof startSubprocess> = null

const stopSubprocess = () => {
	if (subProcess) {
		const pid = subProcess.getProcess().pid
		if (pid) {
			terminate(pid)
		}
		subProcess.terminate()
		subProcess = null
	}
}

export const setupDevToolsUI = (nuxt: Nuxt, resolver: Resolver) => {
	const clientPath = resolver.resolve('./client')
	const isProductionBuild = existsSync(clientPath)

	if (isProductionBuild) {
		// Serve production-built client (used when package is published)
		nuxt.hook('vite:serverCreated', async (server) => {
			const sirv = await import('sirv').then(r => r.default || r)
			server.middlewares.use(
				DEVTOOLS_UI_ROUTE,
				sirv(clientPath, { dev: true, single: true }),
			)
		})
	}
	else {
		// In local development, start a separate Nuxt Server and proxy to serve the client
		nuxt.hook('vite:extendConfig', (config) => {
			config.server = config.server || {}
			config.server.proxy = config.server.proxy || {}
			config.server.proxy[DEVTOOLS_UI_ROUTE] = {
				target: `http://localhost:${DEVTOOLS_UI_LOCAL_PORT}${DEVTOOLS_UI_ROUTE}`,
				changeOrigin: true,
				followRedirects: true,
				rewrite: path => path.replace(DEVTOOLS_UI_ROUTE, ''),
			}
		})
	}

	nuxt.hooks.hook('close', () => {
		stopSubprocess()
	})
	process.on('exit', () => {
		stopSubprocess()
	})

	onDevToolsInitialized(() => {
		const rpc = extendServerRpc<ISlicemachineClientFunctions, ISlicemachineServerFunctions>(
			RPC_NAMESPACE,
			{
				async getSlicemachineConfig() {
					const configPath = resolve(nuxt.options.rootDir, 'slicemachine.config.json')

					if (existsSync(configPath)) {
						return JSON.parse(await readFile(configPath, 'utf-8'))
					}

					return null
				},

				isSliceMachineStarted() {
					return subProcess !== null
				},

				startSliceMachine() {
					stopSubprocess()

					subProcess = startSubprocess({
						command: 'npx',
						args: ['start-slicemachine'],
						cwd: nuxt.options.rootDir,
					}, {
						id: 'slicemachine',
						name: 'SliceMachine',
						icon: 'cib:prismic',
					}, nuxt)

					rpc.broadcast.updateStatus(SliceMachineStatus.STARTED)
					return SliceMachineStatus.STARTED
				},
				stopSliceMachine() {
					stopSubprocess()

					rpc.broadcast.updateStatus(SliceMachineStatus.STOPPED)
					return SliceMachineStatus.STOPPED
				},
			})
	})

	nuxt.hook('devtools:customTabs', (tabs) => {
		tabs.push({
			// unique identifier
			name: 'prismic',
			// title to display in the tab
			title: 'Prismic',
			// any icon from Iconify, or a URL to an image
			icon: 'logos:prismic-icon',
			// iframe view
			view: {
				type: 'iframe',
				src: DEVTOOLS_UI_ROUTE,
			},
		})
	})
}
