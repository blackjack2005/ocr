const fs = require('fs');
const readline = require('readline');

var streamIn = fs.createReadStream("shit2.csv");
//var outf = fs.createWriteStream("shit3.csv");
var rl = readline.createInterface({input: streamIn});
var nLines = 0;
//var nBad = 0;
//var nRetry = 0;
var filenames = {};
const baseDir = "D:\\github\\ocr\\samples\\";
rl.on('line', (line) => {
	nLines ++;
    let rx = /.+?,.+?,(.*)/;
    m = rx.exec(line);
    if ( m ) {
        if (!fs.existsSync(baseDir+m[1])) {
            console.log(`Not found: ${m[1]}`);
        }
        /*
        if (filenames[m[1]]) {
            console.log(`Duplicate: ${m[1]}`);
        } else {
            filenames[m[1]] = 1;
        }
        */
    } else {
        console.log(`Error: ${line}`);
    }
});
rl.on('close', () => {
    console.log(`Total ${nLines}`);
    //console.log(filenames);
});