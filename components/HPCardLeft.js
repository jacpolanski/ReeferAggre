import React from "react";
import { Card } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import { ClockDate } from "./ClockDate";
import { ClockWeek } from "./ClockWeek";
import { ClockTime } from "./ClockTime";

export const HPCardLeft = ({ date, generalSettings }) => {
  const hpChartData = {
    labels: ["Total RF capacity", "Remaining capacity"],
    datasets: [
      {
        label: "# of Containers",
        data: [
          generalSettings.reeferCapacity,
          generalSettings.totalCapacity - generalSettings.reeferCapacity,
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.0)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>
          <ClockDate date={date} />
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <ClockWeek date={date} />
        </Card.Subtitle>
        <Card.Text>
          <ClockTime date={date} />
        </Card.Text>
        <div className="doughnut">
          <Doughnut data={hpChartData} type="doughnut" />
        </div>
      </Card.Body>
    </Card>
  );
};
