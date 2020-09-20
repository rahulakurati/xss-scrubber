var assert = require('assert');
var JsonScrubber = require("../dist/index");

describe('JsonScrubber', function () {
    describe('String', function () {
        it('should be the same string', function () {
            let str = 'hi! this is @ test';
            assert.equal(JsonScrubber(str), str);
        });

        it('should scrub xss content', function () {
            let str = '<script>alert("xss");</script>';
            assert.equal(JsonScrubber(str), `&lt;script&gt;alert("xss");&lt;/script&gt;`);
        });
    });

    describe('Array', function () {
        it('should be the same array', function () {
            let arr = ['hi! this is @ test', 123];
            assert.deepEqual(JsonScrubber(arr), arr);
        });

        it('should scrub xss content', function () {
            let arr = ['<img>hi! this is @ test</img>', 123, '<script>alert("xss");</script>', 'a'];
            assert.deepEqual(JsonScrubber(arr), [ '&lt;img&gt;hi! this is @ test&lt;/img&gt;',123,'&lt;script&gt;alert("xss");&lt;/script&gt;','a' ]);
        });
    });

    describe('Object', function () {
        it('should be the same object', function () {
            let a = {
                b: 'hi! this is @ test',
                c: 123
            };
            assert.deepEqual(JsonScrubber(a), a);
        });

        it('should scrub xss content', function () {
            let a = {
                b: '<script>alert("xss");</script>'
            };
            assert.deepEqual(JsonScrubber(a), { b:'&lt;script&gt;alert("xss");&lt;/script&gt;' });

            let c= {
                "entry":[{
                   "comments":"<script>alert('xss');</script>Test REST API Comments.",
                   "color":"color10",
                   "@name": {
                       "first": [{
                           "second": "<alert>rn_tag</alert>"
                       }]
                   }
                }]
             };
             assert.deepEqual(JsonScrubber(c), {
                "entry":[{
                   "comments":"&lt;script&gt;alert('xss');&lt;/script&gt;Test REST API Comments.",
                   "color":"color10",
                   "@name": {
                       "first": [{
                           "second": "&lt;alert&gt;rn_tag&lt;/alert&gt;"
                       }]
                   }
                }]
             });
        });
    });
})