const router = require('express').Router()

const {uploadImage, deleteImage} = require('../google/upload-storage')

// router.post( '/', async (req, res) => {
//   try {
//     // console.log( `uploadRoutes.js POST: [${req.file.name}]` );
//     console.log( `uploadRoutes.js line:8:` );
//     // console.log( JSON.stringify(req.body) );
//     const imageUrl = await uploadImage(req.file)

//     // Add the imageUrl to a local db table...

//     res.status(200).json({
//       message: 'upload was successful',
//       data: imageUrl
//     })
//   }
//   catch(err) {
//     // console.log( err );
//     res.status(500).json({err})
//   }
// })

router.post( '/', async (req, res) => {
  try {
    const myFile = req.file
    const imageUrl = await uploadImage(myFile)

    // Add the imageUrl to a local db table...

    res.status(200).json({
      message: 'upload was successful',
      data: imageUrl
    })
  }
  catch(err) {
    console.log( '\nUPLOAD ERROR:' );
    console.log( err );
    res.status(400).json({err})
  }
})

router.delete( '/', async (req, res) => {
  let myFile = req.body.file
  try {
    console.log( `\nrouter.delete('${myFile}')\n` )
    let aFile = myFile.split('/');
    if ( aFile.length > 1 ) {
      myFile = aFile[aFile.length-1]
    }
    await deleteImage(myFile)

    res.status(200).json({
      message: 'upload deletion was successful',
      data: myFile
    })
  }
  catch(err) {
    // console.log( '\nUPLOAD ERROR:' )
    // console.log( err )
    res.status(400).json({
      err,
      message: 'An error occured deleting the upload image',
      data: myFile
    })
  }
})

module.exports = router;
