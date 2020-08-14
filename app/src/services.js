import CovidData from "./datasources/covid.json";


function getCovidData(field) {
    let results = [];

    CovidData.forEach(element => {
        results.push(element[field])
    });

    return results;
}

function getPieCovidData(field) {
    let last_element = CovidData[CovidData.length - 1];

    return last_element[field];
}


export { getCovidData, getPieCovidData }