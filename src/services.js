import CovidData from "./datasources/covid.json";
import CovidCasesBySex from './datasources/covid-cases-by-sex.json';


function getCovidData(field, timeRange) {
    let results = [];

    CovidData.forEach(element => {
        results.push(element[field])
    });

    return timeRange > 0 ? results.slice(0, timeRange) : results;
}

function getLastCovidData(field, timeRange, casesBySex) {
    let dataSource = casesBySex ? CovidCasesBySex : CovidData;

    let lastElement = timeRange > 0
            ? dataSource[timeRange - 1]
            : dataSource[dataSource.length - 1];

    return lastElement[field];
}

function getMobileAverage(field, days, timeRange) {
    let dataLength = timeRange >= days ? timeRange : CovidData.length,

        firstData = CovidData[dataLength - days][field],
        lastData = CovidData[dataLength - 1][field],

        mobileAverage = new Array(parseInt(dataLength)).fill(0),

        average = (lastData - firstData) / days;

    for (let i = 0; i < days; i++) {
        mobileAverage.push(lastData + Math.ceil(average));

        lastData = lastData + Math.ceil(average)
    }

    return mobileAverage;
}

function getMobileAverageDates(days, timeRange) {
    var startDate = getLastCovidData('date', timeRange),
        dates = getCovidData('date', timeRange);

    for (let i = 0; i < days; i++) {
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

function buildChartData (chartLabels, dataLabels, colors, chartData, timeRange, useXAxis, fill) {
    let chartDatasets = [];

    chartData.forEach((element, key) => {
        chartDatasets.push(
            {
                label: dataLabels[key],
                borderColor: colors[key],
                backgroundColor: colors[key],
                fill: fill,
                data: useXAxis ? chartData[key] : [chartData[key]],
            },
        );
    });

    if (timeRange > 0) {
        chartLabels.slice(0, timeRange)
        chartDatasets.slice(0, timeRange)
    }

    return {
        labels: chartLabels,
        datasets: chartDatasets
    }
}

export {
    getCovidData,
    getLastCovidData,
    formatDates,
    getMobileAverage,
    getMobileAverageDates,
    buildChartData,
}
