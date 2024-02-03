const fs = require('fs');
const readline = require('readline');

var inf = fs.createReadStream("../sample2.csv");
var outf = fs.createWriteStream("sample2.csv");
//outf.write("關卡,分數,File,Date,Time\n");
var rl = readline.createInterface({input: inf});
var nLines = 0;
var nBad = 0;
var nNotMatched = 0;
var nNotFound = 0;
//var nRetry = 0;
//var toRetry = [];
var rex = /^.+?,\d+?,[0-9_]+?_iOS\.(png|jpg)$/;
const baseDir = "..\\sample2\\";

rl.on('line', (line) => {
	nLines ++;
    if ( rex.test(line) ) {
        let rx = /^.*,(.*)$/;
        m = rx.exec(line);
        if ( m ) {
            if ( fs.existsSync(baseDir+m[1]) ) {
                //console.log(`Retry ${m[1]}`);
                //nRetry ++;
                //toRetry.push(m[1]);
                //await doit(baseDir, m[1], outf);
                const st = fs.statSync(baseDir+m[1]);
                outf.write(`${line},${st.mtime.toLocaleDateString()},${st.mtime.toLocaleTimeString()}\n`);
            } else {
                nNotFound ++;
            }
        } else {
            nNotMatched ++;
        }
    } else {
        nBad ++;
    }
});
rl.on('close', () => {
    console.log(`Total ${nLines} bad ${nBad} mismatched ${nNotMatched} notfound ${nNotFound}`);
    //for (let i=0; i < toRetry.length; i++) {
        //await doit(baseDir, toRetry[i], outf);
        //console.log(`${toRetry[i]}`);
    //}
});

/*
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

async function doit(base, fn, outf) {
    // Performs text detection on the image file
    const [result] = await client.textDetection(base+fn);
    //console.log(result);
    const text = result.textAnnotations;
    let rst = fs.createWriteStream("../Retried/"+fn+".txt");
    rst.write(text[0].description);
    rst.end();
    //console.log('Text:');
    //text.forEach(text => console.log(text.description));
    ary = text[0].description.split("\n");
    console.log(`${ary[0]}, ${ary[1]}, ${fn} done`);
    outf.write(`${ary[0]},${ary[1]},${fn}\n`);
}
//doit();


fs.readdir(baseDir, async(e, files) =>{
    if (e) {
        return;
    }
    //files.forEach(async f=>{
    //    await doit(baseDir+f);
    //});
    outf = fs.createWriteStream("shit2.csv");
    console.log(files.length);
    //outf.write("關卡,分數,File\n");
    for (let i=0; i<10; i++) {
        //await doit(baseDir, files[i], outf);
        let stat = fs.statSync(baseDir+files[i]);
        outf.write(`${files[i]}, ${stat.mtime.toLocaleString('en-US')}\n`);
    }
});
*/
