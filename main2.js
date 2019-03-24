const url = 'https://api.datamuse.com/words?';
// For antonyms
const queryParamsAnt = 'rel_ant=';
// additional parameters to be used

//HTML declarations for the antonyms
const inputFieldAnt = document.getElementById('inputPart2');
const submitButtonAnt = document.getElementById('submitPart2');
const resultAreaAnt = document.getElementById('textArea2');


const getSuggestionsAnt = () => {
  const wordQueryAnt = inputFieldAnt.value;
  const endpointAnt = `${url}${queryParamsAnt}${wordQueryAnt}`;
  
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderResponse(xhr.response);
    }
  }
  xhr.open('GET', endpointAnt);
  xhr.send();
}

//Clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(resultAreaAnt.firstChild){
    resultAreaAnt.removeChild(resultAreaAnt.firstChild);
  }
  getSuggestionsAnt();
}

submitButtonAnt.addEventListener('click', displaySuggestions);

// Now using helper functions 
const renderResponse = (res) => {
  // sends a response if response is false
  if(!res)
  {
    console.log(res.status)
  }
  // if the response comes back as a blank array:
  if(!res.length)
  {
    resultAreaAnt.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>"
    return;
  }

  // create an array to contain the HTML strings
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
  resultAreaAnt.innerHTML = `<p>Antonynms Includes:</p><ul>${wordList}</ul>`
  return;
}
// Render response before it is modified
const renderRawResponse = (res) => {
  // taking the first 10 words from res
  let trimmedResponse = res.slice(0, 10)
  //manipulates responseField to render the unformatted response
  resultAreaAnt.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`
}

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
  resultAreaAnt.innerHTML = `<pre>${rawJsons}</pre>`
}


