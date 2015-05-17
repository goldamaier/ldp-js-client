var http = require('http');
var prompt = require('prompt');
var output = '';

var properties = [
  {
    name: 'slug',
    pattern: /([a-zA-Z0-9-])/,
    required: true
  }
];

console.log('Please enter ');
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
  var options = {
    hostname: 'localhost',
    port: 8080,
    path: '/ldp/FH-Salzburg/' + slug,
  };

  http.get(options, function(res) {
    console.log("Got response: " + res.statusCode);

  res.on('data', function(chunk){
      output += chunk;
    });

    res.on('end', function() {
      console.log(output);
    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

}