var _ = require('underscore');

var resources = [
	{
		id: 1,
		name: "Stemming filtering",
		content: "Stemming is the process of reducing a word to a base form. This is especially useful for search engines. If a user wants to find books about running, documents containing the word <i>run</i> or <i>runs</i> would not match. If we apply a stemming algorithm to a word, it is more likely that other forms of the word will match it in an information retrieval task.",
		resource: "http://en.wikipedia.org/wiki/Stemming"
	},
	{
		id: 2,
		name: "Stop word filtering",
		content: "Words like: <i>I, the, of, my, it, to, from</i> are called stop words since they are very high frequency words that do not contain content information. They are grammatically required for connecting sentences. Since these words do not contain any topical information, they are often removed as a preprocessing step in text analysis. Not only are these (usually) useless words ignored, but having less data can mean that algorithms run faster!",
		resource: "http://en.wikipedia.org/wiki/Stop_words"
	},
	{
		id: 3,
		name: "Lowercase filtering",
		content: "Lowercase filtering means that all captial letters in the words in the query and in the document will be transform to lowercase letters.",
		resource: "http://www.elastic.co/guide/en/elasticsearch/reference/1.3/analysis-lowercase-tokenfilter.html"
	},
	{
		id: 4,
		name: "Okapi BM25 similarity function",
		content: "The BM stands for “Best Matching”. As the name suggests, BM25 is a ranking function used by search engines to rank matching documents according to their relevance to a given search query. It is based on the probabilistic retrieval framework which makes an estimation of the probability of finding if a document is relevant to a query.",
		resource: "http://en.wikipedia.org/wiki/Okapi_BM25"
	},
	{
		id: 5,
		name: "LMDirichlet similarity function",
		content: "",
		resource: "http://en.wikipedia.org/wiki/Dirichlet_distribution"
	},
	{
		id: 6,
		name: "Match query function",
		content: "This means that the term the user searches has to be matched exactly in the documents. Documents having the exact and more frequent matches get placed higher on the list.",
		resource: "http://www.elastic.co/guide/en/elasticsearch/reference/1.5/query-dsl-match-query.html"
	},
	{
		id: 7,
		name: "More like this query function",
		content: "Finds documents that are similar to the query the user provides. They do not have to match exactly like in the “Match” query.",
		resource: "http://www.elastic.co/guide/en/elasticsearch/reference/1.5/query-dsl-mlt-query.html"
	},
	{
		id: 8,
		name: "Common query function",
		content: "Does not require any retrieved documents to have any common english words provided in the user’s query (like “the”, or “and”). This can increase the chances that more relevant documents are retrieved.",
		resource: "http://www.elastic.co/guide/en/elasticsearch/reference/1.5/query-dsl-common-terms-query.html"
	}
]

var getResource = function(id, callback) {
	var result = _.find(resources, function(r) { return r.id == id });
	if(!result) {
		return callback("error", null);
	}
	return callback(null, result);
}


module.exports = getResource;