// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs"

// /api/reeferSever
// {
//     dates: ['','']
// }

export default async function (req, res) {
    // const filters = JSON.parse(req.body);
    try {

        const file_data = await fs.promises.readFile('./db.json')
        const json_data = JSON.parse(file_data)
        // const dataToReturn = json.data.filter();
        res.status(200).json(json_data.data)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error reading data' })
    }
}