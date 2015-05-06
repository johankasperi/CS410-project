var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

var query = function(pageNum, userQuery, callback) {
	client.search({
	  index: 'kasperi2_index',
	  from: (pageNum - 1) * 20,
	  size: 20,
	  body_stopstem: {
		    match : {
		        message : {
		            query: userQuery,
		            operator: "and"
		        }
		    }
	  	}
	}, function (error, response) {
	  if (error) {
	    // handle error
	    return callback(error, null);
	  }

	  callback(null, {
	    results: response.hits.hits,
	    page: pageNum,
	    pages: Math.ceil(response.hits.total / 20)
	  });
	});
}

module.exports = query;