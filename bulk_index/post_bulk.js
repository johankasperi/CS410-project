var elasticsearch = require('elasticsearch');
var readline = require('readline')
var fs = require('fs')
var querystring = require('querystring');

var client = new elasticsearch.Client({
  host: 'https://jwe787qdfg:8tklsg1l6y@dselearning-6526988738.us-west-2.bonsai.io',
  log: 'trace'
});
var result = [];
var took = 0;
var numCalls = 0;
var bytes = 0;

function bulkPost(data, last, numRows, callback) {
    client.bulk({
      body: [data]
    }, function (err, resp) {
      numCalls++;
      took = took + resp.took;
      if(last) {
        result.push({
          rows: numRows,
          time: took
        });
        console.log("Took: "+took+" MS");
        took = 0;
        numCalls = 0;
        return callback();
      }
    });
}

function deleteIndex(callback) {
  client.delete({
    index: 'kasperi2_index'
  }, function(err, resp) {
    console.log(err);
    console.log(resp);
    console.log("DELETE")
    return callback();
  })
}

function iterateJson(numRows) {
  console.log("NUMROWS "+numRows)
  var lineno = 1;
  var postData = "";
  readline.createInterface({
      input: fs.createReadStream("bulk.json"),
      terminal: false
  }).on('line', function(line){
      postData = postData + '\n' + line;
      if(lineno == 15850) {
          console.log("LAST")
          /*bulkPost(postData, true, numRows, function() {
            if(numRows !== 2048) {
              deleteIndex(function() {
                  iterateJson(numRows*2);
              });
            }
            else {
              console.log("RESULTATT");
              console.log(JSON.stringify(result, null, 4))
            }
          });
          postData = "";*/
      }
      else if(lineno % numRows === 0) {
          bulkPost(postData, false, numRows, function() {});
          postData = "";
      }
      lineno++;
  }).on('close', function() {
      console.log("finished");
  });
}

var numRows = 1000; // or num bytes
iterateJson(numRows);
