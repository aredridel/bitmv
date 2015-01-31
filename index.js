"use strict";

function bv_bit_test(vec, bit) {
    return vec[bit >>> 5] & (1 << (bit & 31));
}

function bv_bit_set(vec, bit) {
    vec[bit >>> 5] |= (1 << (bit & 31));
}

function bv_or_assign(X, Y) {
    var size = X.length;
    while (size-- > 0) X[size] |= Y[size];
    X[X.length - 1] &= X.mask;
}

function bv_and_assign(X, Y) {
    var size = X.length;
    while (size-- > 0) X[size] &= Y[size];
    X[X.length - 1] &= X.mask;
}

function makevector(str) {
    var out;
    if (typeof str == 'string') {
        out = str.split(/(.{1,32})/).filter(id).map(toBinary);
        out.bits = str.length;
    } else {
        out = new Array(Math.ceil(str / 32));
        for (var i = 0; i < out.length; i++) {
            out[i] = 0;
        }
        out.bits = str;
    }
    out.mask = (1 << out.bits) - 1;
    return out;
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
                var inner_row_v = matrix[column];
                if (bv_bit_test(inner_row_v, outer_row)) {
                    bv_or_assign(inner_row_v, outer_row_v);
                }
            }
        }
        return matrix;
    }
};
