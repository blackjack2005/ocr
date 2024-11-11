if (process.argv.length < 3) {
	console.log('Usage: node det.js imgfile');
	process.exit(1);
}

const fs = require('fs');
const target = process.argv[2]
console.log(target)

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

async function doit(imgfile) {
    // Performs text detection on the image file
    const [result] = await client.textDetection(imgfile);
    const text = result.textAnnotations;
    let rst = fs.createWriteStream(imgfile+".txt");
    rst.write(text[0].description);
    rst.end();
}

doit(target)
