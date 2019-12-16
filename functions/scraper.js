const rp = require('request-promise')
const cheerio = require('cheerio')
const axios = require('axios')

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  callback({
    statusCode: 200,
    body: {
      thing: 'hi!'
    }
  })
}
