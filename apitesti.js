
'use strict';

const apiurl = "http://avoindata.prh.fi/bis/v1/?businessId=";
let apiKysely;
let newData = [];   
let arrayPituus;

const hakunappi = document.getElementById("hakunappi");
const hakuteksti = document.getElementById('hakuteksti');
const tulokset = document.querySelector('#APIhaku');

hakunappi.addEventListener('click', teeKysely);


function teeKysely() {

    document.querySelector('#APIhaku').innerHTML = '';

    const value = hakuteksti.value; 

    let dataToAPI = ['1532726-8',
    '1891976-0',
    '2083639-0',
    '2432892-4',
    '0127485-5',
    '0974176-1',
    '2544336-9',
    '2399345-5'
    ]

    for(let i = 0; i < dataToAPI.length; i++){
        let hakusana = dataToAPI[i];   

        apiKysely = apiurl + hakusana;
        arrayPituus = dataToAPI.length; 

       // console.log("Lähetettävä kysely: " + apiKysely);

        teeHaku(apiKysely, arrayPituus);                                  

    }

function teeHaku(apiKysely, arrayPituus)  {

    fetch(apiKysely).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus(json, arrayPituus);				
    }).catch(function(error){          
        console.log(error);            
    });
}

function naytaVastaus(jsonData, arrayPituus) {
    

        newData.push(jsonData.results[0].businessId);
        newData.push(jsonData.results[0].registedOffices[0].name);
        console.log(arrayPituus + "ja " + newData.length)  

        if(newData.length === 500){
            let htmlKoodi =
                `
            <p>

                    ${newData}
            </p>
                `;

            tulokset.innerHTML += htmlKoodi;

        }

    }

}

    





