import CovidData from "./datasources/covid.json";
import CovidCasesBySex from './datasources/covid-cases-by-sex.json';
import VaccinatedData from './datasources/covid-vaccinated.json';
import CovidCityStatusData from './datasources/covid-city-status.json';


const DATA_SOURCE_RELATION = {
    'covid_data': CovidData,
    'covid_cases_by_sex': CovidCasesBySex,
    'vaccinated_data': VaccinatedData,
    'covid_city_status': CovidCityStatusData,
}

function getCovidData(field, timeRange) {
    let firstDate = timeRange[0],
        lastDate = timeRange[1];

    let results = CovidData.map(element => {
        return element[field];
    });

    return results.slice(firstDate, lastDate)
}

function getLastCovidData(field, timeRange=null, dataSource='covid_data') {
    let data = DATA_SOURCE_RELATION[dataSource],
        lastElement = null;

    if (timeRange !== null) {
        let [firstDate, lastDate] = timeRange;

        lastElement = data[firstDate, (lastDate - 1)];
    } else {
        lastElement = data[data.length - 1];
    }

    return lastElement[field];
}

function getPrevisionData(field, days, timeRange) {
    let [firstDate, lastDate] = timeRange,

        dataLength = lastDate - firstDate,
        previsionData = new Array(parseInt(dataLength)).fill(0),

        firstData = lastDate > days
            ? CovidData[lastDate - days][field]
            : CovidData[0],
        lastData = CovidData[lastDate - 1][field],

        average = (lastData - firstData) / days;

    for (let i = 0; i < days; i++) {
        previsionData.push(Math.round(lastData + average));

        lastData += average
    }

    return previsionData;
}

function getPrevisionDates(days, timeRange) {
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
    return date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
}

function formatDates(data) {
    if (typeof data === 'string') {
        return formatDateToDmy(data);
    }

    if (Array.isArray(data)) {
        let formatedDates = data.map((date) => {
            return formatDateToDmy(date);
        })

        return formatedDates;
    }
}

function buildChartData (chartLabels, dataLabels, colors, chartData, timeRange, useXAxis, fill) {
    let firstDate = timeRange[0],
        lastDate = timeRange[1];

    let chartDatasets = chartData.map((element, key) => {
        return {
            label: dataLabels[key],
            borderColor: colors[key],
            backgroundColor: colors[key],
            fill: fill,
            data: useXAxis ? chartData[key] : [chartData[key]],
        };
    });

    chartLabels.slice(firstDate, lastDate)
    chartDatasets.slice(firstDate, lastDate)

    return {
        labels: chartLabels,
        datasets: chartDatasets
    }
}

function roundDecimalPlaces(number) {
    return Math.round(number * 100 + Number.EPSILON) / 100;
}

export {
    getCovidData,
    getLastCovidData,
    formatDates,
    getPrevisionData,
    getPrevisionDates,
    buildChartData,
    roundDecimalPlaces,
}
