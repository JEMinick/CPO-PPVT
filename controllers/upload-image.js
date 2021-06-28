const router = require('express').Router()

const uploadStorage = require('../google/upload-storage')

router.post( '/new-image', async (req, res) => {
  try {
    const myFile = req.file
    const imageUrl = await uploadStorage(myFile)

    // Add the imageUrl to a local db table...

    res.status(200).json({
      message: 'upload was successful',
      data: imageUrl
    })
  }
  catch(err) {
    res.status(400).json({err})
  }
})

module.exports = router
