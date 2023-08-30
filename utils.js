//  NO TOCAR
//Functiones generales, no contienen logica de negocio

const fs = require('fs');
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

    const result = convertedArray.filter(trafic => {
        const hour = parseInt(trafic.hour.substring(0, 2));
        return hour >= hourStartParsed && hour < hourEndParsed;
    });
    return result
}

// function addToExistentTrafic(oldTrafic, newTrafic) {
//     const traficResult = oldTrafic.map(trafic => {
//         return {
//             hour: trafic.hour,
//             counter: trafic.counter + newTrafic.find(newTrafic => newTrafic.hour === trafic.hour).counter
//         }
//     });
//     return traficResult;
// }

function buildSQLInsert(data) {
    let sql = `\nINSERT INTO TA_DatosContadorCamaraDiario values `;
    data.trafic.forEach(trafic => {
        sql += `\n(${data.year}, ${data.month}, ${data.day}, ${data.branchOffice}, '${trafic.hour}', ${trafic.counter}, ${data.city}),`;
    });
    return sql.substring(0, sql.length - 1) + ";";
}

function uploadToFile(fileName, content) {
    const data = buildSQLInsert(content);

    fs.access(`${fileName}.sql`, (err) => {
        if (err)
            fs.writeFile(`${fileName}.sql`, data, (err) => {
                if (err) throw err;
            });
        else
            fs.appendFile(`${fileName}.sql`, data, (err) => {
                if (err) throw err;
            });

    });
}

module.exports = {
    separateArray,
    findSchedule,
    getScheduledTrafic,
    uploadToFile
    //addToExistentTrafic
}