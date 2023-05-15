
//const Parser = require('@json2csv/plainjs');
const { json } = require('body-parser');
const express = require('express')
const app = express()



app.use(express.json())

let newData = [];
let wholeURL;
let array = [];
const apiurl = 'http://avoindata.prh.fi/bis/v1/?businessId=';

const dataToAPI = [
  '1532726-8',
  '1891976-0',
  '2083639-0',
  '2432892-4',
  '0127485-5',
  '0974176-1',
  '2544336-9',
  '2399345-5',
  '0124461-3',
  '0203107-0'
  ];

  //combine 
function combineURL(ID) {
  wholeURL = apiurl+ID;
  return wholeURL;
}

let urls = dataToAPI.map(combineURL);
let i = 0;

const myInterval = setInterval( () => {
      fetchAPI(urls[i])
    
    i++;
    if(i === dataToAPI.length + 1){
        stopInterval();
    }
  }, 1000);


function stopInterval() {
  clearInterval(myInterval);
}

    
function fetchAPI(apiFetch){
    fetch(apiFetch).then(function(response) {
        return response.json();
    }).then(function(data) {
      //console.log(data)
        showResults(data)            				
    }).catch(function(error){    
        console.log(error);            
    });

}

function showResults(jsonData) {   
// console.log(jsonData) 
newData.push(jsonData.results[0].businessId);
newData.push(jsonData.results[0].registedOffices[0].name);
//    newData.push(jsonData.results[0].addresses[0].street + " " + jsonData.results[0].addresses[0].postCode + " " + jsonData.results[0].addresses[0].city)
}

/*
try {
  const opts = {};
  const parser = new Parser(opts);
  const csv = parser.parse(newData);
  console.log(csv);
} catch (err) {
  console.error(err);
}
*/

app.get('/', (req, res) => {
res.json(newData)
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

  // testaa millä ms etenee
  //lataa kirjasto json to excel
  // luo array itemeistä objektit
  // write to file lopussa