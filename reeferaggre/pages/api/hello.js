// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Papa = require("papaparse")
const fs = require("fs")

const parseFile = ()  => new Promise((resolve) => {
    Papa.parse(fs.createReadStream("DailyMonitoring-1911181.csv"), {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            console.log(results);
            resolve(results)

        }
    });

})

// console.log(data);

// console.log(data);
export default async function handler(req, res) {
    const data = await parseFile()
    console.log(data);
    res.status(200).json(data)
}
