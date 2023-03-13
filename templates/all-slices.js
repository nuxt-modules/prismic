<% _.forEach(options.libraries, function(library, index) { %>import library<%- index %> from '<%- library %>/components'
<% }); %>

export default {
<% _.forEach(options.libraries, function(library, index) { %>  ...library<%- index %>,
<% }); %>
}
