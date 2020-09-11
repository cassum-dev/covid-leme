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

function formatDateToDmy(date) {
    let splitDate = date.split('-'),
        day = splitDate[2],
        month = splitDate[1],
        year = splitDate[0];

    return day + '/' + month + '/' + year;
}

function formatDates(data) {
    if (typeof data == 'string') {
        return formatDateToDmy(data);
    }

    if (Array.isArray(data)) {
        let formatedDates = [];

        data.forEach(element => {
            formatedDates.push(formatDateToDmy(element))
        })

        return formatedDates;
    }
}

export { getCovidData, getPieCovidData, formatDates }
