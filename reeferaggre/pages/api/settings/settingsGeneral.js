import {genSetData} from "../../../data/genSetData.js";


export default function handler(request, response) {

    if (request.method === "GET") {
        return response.status(200).json(genSetData);
    }
    if (request.method === "PUT") {
        const form = request.body.form

        genSetData.vesselName = form.vesselName
        genSetData.reeferCapacity = form.reeferCapacity
        genSetData.totalCapacity = form.totalCapacity
        return response.status(201).json(genSetData)
    }
}