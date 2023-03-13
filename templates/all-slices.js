<% options.libraries.forEach((library, index) => { %>import { components as library<%= index %> } from '<%= library %>'
<% }); %>

export default {
<% options.libraries.forEach((library, index) => { %>  ...library<%= index %>,
<% }); %>
}
