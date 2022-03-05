import React from "react";
import {Card} from "react-bootstrap";
import {Doughnut} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import {ClockDate} from "./ClockDate";
import {ClockWeek} from "./ClockWeek";
import {ClockTime} from "./ClockTime";
import {hpChartData} from "../data/hpChartData";

export const HPCardLeft = ({date}) => {
    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>
                    <ClockDate date={date}/>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <ClockWeek date={date}/>
                </Card.Subtitle>
                <Card.Text>
                    <ClockTime date={date}/>
                </Card.Text>
                <div className="doughnut">
                    <Doughnut data={hpChartData} type="doughnut"/>
                </div>
            </Card.Body>
        </Card>
    )
}