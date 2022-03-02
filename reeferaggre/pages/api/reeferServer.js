// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs"



export default async function (req, res) {
    try {
        const file_data = await fs.promises.readFile('./db.json')
        const json_data = JSON.parse(file_data)

        res.status(200).json(json_data.data)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error reading data' })
    }
}