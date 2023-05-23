
//const Parser = require('@json2csv/plainjs');
const { json } = require('body-parser');
const express = require('express')
const app = express()
const fs = require('fs');

app.use(express.json())

let IDArray = [];
let cityArray = [];
let streetAddressArray = [];
let wholeURL;
const apiurl = 'http://avoindata.prh.fi/bis/v1/?businessId=';
let arrayObject = {};

const dataToAPI = [
  '0100289-2'

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
    if(i === dataToAPI.length+1){
        stopInterval();

      //write to file when all id's have been gone through
        const myJSON = JSON.stringify(arrayObject);
        fs.appendFile('test.csv', myJSON, err => {
          if (err) {
            console.error(err);
          }
        });

    }
  }, 500);


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
    for(let j = 0; j < jsonData.results[0].addresses.length; j++){
      console.log(jsonData.results[0].addresses)
    //if there is not end date on the address
    //push ID and street address to own arrays
      if(jsonData.results[0].addresses[j].endDate === null){

        IDArray.push(jsonData.results[0].businessId);
        streetAddressArray.push(jsonData.results[0].addresses[j].street + " " + jsonData.results[0].addresses[j].postCode + " " + jsonData.results[0].addresses[j].city);
        break;
      }
    }
  //push ID and city to own arrays
    // IDArray.push(jsonData.results[0].businessId);
    // cityArray.push(jsonData.results[0].registedOffices[0].name);
    // newData.push(jsonData.results[0].addresses[0].street + " " + jsonData.results[0].addresses[0].postCode + " " + jsonData.results[0].addresses[0].city)
     
  // Using loop to insert key
  // value in Object
    for(let i = 0; i < IDArray.length; i++){
        //arrayObject[IDArray[i]] = cityArray[i];
          arrayObject[IDArray[i]] = streetAddressArray[i];
    }
  }
    catch(err){
      console.error(err);
    }
}

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

