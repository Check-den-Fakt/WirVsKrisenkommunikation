using System.Collections.Generic;

namespace Entity.Model
{
    public class Document
    {
        public string id { get; set; }
        public List<string> keyPhrases { get; set; }
    }

    public class RootObject
    {
        public List<Document> documents { get; set; }
        public List<object> errors { get; set; }
    }
}