"use strict";

var BigInteger = require('bn.js');

function bv_bit_test(vec, bit) {
    return vec.testn(bit);
}

function bv_bit_set(vec, bit) {
    return vec.setn(bit, true);
}

function bv_or_assign(X, Y) {
    return X.ior(Y);
}

function bv_and_assign(X, Y) {
    return X.iand(Y);
}

function makevector(str) {
    return new BigInteger(str);
}

function makematrix(rows, cols) {
    if (Array.isArray(rows)) {
        return rows.map(makevector);
    } else {
        var matrix = new Array(rows);
        for (var i = 0; i < rows; i++) {
            matrix[i] = makevector(cols);
        }
        return matrix;
    }
}

function transpose(matrix) {
    var out = makematrix(matrix[0].bits, matrix.length);
    for (var row in matrix) {
        for (var col = 0; col < matrix[row].bits; col++) {
            if (bv_bit_test(matrix[row], col)) bv_bit_set(out[col], row);
        }
    }
    return out;
}

function toBinary(str) {
    return parseInt(str, 2);
}

function id (e) { return e; }

module.exports = {
    dump: function dump(m) {
        return m.map(function (e) {
            return e.map(function(l) {
                var s = l.toString(2);
                while (s.length < m.length) s = '0' + s;
                return s;
            }).join('x');
        }).join("\n");
    },

    dumpv: function dumpv(v) {
        var out = [];
        for (var i = 0; i < v.bits; i++) {
            if (bv_bit_test(v, i)) out.push(i);
        }
        return out;
    },

    fromBinStrings: makematrix,

    matrix: makematrix,

    vector: makevector,

    bv_bit_set: bv_bit_set,

    bv_bit_test: bv_bit_test,

    bv_or_assign: bv_or_assign,

    bv_and_assign: bv_and_assign,

    transpose: transpose,

    get: function (mtx, row, col) {
        return bv_bit_test(mtx[row], col);
    },

    transitiveClosure: function transitiveClosure(matrix) {
        var size = matrix.length;
        var outer_row;
        for (outer_row = 0; outer_row < size; outer_row++) {
            var outer_row_v = matrix[outer_row];
            var column;
            for (column = 0; column < size; column++) {
                if (bv_bit_test(matrix[column], outer_row)) {
                    bv_or_assign(matrix[column], outer_row_v);
                }
            }
        }
        return matrix;
    }
};
