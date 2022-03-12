import { genSetData } from "../../../data/genSetData.js";
import fs from "fs";

export default function handler(request, response) {
  if (request.method === "GET") {
    return response.status(200).json(genSetData);
  }
  if (request.method === "PUT") {
    const form = request.body.form;

    genSetData.vesselName = form.vesselName;
    genSetData.reeferCapacity = form.reeferCapacity;
    genSetData.totalCapacity = form.totalCapacity;

    const dataToSave = `export let genSetData = {vesselName: "${form.vesselName}", reeferCapacity: ${form.reeferCapacity}, totalCapacity: ${form.totalCapacity},}`;
    fs.writeFile("./data/genSetData.js", dataToSave, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    return response.status(201).json(genSetData);
  }
}
