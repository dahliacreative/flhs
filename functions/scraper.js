const rp = require('request-promise')
const cheerio = require('cheerio')
const axios = require('axios')

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  axios
    .get(data.url)
    .then(({ data }) => {
      const $ = cheerio.load(data)
      callback({
        statusCode: 200,
        body: JSON.stringify({
          thing: 'hi'
        })
      })
    })
    .catch(err => {
      callback({
        statusCode: 422,
        body: JSON.stringify(err)
      })
    })
}
