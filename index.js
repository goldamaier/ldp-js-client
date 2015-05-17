var http = require('http');
var prompt = require('prompt');

var properties = [
  {
    name: 'abstract',
    description: 'abstract',
    pattern: /([a-zA-Z0-9])/,
    required: true
  },
  {
    name: 'name',
    description: 'name',
    pattern: /([a-zA-Z0-9])/,
    required: true

  },
  {
    name: 'content',
    description: 'content',
    pattern: /([a-zA-Z0-9])/,
    required: true
  },
  {
    name: 'slug',
    description: 'slug',
    pattern: /([a-zA-Z0-9])/,
    default: 'FH Salzburg'
  }
];
console.log('los');
prompt.start();

prompt.get(properties, function (err, result) {
  if (err) { return onErr(err); }
  console.log('  abstract:' + result.abstract);
  console.log('  name: ' + result.name);
  console.log('  content: ' + result.content);
  console.log('  slug: ' + result.slug);

  createPost(result.abstract, result.name, result.content, result.slug)
});


function onErr(err) {
  console.log(err);
  return 1;
}


//------------------------------------------------------

function createPost(abstract, name, content, slug){

  var postData = JSON.stringify({
      "@id": "",
      "@type": [
        "http://rdfs.org/sioc/ns#Post",
        "http://schema.org/Article"
      ],
      "http://purl.org/dc/terms/abstract": [
        {
          "@value": abstract
        }
      ],
      "http://rdfs.org/sioc/ns#content": [
        {
          "@language": "en",
          "@value": content
        }
      ],
      "http://schema.org/name": [
        {
          "@value": name
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
      'Slug': slug
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
}