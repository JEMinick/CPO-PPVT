const Cloud = require( '@google-cloud/storage' )
const path =  require( 'path' )
const serviceKey = path.join(__dirname,'./keys.json');

const { Storage } = Cloud

const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'storage'
})

const bucketName = 'cpo-ppvt-bucket'

const bucket = storage.bucket(bucketName)

module.exports = bucket
