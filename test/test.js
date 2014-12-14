var test = require('tape');
var bitmv = require('../index.js');

test('transitive_closure', function (t) {
    var mtx = bitmv.fromBinStrings(['101', '000', '010']);
    bitmv.transitiveClosure(mtx);
    t.ok(bitmv.get(mtx, 0, 0));
    t.ok(bitmv.get(mtx, 0, 1));
    t.ok(bitmv.get(mtx, 0, 2));
    t.ok(!bitmv.get(mtx, 1, 0));
    t.ok(!bitmv.get(mtx, 1, 1));
    t.ok(!bitmv.get(mtx, 1, 2));
    t.ok(!bitmv.get(mtx, 2, 0));
    t.ok(bitmv.get(mtx, 2, 1));
    t.ok(!bitmv.get(mtx, 2, 2));
    t.end();
});
