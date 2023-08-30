//  NO TOCAR
//Functiones generales, no contienen logica de negocio

const { Variables } = require("./variables");
const schedules = Variables.SCHEDULES;

function separateArray(array) {
    let newArray = [];
    for (let index = 0; index < array.length; index = index + 2) {
        newArray.push({
            hour: array[index],
            counter: array[index + 1]
        });
    }
    return newArray;
}

function findSchedule(idBranchOffice) {
    return schedules.find(schedule => schedule.branchOffices.includes(idBranchOffice)).schedules;
}

function getScheduledTrafic(array, weekDay) {
    const hourStartParsed = parseInt(weekDay.start.substring(0, 2));
    const hourEndParsed = parseInt(weekDay.end.substring(0, 2));
    const convertedArray = separateArray(array);

    return convertedArray.filter(trafic => {
        const hour = parseInt(trafic.hour.substring(0, 2));
        return hour >= hourStartParsed && hour < hourEndParsed;
    });
}

module.exports = {
    separateArray,
    findSchedule,
    getScheduledTrafic
}