import type { Nuxt } from 'nuxt/schema'
import { existsSync } from 'fs'
import type { Resolver } from '@nuxt/kit'
import { extendServerRpc, onDevToolsInitialized, } from '@nuxt/devtools-kit'
import { SliceMachineStatus, type ISlicemachineServerFunctions, type RpcServerType, type ISlicemachineClientFunctions } from "./types"
import { startSubprocess } from '@nuxt/devtools-kit'
import terminate from "terminate"

const DEVTOOLS_UI_ROUTE = '/__prismic-client'
const DEVTOOLS_UI_LOCAL_PORT = 3300
const RPC_NAMESPACE = 'prismic-slicemachine-rpc'

let process: null | ReturnType<typeof startSubprocess> = null

export function setupDevToolsUI(nuxt: Nuxt, resolver: Resolver) {
  const clientPath = resolver.resolve('./client')
  const isProductionBuild = existsSync(clientPath)

  nuxt.hooks.hook('close', () => {
    if (process) {
      const pid = process.getProcess().pid
      if (pid) {
        terminate(pid)
      }
      process.terminate()
    }
  })

  onDevToolsInitialized(async () => {
    const root = nuxt.options.rootDir
    const rpc = extendServerRpc<ISlicemachineClientFunctions, ISlicemachineServerFunctions>(RPC_NAMESPACE, {
      isSliceMachineStarted() {
        return process !== null
      },
      async startSliceMachine() {
        if (process) {
          const pid = process.getProcess().pid
          if (pid) {
            terminate(pid)
          }
          process.terminate()
        }
        process = startSubprocess({
          command: `npx`,
          args: ['start-slicemachine'],
          cwd: root,
        }, {
          id: 'slicemachine',
          name: 'SliceMachine',
          icon: 'cib:prismic'
        }, nuxt)

        rpc.broadcast.updateStatus(SliceMachineStatus.STARTED)
        return SliceMachineStatus.STARTED
      },
      async stopSliceMachine() {
        if (process) {
          const pid = process.getProcess().pid
          if (pid) {
            terminate(pid)
          }
          process = null

          rpc.broadcast.updateStatus(SliceMachineStatus.STOPPED)
          return SliceMachineStatus.STOPPED
        }

        return SliceMachineStatus.NO_CHANGE
      }
    })
  })

  // Serve production-built client (used when package is published)
  if (isProductionBuild) {
    nuxt.hook('vite:serverCreated', async (server) => {
      const sirv = await import('sirv').then((r) => r.default || r)
      server.middlewares.use(
        DEVTOOLS_UI_ROUTE,
        sirv(clientPath, { dev: true, single: true }),
      )
    })
  }
  // In local development, start a separate Nuxt Server and proxy to serve the client
  else {
    nuxt.hook('vite:extendConfig', (config) => {
      config.server = config.server || {}
      config.server.proxy = config.server.proxy || {}
      config.server.proxy[DEVTOOLS_UI_ROUTE] = {
        target: 'http://localhost:' + DEVTOOLS_UI_LOCAL_PORT + DEVTOOLS_UI_ROUTE,
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(DEVTOOLS_UI_ROUTE, ''),
      }
    })
  }

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
