const fs = require('fs');

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

async function doit(base, fn, outf) {
    // Performs text detection on the image file
    const [result] = await client.textDetection(base+fn);
    const text = result.textAnnotations;
    let rst = fs.createWriteStream(fn+".txt");
    rst.write(text[0].description);
    rst.end();
    //console.log('Text:');
    //text.forEach(text => console.log(text.description));
    let ary = text[0].description.split("\n");
    const st = fs.statSync(base+fn);
    outf.write(`${ary[0]},${ary[1]},${fn},${st.mtime.toLocaleDateString()},${st.mtime.toLocaleTimeString()}\n`);
}
const srcDir = "..\\sample5\\";
const outf = fs.createWriteStream("20230804_181003834_iOS.csv");
//outf.write("關卡,分數,File,Date,Time\n");
doit(srcDir, '20230804_181003834_iOS.png', outf);
console.log("done");