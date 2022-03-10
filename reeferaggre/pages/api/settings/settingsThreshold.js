import {threSetData} from "../../../data/threSetData.js";
import fs from "fs"

export default function handler(request, response) {
    const { method } = request;

    if (method === "GET") {
        return response.status(200).json(threSetData);
    }
    if (request.method === "PUT") {
        const form = request.body

        threSetData.isSupply = request.isSupply
        threSetData.supplyThreshold = form.supplyThreshold
        threSetData.isReturn = request.isReturn
        threSetData.returnThreshold = form.returnThreshold

        const dataToSave = `export let threSetData = {isSupply: ${form.isSupply}, supplyThreshold: ${form.supplyThreshold}, isReturn: ${form.isReturn}, returnThreshold: ${form.returnThreshold},}`
        fs.writeFile('./data/threSetData.js', dataToSave, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        })
        return response.status(201).json(threSetData)
    }
}