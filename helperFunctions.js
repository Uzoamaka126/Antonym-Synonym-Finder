// Formats response to look presentable on webpage
// All our helper functions in one place
const renderResponse = (res) => {
    // handles if response is false
  if(!res)
  {
      console.log(res.status)
  }
  // if the response comes back as a blank array:
  if(!res.length)
  {
    resultAreaSyn.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>"
    resultAreaAnt.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>"
    return;
  }
  // creating an array to contain the HTML strings
  let wordList = []
  // looping through the response and maxxing out at 10
  for(let i = 0; i < Math.min(res.length, 10); i++)
  {
    // create a list of similar words, push them to the new array
    wordList.push(`<li>${res[i].word}</li>`)
  }
  // join the array of HTML strings into one string
  wordList = wordList.join("")
  // make the responseField to render the modified response
  resultAreaSyn.innerHTML = `<p>Synonms Includes:</p><ul>${wordList}</ul>`
  return;
}
// Render response before it is modified
const renderRawResponse = (res) => {
  // taking the first 10 words from res
  let trimmedResponse = res.slice(0, 10)
  //manipulates responseField to render the unformatted response
  resultAreaSyn.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`
}
  
//   Second function for the antonyms
// Renders the JSON that was returned when the Promise from fetch resolves.
const renderJsonResponses = (res) => {
  // creating an empty object to store the JSON in key-value pairs
  let rawJsons = {}
  for(let key in response)
  {
    rawJsons[key] = response[key]
  }
  // converts JSON into a string and adding line breaks to make it easier to read
  rawJsons = JSON.stringify(rawJsons).replace(/,/g, ", \n")
  // manipulates responseField to show the returned JSON.
  resultAreaSyn.innerHTML = `<pre>${rawJsons}</pre>`
}

  // Renders response before it is modified
const renderRawResponses = (res) => {
  // taking the first 10 words from res
  let trimmedResponses = res.slice(0, 10)
  //manipulates responseField to render the unformatted response
  resultAreaSyn.innerHTML = `<text>${JSON.stringify(trimmedResponses)}</text>`
}