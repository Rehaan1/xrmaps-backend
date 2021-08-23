const router = require('express').Router()
const admin = require('firebase-admin')
const jwt = require('jsonwebtoken')
const User = require('../../models/userModel')

admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

router.post('/login',(req,res) => {
    if(!req.body.idToken){
        return res.status(400).json({
            status: 400,
            error: 'Missing required parameters. Refer Documentation'
        })
    }

    admin  
      .auth()
      .verifyIdToken(req.body.idToken.toString())
      .then((decodedToken) => {
          
            User.findOne({ email: decodedToken.email })
              .then((currentUser) => {
                  if(currentUser)
                  {
                      const token = jwt.sign({ _id: currentUser._id, name: currentUser.username, email: decodedToken.email, thumbnail: currentUser.thumbnail}, process.env.TOKEN_SECRET)
                      
                      return res.status(200).json({
                          status: 200,
                          success: true,
                          authToken: token
                      }) 
                  }
                  else
                  {
                      new User({
                          username: decodedToken.name,
                          thumbnail: decodedToken.picture,
                          email: decodedToken.email
                      })
                        .save()
                        .then((newUser) => {
                            const token = jwt.sign({ _id: newUser._id, name: newUser.username, email: newUser.email, thumbnail: newUser.thumbnail}, process.env.TOKEN_SECRET) 
                            
                            return res.status(200).json({
                                status: 200,
                                success: true,
                                authToken: token
                            })
                        })
                        .catch((error) => {
                            return res.status(400).json({
                                status: 400,
                                success: false,
                                error: error
                            })
                        })
                  }
              })
              .catch((error) => {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    error: error
                })
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