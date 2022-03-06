import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export default function SettingsGeneral() {
    return (
        <Container>
            <Card className="p-5">
                <Card.Body className="text-center">
                    <Card.Title>General Settings</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted mb-5">Set up General Settings</Card.Subtitle>
                    <div className="card-text text-start">
                        <Form>
                            <Row className="mx-auto">
                                <Col lg={6} md={6} sm={12}>
                                    <Form.Group className="mb-5" controlId="vesselName">
                                        <Form.Label>Vessel Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Vessel Name"
                                            step=".01"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                    <Form.Group className="mb-5" controlId="vesselCapacity">
                                        <Form.Label>Vessel RF capacity [TEU]</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Vessel RF capacity"
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}