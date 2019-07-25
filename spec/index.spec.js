const path = require('path');
const prismicNuxt = require("../src");

describe("prismic-nuxt module", function() {
  let context;
  let moduleOptions;

  beforeEach(function() {
    context = {
      addPlugin: jest.fn(),
      addTemplate: jest.fn(),
      extendRoutes: jest.fn(),
      options: {
        srcDir: '/var/nuxt',
        head: {},
        dir: {}
      }
    }

    moduleOptions = {
      endpoint: "https://test.cdn.prismic.io/api/v2"
    };
  });

  it("should be defined", function() {
    expect(prismicNuxt).toBeDefined();
  });

  it("should add the prismic preview library", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[0].src).toEqual('//static.cdn.prismic.io/prismic.min.js?repo=test&new=true');
    expect(context.options.head.script[0].defer).toBeDefined();
    expect(context.options.head.script[0].async).toBeDefined();
  });

  it("should not add the prismic preview library if preview=false", function() {
    prismicNuxt.call(context, { ...moduleOptions, preview: false });
    expect(context.options.head.script).not.toBeDefined();
  });

  it("should add the components", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.addPlugin.mock.calls).toHaveLength(3)
  });

  it("should not add the components if components=false", function() {
    prismicNuxt.call(context, { ...moduleOptions, components: false });
    expect(context.addPlugin.mock.calls).toHaveLength(1)
  });

  it("should not set options.head.script to an array if already set", function() {
    context.options.head.script = []
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script).toEqual(jasmine.any(Array));
  });

  it("should load the plugin", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.addPlugin).toHaveBeenCalled();
  });
});
