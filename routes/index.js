const express = require('express')
const router = express.Router()
const Shorten = require('../models/shortUrls')
const generateUrl = require('./modules/generate_url')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/short', (req, res) => {
  const header = req.headers.origin
  let realUrl = req.body.urlName
  // 判別是否有(https://)
  if (!realUrl.includes('https://')) {
    realUrl = 'https://' + realUrl
  }

  Shorten.find()
    .lean()
    .then(data => {
      const checkUrl = data.find(item => item.realUrl === realUrl)
      if (checkUrl) {
        res.render('index', { shortUrl: checkUrl.shortUrl, realUrl: checkUrl.realUrl })
      } else {
        let shortCode = generateUrl()
        const checkCode = data.find(item => item.shortCode === shortCode)
        while (checkCode) {
          shortCode = generateUrl()
        }
        const shortUrl = header + '/' + shortCode
        Shorten.create({
          shortCode,
          realUrl,
          shortUrl
        })
          .then(() => res.render('index', { realUrl, shortUrl, shortCode }))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
})

router.get('/:short', (req, res) => {
  const short = req.params.short
  return Shorten.findOne({ shortCode: `${short}` })
    .then((data) => res.redirect(`${data.realUrl}`))
    .catch(error => console.log(error))
})

module.exports = router