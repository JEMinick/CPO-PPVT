const router = require('express').Router()

const uploadStorage = require('../google/upload-storage')

// router.post( '/', async (req, res) => {
//   try {
//     // console.log( `uploadRoutes.js POST: [${req.file.name}]` );
//     console.log( `uploadRoutes.js line:8:` );
//     // console.log( JSON.stringify(req.body) );
//     const imageUrl = await uploadStorage(req.file)

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

module.exports = router;
