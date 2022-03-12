// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";

export default async function (req, res) {
  try {
    const fileData = await fs.promises.readFile("./data/db.json");
    const jsonData = JSON.parse(fileData);

    const { dates } = req.query;
    const joinedDates = [...dates];
    // console.log(joinedDates);

    const dateReadings = joinedDates.map((date) =>
      jsonData.data.filter((data) => data.Date === date)
    );
    console.log(dateReadings);

    res.status(200).json(dateReadings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error reading data" });
  }
}
