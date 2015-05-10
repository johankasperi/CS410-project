DELETE /cs410_index/
PUT /cs410_index/
{
  "index" : {
      "analysis" : {
          "analyzer" : {
              "stem_analyzer" : {
                  "tokenizer" : "standard",
                  "filter" : ["stemmer"]
              },
              "stop_analyzer" : {
                  "tokenizer" : "standard",
                  "filter" : ["stop"]
              },
              "lowercase_analyzer": {
                  "tokenizer" : "standard",
                  "filter" : ["lowercase"]            
              },
              "stopstem_analyzer" : {
                  "tokenizer" : "standard",
                  "filter" : ["stemmer", "stop"]
              },
              "stoplowercase_analyzer" : {
                  "tokenizer" : "standard",
                  "filter" : ["lowercase", "stop"]
              },
              "stemlowercase_analyzer" : {
                  "tokenizer" : "standard",
                  "filter" : ["lowercase", "stemmer"]
              },
              "stopstemlowercase_analyzer" : {
                  "tokenizer" : "standard",
                  "filter" : ["lowercase", "stemmer", "stop"]
              }
          },
          "filter" : {
              "stemmer" : {
                  "type" : "stemmer",
                  "name" : "english"
              },
              "stop": {
                  "type":       "stop",
                  "stopwords":  "_english_"
              }
          }
      }
  }
}
PUT /cs410_index/_mapping/doc
{
  "properties" : {
    "doc_id" : {
      "type" : "string",
      "index": "not_analyzed"
    },
    "url" : {
      "type" : "string",
      "index": "not_analyzed"
    },
    "title" : {
      "type" : "multi_field",
      "fields": {
        "title_raw_BM25": { 
            "type": "string", 
            "index": "analyzed",
            "analyzer": "standard", 
            "term_vector": "yes",
            "similarity": "BM25"
        },
        "title_stem_BM25": { 
            "type": "string", 
            "analyzer":"stem_analyzer", 
            "index": "analyzed",
            "similarity": "BM25"
        },
        "title_stop_BM25": { 
            "type": "string",
            "analyzer":"stop_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "title_lowercase_BM25": { 
            "type": "string",
            "analyzer":"lowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "title_stopstem_BM25": { 
            "type": "string", 
            "analyzer":"stopstem_analyzer", 
            "index": "analyzed"
        },
        "title_stoplowercase_BM25": { 
            "type": "string",
            "analyzer":"stoplowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "title_stemlowercase_BM25": { 
            "type": "string",
            "analyzer":"stemlowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "title_stopstemlowercase_BM25": { 
            "type": "string",
            "analyzer":"stopstemlowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "title_raw_LMD": { 
            "type": "string", 
            "index": "analyzed",
            "analyzer": "standard", 
            "similarity": "LMDirichlet"
        },
        "title_stem_LMD": { 
            "type": "string", 
            "analyzer":"stem_analyzer", 
            "index": "analyzed",
            "similarity": "LMDirichlet"
        },
        "title_stop_LMD": { 
            "type": "string",
            "analyzer":"stop_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        },
        "title_lowercase_LMD": { 
            "type": "string",
            "analyzer":"lowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        },
        "title_stopstem_LMD": { 
            "type": "string",
            "analyzer":"stopstem_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        },
        "title_stoplowercase_LMD": { 
            "type": "string",
            "analyzer":"stoplowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        },
        "title_stemlowercase_LMD": { 
            "type": "string",
            "analyzer":"stemlowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        },
        "title_stopstemlowercase_LMD": { 
            "type": "string",
            "analyzer":"stopstemlowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        }
      }
    },
    "body" : {
      "type" : "multi_field",
      "fields": {
        "body_raw_BM25": { 
            "type": "string", 
            "index": "analyzed",
            "analyzer": "standard", 
            "term_vector": "yes",
            "similarity": "BM25"
        },
        "body_stem_BM25": { 
            "type": "string", 
            "analyzer":"stem_analyzer", 
            "index": "analyzed",
            "similarity": "BM25"
        },
        "body_stop_BM25": { 
            "type": "string",
            "analyzer":"stop_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "body_lowercase_BM25": { 
            "type": "string",
            "analyzer":"lowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "body_stopstem_BM25": { 
            "type": "string",
            "analyzer":"stopstem_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "body_stoplowercase_BM25": { 
            "type": "string",
            "analyzer":"stoplowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "body_stemlowercase_BM25": { 
            "type": "string",
            "analyzer":"stemlowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "body_stopstemlowercase_BM25": { 
            "type": "string",
            "analyzer":"stopstemlowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "BM25"
        },
        "body_raw_LMD": { 
            "type": "string", 
            "index": "analyzed",
            "analyzer": "standard", 
            "similarity": "LMDirichlet"
        },
        "body_stem_LMD": { 
            "type": "string", 
            "analyzer":"stem_analyzer", 
            "index": "analyzed",
            "similarity": "LMDirichlet"
        },
        "body_stop_LMD": { 
            "type": "string",
            "analyzer":"stop_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        },
        "body_lowercase_LMD": { 
            "type": "string",
            "analyzer":"lowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        },
        "body_stopstem_LMD": { 
            "type": "string",
            "analyzer":"stopstem_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        },
        "body_stoplowercase_LMD": { 
            "type": "string",
            "analyzer":"stoplowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        },
        "body_stemlowercase_LMD": { 
            "type": "string",
            "analyzer":"stemlowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        },
        "body_stopstemlowercase_LMD": { 
            "type": "string",
            "analyzer":"stopstemlowercase_analyzer", 
            "index": "analyzed", 
            "similarity": "LMDirichlet"
        }
      }
    }
  }
}