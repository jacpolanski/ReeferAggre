import fs from "fs";
import {join, dirname, resolve} from "path";

import * as schedule from "node-schedule"
import papaparse from "papaparse"
import {JSONFile, Low} from "lowdb"

const dir = "./runner/csv/"

//database init
const file = join(resolve(), 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read();
db.data ||= {
    data: [],
    files: [],
}


//reading file
const getData = (dir, fileName) => {
    const content = fs.readFileSync(`${dir}${fileName}`, {encoding: 'utf8', flag: 'r'});
    const parsedData = papaparse.parse(content, {header: true,}).data;

    parsedData.forEach(object => {
        Object.keys(object)
            .forEach(key => {
                (key === "") ? delete object[key] : null
            })
    })

    const data = {
        Date: fileName.substr("DailyMonitoring-".length, 6),
        Time: (fileName.substr("DailyMonitoring-".length + 6, 1).slice(0, 1) === "1") ? "AM" : "PM",
        Readings: parsedData,
    }
    return data || {};
}

// get filenames list
const getFilenames = (dir) => {
    return fs.readdirSync(dir)
}


const fillDbWithData = (data, file) => {

    db.data.data.push(data)
    db.data.files.push(file)

    db.write();


}

const constructDataBase = dir => {
    const files = getFilenames(dir)

    files.forEach(file => {
        const data = getData(dir, file)
        fillDbWithData(data, file);
    })
}

if (db.data.files.length === 0) {
    constructDataBase(dir)
}

// run once each 5 minutes
const job = schedule.scheduleJob('*/5 * * * *', function (fireDate) {
        const filesDB = db.data.files
        const filesDIR = getFilenames(dir)
        let differenceFiles = filesDIR.filter(file => !filesDB.includes(file))
        console.log(differenceFiles)

        if (differenceFiles.length !== 0) {
            differenceFiles.forEach(file => {
                const data = getData(dir, file)
                fillDbWithData(data, file);
            })
        }
    }
)


// just to check what We have there
// const dataFromDB = db.data.myCollection;
// console.log(dataFromDB);

