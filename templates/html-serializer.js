<% if (typeof options.htmlSerializer === 'string') { %>export { default } from '<%= options.htmlSerializer %>'<% }
else {%>export default <%= options.htmlSerializer ? serialize(options.htmlSerializer) : 'null' %><% } %>
