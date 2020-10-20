import CovidData from "./datasources/covid.json";
import CovidCasesBySex from './datasources/covid-cases-by-sex.json';


function getCovidData(field, timeRange) {
    let results = [],
        firstDate = timeRange[0],
        lastDate = timeRange[1];

    CovidData.forEach(element => {
        results.push(element[field])
    });

    return results.slice(firstDate, lastDate)
}

function getLastCovidData(field, timeRange, useCasesBySex) {
    let dataSource = useCasesBySex ? CovidCasesBySex : CovidData,
        firstDate = timeRange[0],
        lastDate = timeRange[1];

    let lastElement = dataSource[firstDate, (lastDate - 1)]

    return lastElement[field];
}

function getMobileAverage(field, days, timeRange) {
    let firstDate = timeRange[0],
        lastDate = timeRange[1],

        dataLength = lastDate - firstDate,
        mobileAverageData = new Array(parseInt(dataLength)).fill(0),

        firstData = lastDate > days
            ? CovidData[lastDate - days][field]
            : CovidData[0],
        lastData = CovidData[lastDate - 1][field],

        average = (lastData - firstData) / days;

    for (let i = 0; i < days; i++) {
        mobileAverageData.push(lastData + Math.ceil(average));

        lastData += Math.ceil(average)
    }

    return mobileAverageData;
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
    let chartDatasets = [],
        firstDate = timeRange[0],
        lastDate = timeRange[1];

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

    chartLabels.slice(firstDate, lastDate)
    chartDatasets.slice(firstDate, lastDate)

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
