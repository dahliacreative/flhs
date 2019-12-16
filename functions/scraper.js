const rp = require('request-promise')
const $ = require('cheerio')

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  rp(data.url).then(html => {
    const title = $('title', html).text()
    const description =
      $('meta[title="description"]', html).attr('content') || $('meta[property="og:description"]', html).attr('content')
    const image =
      $('meta[property="og:img"]', html).attr('src') ||
      $('main img', html)
        .first()
        .attr('src') ||
      $('img', html)
        .first()
        .attr('src')
    callback({
      statusCode: 200,
      body: {
        title,
        description,
        image
      }
    })
  })
}
