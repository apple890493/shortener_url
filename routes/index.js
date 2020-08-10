const express = require('express')
const router = express.Router()
const Shorten = require('../models/shortUrls')
const generateUrl = require('./generate_url')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/short', (req, res) => {
  let realUrl = req.body.urlName
  if (!realUrl.includes('https://')) {
    realUrl = 'https://' + realUrl
  }

  const shortCode = generateUrl(5)
  Shorten.find()
    .lean()
    .then(data => {
      if (data.shortCode === shortCode) {
        shortCode = generateUrl(5)
      } else {
        Shorten.create({
          shortCode,
          realUrl
        })
          .then(() => res.render('index', { shortCode, realUrl }))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
})

router.get('/:shortUrl', (req, res) => {
  const short = req.params.shortUrl
  console.log(short)
  return Shorten.findOne({ shortCode: `${short}` })
    .lean()
    .then((data) => res.redirect(`${data.realUrl}`))
    .catch(error => console.log(error))
})

module.exports = router