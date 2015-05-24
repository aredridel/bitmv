var test = require('tap').test;
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

test('empty vector', function (t) {
    var vec = bitmv.vector(33);
    t.equal(vec.bits, 33);
    t.equal(vec.length, 2);
    t.equal(vec[0], 0);
    t.equal(vec[1], 0);
    t.end();
});

test('vector from string', function (t) {
    var vec = bitmv.vector('000000000000000000000000000000001');
    t.equal(vec.bits, 33);
    t.equal(vec.length, 2);
    t.equal(vec[0], 0);
    t.equal(vec[1], 1);
    t.end();
});

test('bv_or', function (t) {
    var x = bitmv.vector('10');
    var y = bitmv.vector('01');
    var vec = bitmv.bv_or(x, y);
    t.equal(vec.bits, 2);
    t.ok(bitmv.bv_bit_test(vec, 0));
    t.ok(bitmv.bv_bit_test(vec, 1));
    t.notOk(bitmv.bv_bit_test(x, 0));
    t.ok(bitmv.bv_bit_test(x, 1));
    t.ok(bitmv.bv_bit_test(y, 0));
    t.notOk(bitmv.bv_bit_test(y, 1));
    t.end();
});

test('bv_and', function (t) {
    var x = bitmv.vector('101');
    var y = bitmv.vector('011');
    var vec = bitmv.bv_and(x, y);
    t.equal(vec.bits, 3);
    t.ok(bitmv.bv_bit_test(vec, 0));
    t.notOk(bitmv.bv_bit_test(vec, 1));
    t.notOk(bitmv.bv_bit_test(vec, 2));
    t.ok(bitmv.bv_bit_test(x, 0));
    t.notOk(bitmv.bv_bit_test(x, 1));
    t.ok(bitmv.bv_bit_test(x, 2));
    t.ok(bitmv.bv_bit_test(y, 0));
    t.ok(bitmv.bv_bit_test(y, 1));
    t.notOk(bitmv.bv_bit_test(y, 2));
    t.end();
});
