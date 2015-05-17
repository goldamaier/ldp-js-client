var http = require('http');
var output = '';

var prompt = require('prompt');

var properties = [
  {
    name: 'slug',
    pattern: /([a-zA-Z0-9])/,
    required: true
  }
];

console.log('los');
prompt.start();

prompt.get(properties, function (err, result) {
  if (err) { return onErr(err); }
  console.log('  slug: ' + result.slug);

  readPost(result.slug)
});


function onErr(err) {
  console.log(err);
  return 1;
}


//------------------------------------------------------

function readPost(slug){

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

}