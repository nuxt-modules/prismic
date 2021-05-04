<% if (typeof options.linkResolver === 'string') { %>export { default } from '<%= options.linkResolver %>'<% }
else { %>export default <%= options.linkResolver ? serialize(options.linkResolver) : "function (doc) { return null }" %><% } %>
