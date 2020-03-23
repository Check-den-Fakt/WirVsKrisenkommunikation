using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bot.Models
{
    public class Document
    {
        public string Content { get; set; }
        public string rid { get; set; }
        public List<object> locations { get; set; }
        public List<object> organizations { get; set; }
        public List<string> keyphrases { get; set; }
        public string language { get; set; }
    }

    public class Value
    {
        public Document document { get; set; }

        [JsonProperty("@search.score")]
        public double searchScore { get; set; }

        [JsonProperty("@search.highlights")]
        public object searchHighlights { get; set; }
    }

    public class Search
    {
        public object continuationToken { get; set; }

        [JsonProperty("@odata.count")]
        public object ODataCount { get; set; }

        [JsonProperty("@search.coverage")]
        public object searchCoverage { get; set; }

        [JsonProperty("@search.facets")]
        public object searchFacets { get; set; }

        public List<Value> value { get; set; }

    }

    public class TrustedPublisher
    {
        public double trustScore { get; set; }
        public string source { get; set; }
    }

    public class FakeAPIResponse
    {
        public string keyphrase { get; set; }
        public Search search { get; set; }
        public TrustedPublisher trustedPublisher { get; set; }
    }
}
