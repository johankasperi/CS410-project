var elasticsearch = require('elasticsearch');
var readline = require('readline');
var fs = require('fs');
var client = new elasticsearch.Client({
  host: 'https://jwe787qdfg:8tklsg1l6y@dselearning-6526988738.us-west-2.bonsai.io'
});
var bytes = 0;
var numRows = 60;
var took = 0;
var jsonDoc;

function bulkPost(data, callback) {
    client.bulk({
      body: [data]
    }, function (err, resp) {
      if(err)
        return callback(err, null);
      callback(null, "success");
    });
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function beginsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

function iterateJson() {
  var itemNo = 0;
  var postData = "";
  var postItem = "";
  var rl = readline.createInterface({
      input: fs.createReadStream(jsonDoc),
      terminal: false
  });
  rl.on('line', function(line){
      if(beginsWith(line, "[")) {
        line = line.replace("[", "");
      }
      if(endsWith(line, "]")) {
        line = line.replace("]", "");
      }
      postItem = postItem + line;

      if(endsWith(line, "},") || endsWith(line, "}")) {
        postItem = postItem.replace("\n", " ");

        if(endsWith(line, "},")) {
          postItem = postItem.substring(0, postItem.length-1);
        }

        postData = postData + '\n' + '{"create":{"_index":"cs410_index","_type":"doc"}}' + '\n' + postItem;
        postItem = "";
        
        itemNo++;
        if(itemNo % numRows === 0) {
          rl.pause()
          postData = "";
        }

      }
  }).on('pause', function() {
    bulkPost(postData, function(err, resp) {
      if(err) {
        console.log(err);
        return;
      }
      console.log("resume");
      rl.resume();
    });
  });/*.on('close', function() {
      if(postData.length > 0) {
        bulkPost(postData, function() {});
      }
      console.log("item no:"+ itemNo)
      console.log("finished");
  });*/
}

if(!process.argv[2]) {
  console.log("you have to call the script with the arguments 'json-document'");
  console.log("for example 'node bulk_index.js bulk.json'");
}
else {
  jsonDoc = process.argv[2];
  iterateJson();
}

