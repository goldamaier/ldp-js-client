var http = require('http');


http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

  var options = {
    host: 'localhost',
    port: 8080,
    path: '/ldp/FH-Salzburg',
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      'Slug': slug
      // 'Content-Length': postData.length
    }
  };