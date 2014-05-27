var test = require('tape');
var binmv = require('../index.js');

test('transitive_closure', function (t) {
    var mtx = binmv.fromBinStrings(['101', '000', '010']);
    binmv.transitiveClosure(mtx);
    t.ok(binmv.get(mtx, 0, 0));
    t.ok(binmv.get(mtx, 0, 1));
    t.ok(binmv.get(mtx, 0, 2));
    t.ok(!binmv.get(mtx, 1, 0));
    t.ok(!binmv.get(mtx, 1, 1));
    t.ok(!binmv.get(mtx, 1, 2));
    t.ok(!binmv.get(mtx, 2, 0));
    t.ok(binmv.get(mtx, 2, 1));
    t.ok(!binmv.get(mtx, 2, 2));
    t.end();
});
