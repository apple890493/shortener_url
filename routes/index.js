const express = require('express')
const router = express.Router()
const Shorten = require('../models/shortUrls')
const generateUrl = require('./modules/generate_url')
const PORT = process.env.PORT || ''


router.get('/', (req, res) => {
  res.render('index')
})

router.post('/short', (req, res) => {
  let realUrl = req.body.urlName
  // 判別是否有(https://)
  if (!realUrl.includes('https://')) {
    realUrl = 'https://' + realUrl
  }

  Shorten.find()
    .lean()
    .then(data => {
      const checkUrl = data.find(item => item.realUrl === realUrl)
      const shortCode = generateUrl()
      if (checkUrl) {
        res.render('index', { shortUrl: checkUrl.shortUrl, realUrl: checkUrl.realUrl })
      } else {
        const checkCode = data.find(item => item.shortCode === shortCode)
        if (checkCode) {
          console.log('already have')
          shortCode = generateUrl()
        } else {
          const shortUrl = PORT + shortCode
          Shorten.create({
            shortCode,
            realUrl,
            shortUrl
          })
            .then(() => res.render('index', { realUrl, shortUrl }))
            .catch(error => console.log(error))
        }
      }
    })
    .catch(error => console.log(error))
})

router.get('/:short', (req, res) => {
  const short = req.params.short
  return Shorten.findOne({ shortUrl: `${short}` })
    .then((data) => res.redirect(`${data.realUrl}`))
    .catch(error => console.log(error))
})

module.exports = router