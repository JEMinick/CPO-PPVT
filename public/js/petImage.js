let inputFile  = './assets/images/SweetPea.jpg';
let outputFile = 'output.jpg';

// const sharp = require('sharp');

// sharp(inputFile).resize({ height: 780 }).toFile(outputFile)
//     .then(function(newFileInfo) {
//         // newFileInfo holds the output file properties
//         console.log("Success")
//     })
//     .catch(function(err) {
//         console.log("Error occured");
//     });
    
// sharp(inputFile).resize({ width: 520 }).toFile(outputFile)
//     .then(function(newFileInfo) {
//         console.log("Success");
//     })
//     .catch(function(err) {
//         console.log("Error occured");
//     });

// ----------------------------------------------------------------------------

const sharp = require('sharp');
const fs = require('fs');

// input stream
let inStream = fs.createReadStream(inputFile);

// output stream
let outStream = fs.createWriteStream(outputFile, {flags: "w"});

// on error of output file being saved
outStream.on('error', function() {
    console.log("Error");
});

// on success of output file being saved
outStream.on('close', function() {
    console.log("Successfully saved file");
});

// input stream transformer
// "info" event will be emitted on resize
let transform = sharp()
    .resize({ width: 711, height: 400 })
    .on('info', function(fileInfo) {
        console.log("Resizing done, file not saved");
    });

inStream
  .pipe(transform)
  .pipe(outStream);

