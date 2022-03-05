import { usersData } from "../../../data/usersData";

export default function handler(request, response) {
    const { method } = request;

    if (method === "GET") {
        return response.status(200).json(usersData);
    }
    //
    // if (method === "POST") {
    //
    // }
}