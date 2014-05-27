var binmv = require('./index.js');

var md = [];
for (var i = 0; i < 1000; i++) {
    var s = "";
    for (var j = 0; j < 1000; j++) {
        s = s + "0";
    }
    md.push(s);
}

function benchmark() {
    console.log('making matrix');
    var m2 = binmv.fromBinStrings(md);
    console.log('generating closure');
    var before = process.hrtime();
    for (var t = 0; t < 1000; t++) {
        binmv.transitiveClosure(m2);
    }
    var after = process.hrtime();
    console.log(after[0] - before[0] + (after[1] - before[1]) * 1e-9);
}

benchmark();
