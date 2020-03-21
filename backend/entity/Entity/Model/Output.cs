using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Model
{
    public class Output
    {
        public KeyValuePair<string, int> InternalHitCount { get; set; }

        public KeyValuePair<string, dynamic> TwitterHitCount { get; set; }
    }
}
