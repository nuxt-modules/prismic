/* eslint-disable no-undef */
const Prismic = require('prismic-javascript');
const prismicNuxt = require('../src');

jest.mock('prismic-javascript');

Prismic.client = jest.fn(async () => ({
  async query() {
    const data = require('./__mockData__') // eslint-disable-line
    return data;
  },
}));

describe('prismic-nuxt module', () => {
  let context;
  let moduleOptions;

  beforeEach(() => {
    context = {
      addPlugin: jest.fn(),
      options: {
        head: {},
        generate: {},
      },
      nuxt: {
        hook: jest.fn(async (_, fn) => {
          await fn();
        }),
      },
    };

    moduleOptions = {
      endpoint: 'http://test',
      linkResolver: (doc) => {
        if (doc.type === 'page') {
          return `/pages/${doc.uid}`;
        }
        return '/';
      },
    };
  });

  it('should be defined', () => {
    expect(prismicNuxt).toBeDefined();
  });

  it('should set __dangerouslyDisableSanitizersByTagID to an object', () => {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.__dangerouslyDisableSanitizersByTagID).toEqual(jasmine.any(Object));
  });

  it('should not set __dangerouslyDisableSanitizersByTagID to an object if already set', () => {
    context.options.head.__dangerouslyDisableSanitizersByTagID = {};
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.__dangerouslyDisableSanitizersByTagID).toEqual(jasmine.any(Object));
  });

  it('should disable sanitizer for prismic-nuxt', () => {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.__dangerouslyDisableSanitizersByTagID['prismic-nuxt']).toEqual([
      'innerHTML',
    ]);
  });

  it('should add the prismic endpoint script', () => {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[0]).toEqual({
      hid: 'prismic-nuxt',
      innerHTML: `window.prismic = {endpoint: '${moduleOptions.endpoint}'};`,
      type: 'text/javascript',
    });
  });

  it('should add the prismic library', () => {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[1].src).toEqual('//static.cdn.prismic.io/prismic.min.js');
  });

  it('should not defer loading the prismic library by default', () => {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[1].defer).not.toBeDefined();
  });

  it('should defer loading the prismic library when defer is set to true', () => {
    moduleOptions.deferLoad = true;
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[1].defer).toEqual(true);
  });

  it('should not defer loading the prismic library when defer is set to false', () => {
    moduleOptions.deferLoad = false;
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[1].defer).not.toBeDefined();
  });

  it('should set options.head.script to an array', () => {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script).toEqual(jasmine.any(Array));
  });

  it('should not set options.head.script to an array if already set', () => {
    context.options.head.script = [];
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script).toEqual(jasmine.any(Array));
  });

  it('should call hook on generate:before', async () => {
    prismicNuxt.call(context, moduleOptions);
    expect(context.nuxt.hook).toBeCalledWith('generate:before', jasmine.any(Function));
  });

  it('should return routes on generate', async () => {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.generate.routes).toEqual(jasmine.any(Function));
    const routes = await context.options.generate.routes();
    const expectedRoutes = ['/pages/my-page', '/pages/another-page', '/'];
    expect(routes.sort()).toEqual(expectedRoutes.sort());
  });

  it('should preserve user defined routes on generate', async () => {
    context.options.generate.routes = ['/user-route'];
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.generate.routes).toEqual(jasmine.any(Function));
    const routes = await context.options.generate.routes();
    const expectedRoutes = ['/pages/my-page', '/pages/another-page', '/', '/user-route'];
    expect(routes.sort()).toEqual(expectedRoutes.sort());
  });

  it('should preserve user routes function if it is defined', async () => {
    context.options.generate.routes = () => ['/user-route'];
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.generate.routes).toEqual(jasmine.any(Function));
    const routes = await context.options.generate.routes();
    const expectedRoutes = ['/pages/my-page', '/pages/another-page', '/', '/user-route'];
    expect(routes.sort()).toEqual(expectedRoutes.sort());
  });

  it('should not run generate if disabled', async () => {
    moduleOptions.disableDefaultGenerator = true;
    prismicNuxt.call(context, moduleOptions);
    expect(context.nuxt.hook).not.toBeCalledWith('generate:before');
  });

  // it('should add route function to generate option', () => {
  //   prismicNuxt.call(context, moduleOptions);
  //   context.options.linkResolver = () => {};
  //   expect(context.options.generate.routes).toEqual(jasmine.any(Function));
  // });

  it('should load the plugin', () => {
    prismicNuxt.call(context, moduleOptions);
    expect(context.addPlugin).toHaveBeenCalled();
  });
});
