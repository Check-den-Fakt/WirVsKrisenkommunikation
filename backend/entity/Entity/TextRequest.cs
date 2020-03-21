using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class Document
    {
        public string language { get; set; }
        public string id { get; set; }
        public string text { get; set; }
    }

    public class RootObject
    {
        public List<Document> documents { get; set; }
    }
}
