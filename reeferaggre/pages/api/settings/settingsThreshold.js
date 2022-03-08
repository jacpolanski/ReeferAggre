import {threSetData} from "../../../data/threSetData";

export default function handler(request, response) {
    const { method } = request;

    if (method === "GET") {
        return response.status(200).json(threSetData);
    }
    if (request.method === "PUT") {
        const form = request.body.form

        threSetData.supplyThreshold = form.supplyThreshold
        threSetData.returnThreshold = form.returnThreshold
        return response.status(201).json(threSetData)
    }
}