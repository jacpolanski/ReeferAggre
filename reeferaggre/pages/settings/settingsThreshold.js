import React from "react";
import {Card, Container, Form, Button} from "react-bootstrap";

export default function SettingsThreshold() {
    return (
        <>
            <Container>
                <Card className="p-5">
                    <Card.Body className="text-center">
                        <Card.Title>Threshold Settings</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted mb-5">Set up Supply and Return
                            Thresholds</Card.Subtitle>
                        <div className="card-text">
                            <Form>
                                <Form.Group className="mb-5" controlId="supplyThreshold">
                                    <Form.Label>Setup Supply threshold</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Off"
                                        />
                                        <Form.Control
                                            type="number"
                                            placeholder="Supply threshold"
                                            step=".01"
                                            style={{width: "10rem"}}
                                            className="mx-5"
                                        />
                                    </div>
                                    <Form.Range/>
                                </Form.Group>

                                <Form.Group className="mb-5" controlId="returnThreshold">
                                    <Form.Label>Setup Return threshold</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Off"
                                        />
                                        <Form.Control
                                            type="number"
                                            placeholder="Returns threshold"
                                            step=".01"
                                            style={{width: "10rem"}}
                                            className="mx-5"
                                        />
                                    </div>
                                    <Form.Range/>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
