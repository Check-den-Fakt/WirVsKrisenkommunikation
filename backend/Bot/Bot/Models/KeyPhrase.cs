using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bot.Models
{
    public class KeyPhrase
    {
        public List<InternalHitCount> InternalHitCount { get; set; }
    }

    public class InternalHitCount
    {
        public string Key { get; set; }
        public int Value { get; set; }
    }
}
