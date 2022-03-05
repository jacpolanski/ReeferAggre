import React from "react";
import {Button, Card, CardGroup} from "react-bootstrap";

export const HPCardBtm = () => {
    return (
        <CardGroup>
            <Card className="my-1 px-5 py-3">
                <Card.Body>
                    <Card.Title className="mb-5 text-center"><h2 className="welcome-reeferaggre">Welcome in
                        ReeferAgree,</h2></Card.Title>
                    <Card.Text>
                        light-weight and quick daily Reefer readings aggregator with auto malfunction detection,
                        that also allows you to manually enter readings and custom Unit alarms. Additionally app
                        features export to excel capabilities.
                    </Card.Text>
                    <hr className="my-4"/>
                    <Card.Text>
                        For easy access by clicking below button you will find added company Reefer Units manual and
                        procedures
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </CardGroup>
    )
};