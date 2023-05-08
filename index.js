
const { json } = require('body-parser');
const express = require('express')
const app = express()

app.use(express.json())

let newData = [];   
let apiFetch;
const apiurl = "http://avoindata.prh.fi/bis/v1/?businessId=";
let arrayLength;

createURL();

function createURL() {

    let dataToAPI = [
    //'1532726-8',
   // '1891976-0',
    '2083639-0',
    '2432892-4',
   // '0127485-5',
    '0974176-1',
    '2544336-9',
    '2399345-5',
    '0124461-3',
    '0203107-0'
    ]

    for(let i = 0; i < dataToAPI.length; i++){
        let businessID = dataToAPI[i];   

        apiFetch = apiurl + businessID;
        arrayLength = dataToAPI.length; 
        console.log(apiFetch)
        fetchAPI(apiFetch);                                  

    }

    function fetchAPI(fetchAPI){


        fetch(fetchAPI).then(function(response) {
          //  console.log(response)
            return response.json();
        }).then(function(data) {
            console.log(data)
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

}

  
  app.get('/', (req, res) => {
    res.json(newData)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })