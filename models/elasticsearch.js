var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

var query = function(req, callback) {
	var pageNum = req.query.page || 1;
	var docPerPage = 2;

	buildQuery(req, function(query) {
		client.search({
			  index: 'kasperi2_index',
			  from: (pageNum - 1) * docPerPage,
			  size: docPerPage,
			  body: query
			}, function (error, response) {
			  if (error) {
			    return callback(error, null);
			  }

			  return callback(null, {
			    results: response.hits.hits,
			    page: pageNum,
			    pages: Math.ceil(response.hits.total / docPerPage)
			  });
		});
	})
}

var buildQuery = function(req, callback) {
	var queryType = req.query.query_type || 1;
	var userQuery = req.query.search_query;
	var similarity = req.query.similarity || 'BM25';

	var selectedAlgorithm = createAlgorithm(req);
	var titleField = "title_"+selectedAlgorithm+"_"+similarity;
	var bodyField = "body_"+selectedAlgorithm+"_"+similarity;

	// If "multi_match" is selected
	if(queryType == 1) {
		var titleboost = req.query.titleboost || 1;
		var bodyboost = req.query.bodyboost || 1;
		var query = {
			query: {
				multi_match : {
				    query: userQuery,
		    		fields: [ titleField+"^"+titleboost, bodyField+"^"+bodyboost ],
				}
	  		}
		}
		if(selectedAlgorithm !== "raw") {
			query.query.multi_match["analyzer"] = selectedAlgorithm+"_analyzer"
		}
	}

	// If "more like this" is selected
	else if(queryType == 2) {
		var boostTerms = req.query.boost_terms || 0;
		var query = {
			query: {
			    more_like_this : {
			        fields: [titleField, bodyField],
			        like_text: userQuery,
			        boost_terms: boostTerms,
			        min_term_freq : 1,
			    }
	  		}
		}
		if(selectedAlgorithm !== "raw") {
			query.query.more_like_this["analyzer"] = selectedAlgorithm+"_analyzer"
		}
	}

	// If "common" is selected
	else if(queryType == 3) {
		var cutOff = req.query.cutoff_frequency || 0.001;
		var field = bodyField;
		var query = {
			query: {
			  	common: {
			  	}
			}
		}
		query.query.common[bodyField] = {
	        query: userQuery,
	        cutoff_frequency: cutOff,
	        low_freq_operator: "and"
    	}
    	if(selectedAlgorithm !== "raw") {
			query.query.common[bodyField]["analyzer"] = selectedAlgorithm+"_analyzer"
		}
	}
	return callback(query)
}

var createAlgorithm = function(req) {
	var stop = req.query.stop || 0;
	var stem = req.query.stem || 0;
	var lowercase = req.query.lowercase || 0;

	var selectedAlgorithm = "";
	if(stop == 1) {
		selectedAlgorithm += "stop";
	}
	if(stem == 1) {
		selectedAlgorithm += "stem";
	}
	if(lowercase == 1) {
		selectedAlgorithm += "lowercase";
	}
	if(selectedAlgorithm.length < 1) {
		selectedAlgorithm += "raw";
	}

	return selectedAlgorithm;
}

module.exports = query;