const path = require('path');
const prismicNuxt = require("../src");

describe("prismic-nuxt module", function() {
  let context;
  let moduleOptions;

  beforeEach(function() {
    context = {
      addPlugin: jasmine.createSpy('addPlugin'),
      options: {
        head: {}
      }
    }

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
    expect(context.options.head.script[1]).toEqual({
      src: '//static.cdn.prismic.io/prismic.min.js'
    });
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

  it("should load the plugin", function() {
    prismicNuxt.call(context, moduleOptions);
    expect(context.addPlugin).toHaveBeenCalled();
  });
});
