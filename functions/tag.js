import { createClient } from 'contentful-management'

const client = createClient({
  accessToken: process.env.CMS_TOKEN
})

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  client
    .getSpace(process.env.REACT_APP_SPACE_ID)
    .then(space => space.getEnvironment(process.env.ENV_ID))
    .then(environment =>
      environment.createEntry(process.env.CONTENT_TYPE_ID, {
        fields: {
          title: {
            'en-US': data.title
          },
          tagData: {
            'en-US': data.tagData
          }
        }
      })
    )
    .then(entry => {
      entry.publish()
      callback(null, {
        statusCode: 200
      })
    })
    .catch(error => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(error)
      })
    })
}
