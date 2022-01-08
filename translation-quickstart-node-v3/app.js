const { Translate } = require('@google-cloud/translate').v2
require('dotenv').config()

// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)

// Configuration for the client
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id
})

async function translateText (text, target) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target)
  translations = Array.isArray(translations) ? translations : [translations]
  console.log('Translations:')
  return translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`)
  })
}
module.exports = translateText
// const inputStr = 'hello, how are you today?'
// const inputL = 'en'
// const outputL = 'hi'

// translateText(inputStr, outputL)
// const reverse = 'हैलो आज आप कैसे हैं?'
// translateText(reverse, inputL)
