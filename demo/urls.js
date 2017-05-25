const url = require('../utils/url.js');

const urlpatterns = [
  url(['/', '/hello', '/hello/:id'], 'controller/hello/index@hello'),
  url('/foo', 'controller/hello/index@foo', method='GET'),
  url('/body', 'controller/hello/index@body', 'POST'),
  url('/keke:id', 'controller/hello/index@body'),
];

module.exports = urlpatterns;
