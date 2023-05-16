
//const Parser = require('@json2csv/plainjs');
const { json } = require('body-parser');
const express = require('express')
const app = express()
const fs = require('fs');

app.use(express.json())

let IDArray = [];
let cityArray = [];
let wholeURL;
const apiurl = 'http://avoindata.prh.fi/bis/v1/?businessId=';
let arrayObject = {};

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

  //combine apiurl with specific ID
function combineURL(ID) {
  wholeURL = apiurl+ID;
  return wholeURL;
}

let urls = dataToAPI.map(combineURL);
let i = 0;

const myInterval = setInterval( () => {
    
    fetchAPI(urls[i])  
    i++;
    //stop looping after all id's have been gone through
    if(i === dataToAPI.length + 1){
        stopInterval();
        //console.log(myJSON, "objekti")

        //write to file when all id's have been gone through
        const myJSON = JSON.stringify(arrayObject);
        try {
          fs.writeFileSync('/Users/FIX2OLJO/FullStackOpen/apitesti/test.csv', myJSON);
          // file written successfully
        
        } catch (err) {
          console.error(err);
        }

    }
  }, 1000);


function stopInterval() {
  clearInterval(myInterval);
}

//fetch each api
function fetchAPI(apiFetch){

    fetch(apiFetch).then(function(response) {
        return response.json();
    }).then(function(data) {
        showResults(data)            				
    }).catch(function(error){    
        console.log(error);            
    });

}

function showResults(jsonData) {   
  try{
    //push ID and city to own arrays
    IDArray.push(jsonData.results[0].businessId);
    cityArray.push(jsonData.results[0].registedOffices[0].name);
    //    newData.push(jsonData.results[0].addresses[0].street + " " + jsonData.results[0].addresses[0].postCode + " " + jsonData.results[0].addresses[0].city)
     
    // Using loop to insert key
    // value in Object
    for(let i = 0; i < IDArray.length; i++){
        arrayObject[IDArray[i]] = cityArray[i];
    }
  }
    catch(err){
      console.error("id not found");
    }
}

/* 
//use parser for json to csv
try {
  const opts = {};
  const parser = new Parser(opts);
  const csv = parser.parse(newData);
  console.log(csv);
} catch (err) {
  console.error(err);
}
*/

/*
//server
app.get('/', (req, res) => {
res.json(newData)
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

*/

