// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2
require('dotenv').config()

// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)

// Configuration for the client
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id
})
// // Creates a client
// const translate = new Translate()

async function listLanguages () {
  // Lists available translation language with their names in English (the default).
  const [languages] = await translate.getLanguages()

  console.log('Languages:')
  languages.forEach((language) => console.log(language))
}

listLanguages()
