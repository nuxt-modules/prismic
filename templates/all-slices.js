<% _.forEach(options.libraries, function(library, index) { %>import { components as library<%- index %> } from '<%- library %>'
<% }); %>

export default {
<% _.forEach(options.libraries, function(library, index) { %>  ...library<%- index %>,
<% }); %>
}
