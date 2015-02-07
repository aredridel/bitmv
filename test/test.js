var test = require('tape');
var BigInteger = require('bn').BigInteger;
var bitmv = require('../index.js');

test('transitive_closure', function (t) {
    var mtx = [new BigInteger('101', 2), new BigInteger('000', 2), new BigInteger('010', 2)];
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
