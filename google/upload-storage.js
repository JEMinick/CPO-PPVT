const bucket = require( './bucket.js' )
require('dotenv').config()
const uuid = require("uuid");
const uuidv1 = uuid.v1;

/*
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = ( file ) => new Promise( (resolve, reject) => {

    const { originalname, buffer } = file
    let newFileName = uuidv1() + "---" + originalname.replace(/ /g,"_")
    // const blob = bucket.file( originalname.replace(/ /g,"_"))
    const blob = bucket.file( newFileName )
    const blobStream = blob.createWriteStream({
        resumable: false
    })

    blobStream.on( 'finish', () => {
        // const authenticatedUrl = `https://storage.cloud.google.com/${bucket.name}/${blob.name}`
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        resolve( publicUrl )
    })
    .on( 'error', (err) => {
        console.log(err)
        reject(`Unable to upload image, something went wrong...` )
    })
    .end( buffer )
})

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
const bucketName = process.env.GCS_BUCKET;
// The ID of your GCS file
// const fileName = 'your-file-name';
// Imports the Google Cloud client library
// const {Storage} = require('@google-cloud/storage');
// // Creates a client
// const storage = new Storage();

// async function deleteFile() {
//   await bucket.file(fileName).delete();

//   console.log(`gs://${bucketName}/${fileName} deleted`);
// }
// deleteFile().catch(console.error);

// ----

const deleteImage = async (file) => {
  await bucket.file(file).delete();
  console.log(`gs://${bucketName}/${file} deleted...`);
}

module.exports = { uploadImage, deleteImage }
