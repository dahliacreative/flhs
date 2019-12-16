const rp = require('request-promise')
const $ = require('cheerio')

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  rp(data.url).then(html => {
    const title = $('title', html)
    callback({
      statusCode: 200,
      body: JSON.stringify({
        title
      })
    })
  })
}
