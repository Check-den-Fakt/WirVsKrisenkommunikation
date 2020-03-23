using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bot.Models
{
    public class FactDetails
    {
        public int SearchScore { get; set; }

        public int CountOfSearchHits { get; set; }

        public List<KeyValuePair<string, int>> KeyPhrases { get; set; }

        public string Question { get; set; }
    }
}
