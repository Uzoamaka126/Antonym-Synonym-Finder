// Information to reach API
const url = 'https://api.datamuse.com/words?';
// For synonyms
const queryParamsSyn = 'rel_syn=';
// additional parameters to be used
// const autoComplete = 'https://api.datamuse.com/sug';


// Selecting page elements
// For the synonyms
const inputFieldSyn = document.getElementById('inputPart');
const submitButtonSyn = document.getElementById('submitPart');
const resultAreaSyn = document.getElementById('textArea');

// AJAX function for the synonym
const getSuggestions = () => {
  const wordQuery = inputFieldSyn.value;
  const endpoint = `${url}${queryParamsSyn}${wordQuery}`;
  
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderResponse(xhr.response);
    }
  }
  xhr.open('GET', endpoint);
  xhr.send();
}

//Clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(resultAreaSyn.firstChild){
    resultAreaSyn.removeChild(resultAreaSyn.firstChild);
  }
  getSuggestions();
}

submitButtonSyn.addEventListener('click', displaySuggestions);
