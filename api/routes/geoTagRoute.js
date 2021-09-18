const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const GeoTag = require('../../models/geoTag')

router.post('/create', verifyToken, (req,res) => {
    if (!req.body.userId) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.date) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.tag) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.lat) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.lon) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    new GeoTag({
        userId: req.body.userId,
        date: req.body.date,
        tag: req.body.tag,
        lat: req.body.lat,
        lon: req.body.lon,
        building: req.body.building
    })
    .save()
    .then((newGeoTag) => {
        
        return res.status(200).json({
            status: 200,
            message: "GeoTag addedd succesfully"
        })
    })
    .catch((error) => {
        
        return res.status(400).json({
            status: 400,
            success: false,
            error: error
        })
    })
})

router.get('/getAllGeoTags', verifyToken, (req,res) =>{

    if (!req.query.userId) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    GeoTag.find({userId : req.query.userId})
     .then((geotags) => {
         return res.status(200).json({
             status: 200,
             data: geotags
         })
     })
     .catch((error) => {
        
        return res.status(400).json({
            status: 400,
            success: false,
            error: error
        })
    })
})

router.get('/locationTag', verifyToken, (req,res) =>{

    if (!req.query.userId) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.query.lat) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.query.lon) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    GeoTag.find({userId : req.query.userId, lat: req.query.lat, lon: req.query.lon})
     .then((geotags) => {
         return res.status(200).json({
             status: 200,
             data: geotags
         })
     })
     .catch((error) => {
        
        return res.status(400).json({
            status: 400,
            success: false,
            error: error
        })
    })
})

router.delete('/deleteTag', verifyToken, (req,res) =>{

    if (!req.body.userId) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.tagId) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    GeoTag.deleteOne({ _id: req.body.tagId, userId: req.body.userId})
     .then((data) =>{
        return res.status(200).json({
            status: 200,
            message: "Deleted successfully"
        })
     })
     .catch((error) => {
        
        return res.status(400).json({
            status: 400,
            success: false,
            error: error
        })
    })
})

router.patch('/updateTag', verifyToken, (req,res) =>{

    if (!req.body.userId) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.tagId) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.date) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.tag) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.lat) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.lon) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    GeoTag.updateOne({ _id: req.body.tagId, userId: req.body.userId},
        { $set: { date: req.body.date, tag: req.body.tag, lat: req.body.lat, lon: req.body.lon, building: req.body.building}})
        .then((update) =>{
            return res.status(200).json({
                status: 200,
                message: "Updated successfully"
            })
        })
        .catch((error) => {
        
            return res.status(400).json({
                status: 400,
                success: false,
                error: error
            })
        })
})
module.exports = router