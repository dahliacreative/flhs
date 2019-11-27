import { createClient } from 'contentful-management'

const client = createClient({
  accessToken: process.env.CMS_TOKEN
})

exports.handler = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.body)
    const space = await client.getSpace(process.env.REACT_APP_SPACE_ID)
    const environment = await space.getEnvironment(process.env.ENV_ID)
    const record = await environment.getEntry(data.recordId)
    const entry = await environment.createEntry(process.env.CONTENT_TYPE_ID, {
      fields: {
        title: {
          'en-US': data.title
        },
        tagData: {
          'en-US': data.tagData
        }
      }
    })
    await entry.publish()
    const link = {
      sys: {
        id: entry.sys.id,
        linkType: 'Entry',
        type: 'Link'
      }
    }
    if (record.fields.imageTags) {
      record.fields.imageTags['en-US'].concat([link])
    } else {
      record.fields.imageTags = {
        'en-US': [link]
      }
    }
    await record.update()
    await record.publish()
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(entry)
    })
  } catch (error) {
    callback(null, {
      statusCode: 422,
      body: JSON.stringify(error)
    })
  }
}
