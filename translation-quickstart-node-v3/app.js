const { Translate } = require('@google-cloud/translate').v2
const { TranslationServiceClient } = require('@google-cloud/translate')
require('dotenv').config()

// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)

// Configuration for the client
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id
})

const translationClient = new TranslationServiceClient({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id
})

async function translateText (text, source, target) {
  // Construct request
  const request = {
    parent: `projects/${CREDENTIALS.project_id}/locations/global`,
    contents: [text],
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: source,
    targetLanguageCode: target
  }
  let val
  // Run request
  const [response] = await translationClient.translateText(request)

  //   for (const translation of response.translations) {
  //     console.log(`Translation: ${translation.translatedText}`)
  //     val = translation.translatedText
  //   }
  //   console.log(response.translations[0].translatedText)
  val = response.translations[0].translatedText
  return val
}

async function run (text, source, target) {
  const data = await translateText(text, source, target)
  console.log(data)
  return data
}
// FUTURE START HERE
// NEED TO ALTER run2 function to make it modular
// since now we are passing in the entire 'post' object found by mongoose, for the '.title' and '.description' we can use 'post.language' as the source and pass in user and make 'user.language' the target in the awaits.
async function run2 (obj) {
  const data = {}
  data.title = await translateText(obj.title, 'hi', 'en')
  data.description = await translateText(obj.description, 'hi', 'en')
  console.log(data)
  return data
}
// const info = {
//   transTitle: 'hello',
//   transDescription: 'my friend'
// }
// const info2 = {
//     transTitle:
// }
// run2(info)
// console.log(run('hello', 'en', 'fr'))
// async function translateText (text, source, target) {
//   // Translates the text into the target language. "text" can be a string for
//   // translating a single piece of text, or an array of strings for translating
//   // multiple texts.
//   let [translations] = await translate.translate(text, source, target)
//   //   console.log([translations])
//   translations = Array.isArray(translations) ? translations : [translations]
//   //   console.log(translations)
//   console.log('Translations:')
//   let result = await translations.forEach((translation, i) => {
//     console.log(`${text[i]} =>  ${translation}`)
//   })
//   return result
// }

const promiseTranslate = (text, target) => {
  return new Promise(function (resolve, reject) {
    resolve(translate.translate(text, target))
  })
    .then(res => {
      console.log('resso,', res[0])
    })
}

// promiseTranslate('हैलो आज आप कैसे हैं?', 'en')
// let bob = translateText('हैलो आज आप कैसे हैं?', 'en')
// console.log('space ', bobby)
// module.exports = translateText
// const inputStr = 'hello, how are you today?'
// const inputL = 'en'
// const outputL = 'hi'
module.exports = {
  translateText,
  run,
  run2,
  promiseTranslate
}
