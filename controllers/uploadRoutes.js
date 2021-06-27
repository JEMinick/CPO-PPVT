const router = require('express').Router()

const uploadStorage = require('../google/upload-storage')

router.post( '/', async (req, res) => {
  try {
    console.log( `Uploading file: [${req.file.name}]` );
    // res.status(200).json({
    //   message: 'upload was successful',
    //   data: req.file
    // })
    const imageUrl = await uploadStorage(req.file)

    // Add the imageUrl to a local db table...

    res.status(200).json({
      message: 'upload was successful',
      data: imageUrl
    })
  }
  catch(err) {
    res.status(500).json({err})
  }
})

module.exports = router
