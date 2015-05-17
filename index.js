var http = require('http');

var postData = JSON.stringify({
    "@id": "",
    "@type": [
      "http://rdfs.org/sioc/ns#Post",
      "http://schema.org/Article"
    ],
    "http://purl.org/dc/terms/abstract": [
      {
        "@value": "Course on Semantic Web Technologies in the Summer Semester."
      }
    ],
    "http://rdfs.org/sioc/ns#content": [
      {
        "@language": "en",
        "@value": "..."
      }
    ],
    "http://schema.org/name": [
      {
        "@value": "Funktioniert"
      }
    ]
});

var options = {
  host: 'localhost',
  port: 8080,
  path: '/ldp/FH-Salzburg',
  method: 'POST',
  headers: {
    'Content-Type': 'application/ld+json',
    'Slug':'FH Salzburg'
    // 'Content-Length': postData.length
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();