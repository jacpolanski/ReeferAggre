// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//database init
import {join, resolve} from "path";
const file = join(resolve(), '../../db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
await db.read();

const dataFromDB = db.data.data

export default async function handler(req, res) {
    res.status(200).json(dataFromDB)
}
