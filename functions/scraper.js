import axios from 'axios'

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)
  axios.get(data.url).then(res => {
    callback({
      statusCode: 200,
      body: res
    })
  })
}
