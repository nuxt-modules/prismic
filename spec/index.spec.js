const path = require('path');
const prismicNuxt = require("../src");
const prismic = require('prismic-javascript');

describe("prismic-nuxt module", function() {
  let context;
  let moduleOptions;

  beforeEach(function() {
    context = {
      addPlugin: jest.fn(),
      options: {
        head: {},
        generate: {},
      },
      nuxt: {
        hook: jest.fn(() => context.options.generate.routes = jest.fn(()=>{
          
        }))
      }
    }

     // const maybeF = context.options.generate.routes || [];
          // const prismicRoutes = ['/pages/a', '/pages/b'];
          // const userRoutes = typeof maybeF === 'function' ? await maybeF() : maybeF;
          // console.log('HERE', prismicRoutes.concat(userRoutes));
          // this.prismicRoutes.concat(userRoutes);
          // context.options.generate.routes = prismicRoutes.concat(userRoutes);

    moduleOptions = {
      endpoint: "http://test"
    };
  });

  it("should be defined", function() {
    expect(prismicNuxt).toBeDefined();
  });

  it("should set __dangerouslyDisableSanitizersByTagID to an object", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.__dangerouslyDisableSanitizersByTagID).toEqual(jasmine.any(Object));
  });

  it("should not set __dangerouslyDisableSanitizersByTagID to an object if already set", function() {
    context.options.head.__dangerouslyDisableSanitizersByTagID = {};
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.__dangerouslyDisableSanitizersByTagID).toEqual(jasmine.any(Object));
  });

  it("should disable sanitizer for prismic-nuxt", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.__dangerouslyDisableSanitizersByTagID['prismic-nuxt']).toEqual(['innerHTML']);
  });

  it("should add the prismic endpoint script", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[0]).toEqual({
      hid: 'prismic-nuxt',
      innerHTML: `window.prismic = {endpoint: '${moduleOptions.endpoint}'};`,
      type: 'text/javascript',
    });
  });

  it("should add the prismic library", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[1].src).toEqual('//static.cdn.prismic.io/prismic.min.js');
  });

  it("should not defer loading the prismic library by default", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[1].defer).not.toBeDefined();
  });

  it("should defer loading the prismic library when defer is set to true", function() {
    moduleOptions.deferLoad = true
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[1].defer).toEqual(true);
  });

  it("should not defer loading the prismic library when defer is set to false", function() {
    moduleOptions.deferLoad = false
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script[1].defer).not.toBeDefined();
  });

  it("should set options.head.script to an array", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script).toEqual(jasmine.any(Array));
  });

  it("should not set options.head.script to an array if already set", function() {
    context.options.head.script = []
    prismicNuxt.call(context, moduleOptions);
    expect(context.options.head.script).toEqual(jasmine.any(Array));
  });

  it("should call hook on generate:before", function() {    

    prismicNuxt.call(context, moduleOptions);
    // xpect(context.nuxt.hook).toBeCalled()

    // expect(context.nuxt.hook).toBeCalledWith('generate:before', expect.any(Function))

    // expect(context.options.generate.routes).toBeCalled(1)
    expect(context.nuxt.hook).toBeCalledWith('generate:before', jasmine.any(Function))
    console.log(context.options.generate);
  });

  it("should add route function to generate option", function() {
    prismicNuxt.call(context, moduleOptions);
    context.options.linkResolver = () => {
      
    }
    expect(context.options.generate.routes).toEqual(jasmine.any(Function));
  });



  it("should load the plugin", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.addPlugin).toHaveBeenCalled();
  });
});
