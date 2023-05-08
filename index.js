//const { json } = require('body-parser');
const express = require('express')
const app = express()

app.use(express.json())

let newData = [];   
const apiurl = 'http://avoindata.prh.fi/bis/v1/?businessId=';


createURL();

function createURL() {

    let dataToAPI = [
   // '1532726-8',
   // '1891976-0',
   // '2083639-0',
    '2432892-4',
    '0127485-5',
    '0974176-1',
    '2544336-9',
    '2399345-5',
    '0124461-3',
    '0203107-0'
    ];


    dataToAPI.map(combineURL);

    function combineURL(ID) {

      console.log(apiurl + ID)
        return fetchAPI((apiurl + ID));
    }

    function fetchAPI(apiFetch){
    //  setTimeout(function(){
    //  }, 5000);
        fetch(apiFetch).then(function(response) {
          console.log(response)

      /*    try {
            const myObject = JSON.parse(apiFetch);
          } catch (error) {
            if (error instanceof SyntaxError) {
              console.error('Invalid JSON:', error.message);
            } else {
              throw error;
            }
          }*/
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

}

  
  app.get('/', (req, res) => {
   // res.end(JSON.stringify(newData))

    res.json(newData)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })