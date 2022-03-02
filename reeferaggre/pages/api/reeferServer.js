// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {join, dirname, resolve} from "path";
import {JSONFile, Low} from "lowdb"





export default async function handler(req, res) {
    //database init
    const file = join(resolve(), '../../db.json')
    const adapter = new JSONFile(file)
    const db = new Low(adapter)
    await db.read()
    const dataFromDB = db.data;
    res.status(200).json({dataFromDB})
}
