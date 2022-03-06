import React from "react";
import {Card, Container} from "react-bootstrap";
import UnitsTable from "../components/UnitsTable";

export default function containersO_B() {
    return (
        <>
            <Container>
                <Card className="p-5">
                    <Card.Body className="text-center">
                        <Card.Title>M/V Katherine</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted mb-5">Reefer units on-board</Card.Subtitle>
                        <div className="card-text">
                            <UnitsTable />
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
