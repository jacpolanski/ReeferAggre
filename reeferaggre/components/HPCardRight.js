import React from "react";
import {Card} from "react-bootstrap";

export const HPCardRight = () => {
    return (
        <Card>
            <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="fs-2 mb-5">
                    Alarms
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted fs-3">
                    Total alarms: 25 units
                </Card.Subtitle>
                <Card.Text className="fs-3">
                    <ul>
                        <li>Off supply: 10 units</li>
                        <li>Off return: 10 units</li>
                        <li>No readings: 5 units</li>
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}