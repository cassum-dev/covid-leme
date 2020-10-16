import CovidData from "./datasources/covid.json";
import CovidCasesBySex from './datasources/covid-cases-by-sex.json';


function getCovidData(field) {
    let results = [];

    CovidData.forEach(element => {
        results.push(element[field])
    });

    return results;
}

function getCovidDataTest(field, time) {
    let results = [];


    CovidData.forEach(element => {
        results.push(element[field])
    });

    if (time > 0) {
        return results.slice(0, time);
    }

    return results
}

function getLastCovidData(field) {

    let last_element = CovidData[CovidData.length - 1];

    return last_element[field];
}

function getCovidCasesBySex(field) {
    let last_element = CovidCasesBySex[CovidCasesBySex.length - 1];

    return last_element[field];
}

function getMobileAverage(field, days) {
    let firstData = CovidData[CovidData.length - days][field],
        lastData = CovidData[CovidData.length - 1][field],

        mobileAverage = new Array(CovidData.length).fill(0),

        average = (lastData - firstData) / days;

    for (let i = 0; i < days; i++) {
        mobileAverage.push(lastData + Math.ceil(average));

        lastData = lastData + Math.ceil(average)
    }

    return mobileAverage;
}

function getMobileAverageDates(days) {
    var startDate = getLastCovidData('date'),
        dates = getCovidData('date');

    for (let i = 1; i <= days; i++) {
        let date = new Date(startDate);

        date.setDate(date.getDate() + i);

        dates.push(date.toISOString().split('T')[0]);
    }

    return formatDates(dates);
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

function buildDatasets (labels, colors, data, useXAxis, fill) {
    var datasets = [];

    data.forEach((element, key) => {
        datasets.push(
            {
                label: labels[key],
                borderColor: colors[key],
                backgroundColor: colors[key],
                fill: fill,
                data: useXAxis ? data[key] : [data[key]],
            },
        );
    });

    return datasets;
}

export {
    getCovidData,
    getLastCovidData,
    getCovidCasesBySex,
    formatDates,
    getMobileAverage,
    getMobileAverageDates,
    buildDatasets,
    getCovidDataTest,
}
