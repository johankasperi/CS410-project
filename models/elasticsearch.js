var elasticsearch = require('elasticsearch');
var _ = require('underscore');

var client = new elasticsearch.Client({
  host: 'https://jwe787qdfg:8tklsg1l6y@dselearning-6526988738.us-west-2.bonsai.io'
});

var query = function(req, callback) {
	var pageNum = req.query.page > 1 ? req.query.page : 1;
	var docPerPage = 15;
	buildQuery(req, function(query) {
		client.search({
			  index: 'cs410_index',
			  from: (pageNum - 1) * docPerPage,
			  size: docPerPage,
			  body: query
			}, function (error, response) {
			  if (error) {
			    return callback(error, null);
			  }

			  getTermVector(response.hits.hits, req.query.search_query, function(termVector) {
			  	  return callback(null, {
				    results: response.hits.hits,
				    page: pageNum,
				    pages: Math.ceil(response.hits.total / docPerPage),
				    term_vector: termVector
				  });
			  })
		});
	})
}

var getTermVector = function(docs, userQuery, callback) {
	var docIds = [];
	userQuery = userQuery.toLowerCase().split(" ");

	userQuery = _.uniq(userQuery);
	var average = [];
	for(var i = 0; i < userQuery.length; i++) {
		average[i] = {
			name: userQuery[i],
			title_term_freq: 0,
			body_term_freq: 0
		}
	}
	for(var i = 0; i < docs.length; i++) {
		docIds.push({ _id: docs[i]._id, termStatistics: true });
	}
	client.mtermvectors({
		index: "cs410_index",
		type: "doc",
		body: {
			docs: docIds
		}
	}, function (error, response) {
		if(error) {
			return callback(null);
		}

		for(var i = 0; i < response.docs.length; i++) {
			var titleTerms = [];
			var bodyTerms = [];

			if(response.docs[i].term_vectors["body.body_raw_BM25"]) {
				bodyTerms = response.docs[i].term_vectors["body.body_raw_BM25"].terms;
				bodyTerms = _.pick(bodyTerms, function(value, key, obj){ return userQuery.indexOf(key) != -1; });
				for(var j = 0; j < average.length; j++) {
					if(bodyTerms[average[j].name]) {
						average[j].body_term_freq += bodyTerms[average[j].name].term_freq;
					}
				}
				response.docs[i].term_vectors["body.body_raw_BM25"].terms = bodyTerms;

			}

			if(response.docs[i].term_vectors["title.title_raw_BM25"]) {
				titleTerms = response.docs[i].term_vectors["title.title_raw_BM25"].terms;
				titleTerms = _.pick(titleTerms, function(value, key, obj){ return userQuery.indexOf(key) != -1; });
				for(var j = 0; j < average.length; j++) {
					if(titleTerms[average[j].name]) {
						average[j].title_term_freq += titleTerms[average[j].name].term_freq;
					}
				}
				response.docs[i].term_vectors["title.title_raw_BM25"].terms = titleTerms;

			}
		}

		for(var i = 0; i < average.length; i++) {
			average[i].title_term_freq /= response.docs.length;
			average[i].body_term_freq /= response.docs.length;
		}

		callback({ response: response, average: average });
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
		var percentageMust = parseFloat(req.query.percentage_must) || 0.3;
		var query = {
			query: {
			    more_like_this : {
			        fields: [titleField, bodyField],
			        like_text: userQuery,
			        percent_terms_to_match: percentageMust,
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
		var cutOff = parseFloat(req.query.cutoff_frequency) || 0.001;
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