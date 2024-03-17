const fs = require('fs');

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

async function doit(base, fns, idx, outf) {
    // Performs text detection on the image file
    const [result] = await client.textDetection(base+fns[idx]);
    const text = result.textAnnotations;
    let rst = fs.createWriteStream(jsonDir+fns[idx]+".txt");
    rst.write(text[0].description);
    rst.end();
    //console.log('Text:');
    //text.forEach(text => console.log(text.description));
    let ary = text[0].description.split("\n");
    console.log(`[${idx+1}/${fns.length}] ${ary[7]}, ${ary[8]}, ${fns[idx]} done`);
    const st = fs.statSync(base+fns[idx]);
    outf.write(`${ary[7]},${ary[8]},${fns[idx]},${st.mtime.toLocaleDateString()},${st.mtime.toLocaleTimeString()}\n`);
}

const srcDir = "..\\sample5\\";
const jsonDir = "..\\json5\\";
fs.readdir(srcDir, async(e, files) =>{
    if (e) {
        return;
    }
    let outf = fs.createWriteStream("..\\sample5.csv");
    console.log(`${files.length} files to go.`);
    //outf.write("關卡,分數,File,Date,Time\n");
    for (let i=0; i < files.length; i++) {
        await doit(srcDir, files, i, outf);
    }
});
