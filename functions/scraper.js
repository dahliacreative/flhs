import request from 'request'

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  request(data.url, (e, r, b) => {
    callback({
      statusCode: 200,
      body: JSON.stringify(b)
    })
  })
}
