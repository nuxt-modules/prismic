export default <%= options.linkResolver ? serialize(options.linkResolver) : "function (doc) { return '/' }" %>
