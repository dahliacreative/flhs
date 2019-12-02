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
    const entry = await environment.getEntry(data.tagId)

    record.fields.imageTags['en-US'] = record.fields.imageTags['en-US'].filter(t => t.sys.id !== data.tagId)

    const newRecord = await record.update()
    await newRecord.publish()
    const newEntry = await entry.unpublish()
    await newEntry.delete()
    callback(null, {
      statusCode: 200
    })
  } catch (error) {
    callback(null, {
      statusCode: 422,
      body: JSON.stringify(error)
    })
  }
}
