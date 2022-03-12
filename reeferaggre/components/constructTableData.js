import { isArray } from "chart.js/helpers";

const constructTableData = (queryData) => {
  const dates = queryData.map((data) =>
    data.length !== 0 ? data[0].Date : ""
  );

  const containersIDReadings = queryData.map((dataset) =>
    dataset.map((set) => set.Readings.map((reading) => reading.ContainerID))
  );

  const flatten = (array) => {
    return array.reduce((flatten, arr) => [...flatten, ...arr]);
  };

  const containersIDs = [...new Set(flatten(flatten(containersIDReadings)))];

  const findContainer = (serialNo) => {
    return queryData.map((dataset) =>
      dataset.map((set) =>
        set.Readings.find((reading) => reading.ContainerID === serialNo)
      )
    );
  };

  const findContProperty = (serialNo, property) => {
    const containerReadingsArr = findContainer(serialNo);
    const contReadArrFlat = flatten(containerReadingsArr).map((elem) =>
      elem === undefined ? "" : elem
    );

    return [...new Set(contReadArrFlat.map((obj) => obj[property]))];
  };

  const findAllTemps = (serialNo, typeOfTemp) => {
    const containerReadingsArr = findContainer(serialNo);
    const contReadArrFlat = flatten(containerReadingsArr).map((elem) =>
      elem === undefined ? "" : elem
    );
    return contReadArrFlat.map((obj) => obj[typeOfTemp]);
  };

  const containers = containersIDs.reduce((arr, id) => {
    // if (findContProperty(id, "Monitored")[0] === "Unchecked" || findContProperty(id, "Location")[0] === "") {
    //     return [...arr]
    // } else {
    return [
      ...arr,
      {
        Locations: isArray(findContProperty(id, "Location"))
          ? findContProperty(id, "Location")[0]
          : findContProperty(id, "Location"),
        ContainerID: id,
        Alms: findContProperty(id, "Alms"),
        LoadPort: findContProperty(id, "LoadPort")[0],
        DischPort:
          findContProperty(id, "Disch.Port")[0] !== undefined
            ? findContProperty(id, "Disch.Port")[0].substring(0, 5)
            : "",
        Monitored: findContProperty(id, "Monitored")[0],
        TempSP:
          !isNaN(parseFloat(findContProperty(id, "Temp SP")[0])) &&
          parseFloat(parseFloat(findContProperty(id, "Temp SP")[0]).toFixed(2)),
        Supply: findAllTemps(id, "Supply").map((temp) =>
          !isNaN(parseFloat(temp))
            ? parseFloat(parseFloat(temp).toFixed(2))
            : ""
        ),
        Return: findAllTemps(id, "Return").map((temp) =>
          !isNaN(parseFloat(temp))
            ? parseFloat(parseFloat(temp).toFixed(2))
            : ""
        ),
      },
    ];
    // }
  }, []);

  return { dates, containers };
};

export default constructTableData;
