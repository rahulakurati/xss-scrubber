# xss-scrubber
Scrubs xss content of any JavaScript object

## Usage
```javascript
const JsonScrubber = require("xss-scrubber");
...
...
console.log(JsonScrubber(obj));
```

## Examples
```javascript
** String **
console.log(JsonScrubber('<script>alert("xss");</script>'));
// &lt;script&gt;alert("xss");&lt;/script&gt;

** Array **
console.log(JsonScrubber(['<img>hi! this is @ test</img>', 123, '<script>alert("xss");</script>', 'a']));
// [ '&lt;img&gt;hi! this is @ test&lt;/img&gt;',123,'&lt;script&gt;alert("xss");&lt;/script&gt;','a' ]

** Object **
console.log(JsonScrubber({
    "entry":[{
       "comments":"<script>alert('xss');</script>Test REST API Comments.",
       "color":"color10",
       "@name": {
           "first": [{
               "second": "<alert>rn_tag</alert>"
           }]
       }
    }]
 }));
 
 // {
    "entry":[{
        "comments":"&lt;script&gt;alert('xss');&lt;/script&gt;Test REST API Comments.",
        "color":"color10",
        "@name": {
            "first": [{
                "second": "&lt;alert&gt;rn_tag&lt;/alert&gt;"
            }]
        }
     }]
}
```