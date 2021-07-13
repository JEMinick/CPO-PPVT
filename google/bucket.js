require("dotenv").config()

const Cloud = require( '@google-cloud/storage' )
const path =  require( 'path' )
// let serviceKey = path.join(__dirname,'./keys.json');
let outputFile = path.join(__dirname,'./keys.json');

// let gcFile = path.join(__dirname,'./gcs-ppvt-bbd201c2e459.json');

const { Storage } = Cloud

let bError = false;
const fs = require('fs');

var sEnvKey = `${process.env.GCS_PROJECT_KEY}`;
var aEnvKey = sEnvKey.split("\n");
let sNewEnvKey = '';
for ( var i=0; i < aEnvKey.length; i++ ) {
  sNewEnvKey = sNewEnvKey + aEnvKey[i] + ((i < aEnvKey.length-1) ? '\\n' : '');
}
// console.log( `New EnvKey:` );
// console.log( sNewEnvKey );
if ( sNewEnvKey.length )
  sEnvKey = sNewEnvKey;

// const storage = new Storage({
//   projectId,
//   credentials: {
//       client_id,
//       client_email,
//       private_key,
//   }
// });

// const jKeysJSON =
// {
//   private_key: process.env.GCS_PROJECT_KEY,
//   client_email: process.env.GCS_CLIENT_EMAIL,
//   client_id: process.env.GCS_CLIENT_ID
// };

const sKeysJSON =`
{
  "type": "service_account",
  "project_id": "${process.env.GCS_PROJECT_ID}",
  "private_key_id": "${process.env.GCS_PROJECT_KEY_ID}",
  "private_key": "${sEnvKey}",
  "client_email": "${process.env.GCS_CLIENT_EMAIL}",
  "client_id": "${process.env.GCS_CLIENT_ID}",
  "auth_uri": "${process.env.GCS_AUTH_URL}",
  "token_uri": "${process.env.GCS_TOKEN_URL}",
  "auth_provider_x509_cert_url": "${process.env.GCS_AUTH_PROVIDER_X509_CERT_URL}",
  "client_x509_cert_url": "${process.env.GCS_CLIENT_X509_CERT_URL}"
}`;


// var stream = fs.createWriteStream("my_file.json");
// stream.once('open', function(fd) {
//   stream.write(`{\n`);
//   stream.write(`  "type": "service_account",\n`);
//   stream.write(`  "project_id": "${process.env.GCS_PROJECT_ID}",\n`);
//   stream.write(`  "private_key_id": "${process.env.GCS_PROJECT_KEY_ID}",\n`);
//   stream.write(`  "private_key": "${sEnvKey}",\n`);
//   stream.write(`  "client_email": "${process.env.GCS_CLIENT_EMAIL}",\n`);
//   stream.write(`  "client_id": "${process.env.GCS_CLIENT_ID}",\n`);
//   stream.write(`  "auth_uri": "${process.env.GCS_AUTH_URL}",\n`);
//   stream.write(`  "token_uri": "${process.env.GCS_TOKEN_URL}",\n`);
//   stream.write(`  "auth_provider_x509_cert_url": "${process.env.GCS_AUTH_PROVIDER_X509_CERT_URL}",\n`);
//   stream.write(`  "client_x509_cert_url": "${process.env.GCS_CLIENT_X509_CERT_URL}"\n`);
//   stream.write(`}\n`);
//   stream.end();
// });

fs.writeFile( outputFile, sKeysJSON, (error) => {
  if ( error ) {
      bError = true;
      console.error(error);
  } else {
    // if ( bDebugging )
    //   console.log(`\nFILE CONTENTS:`)
  }
});
if ( !bError ) {
  console.log( `Created file: ${outputFile}...` );
  // serviceKey = outputFile;
}
else {
  console.log( `Unable to create file: ${outputFile}...` );
}

// projectId: 'storage'
const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS
})
// keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS
// credentials: jKeysJSON
// keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS

// -------------------------------------------------------------------------------
// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
// const storage = new Storage();
// -------------------------------------------------------------------------------

// projectid: process.env.GCLOUD_PROJECT, 
// const storage = new Storage({
//   projectId: 'storage', 
//   credentials: {
//     client_email: process.env.GCLOUD_CLIENT_EMAIL, 
//     private_key: process.env.GCLOUD_PRIVATE_KEY
//   } 
// });

// const bucketName = 'cpo-ppvt-bucket'

const bucket = storage.bucket(process.env.GCS_BUCKET)

module.exports = bucket
