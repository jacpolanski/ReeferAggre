import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";


export default function SettingsGeneral() {
    const [form, setForm] = useState({vesselName: '', reeferCapacity: '', totalCapacity: ''});

    useEffect(() => {

        //Shoot for data
        fetch(`/api/settings/settingsGeneral`)
            .then((resp) => {
                if (resp.ok === true) return resp.json();
                else console.log('Wystąpił błąd');
            })
            .then((queryData) => {
                setForm({
                    vesselName: queryData.vesselName,
                    reeferCapacity: queryData.reeferCapacity,
                    totalCapacity: queryData.totalCapacity
                })
            })
    },[])

    const handleChange = (e) => {
        const {value, name} = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch('/api/settings/settingsGeneral', {
            method: 'PUT',
            body: JSON.stringify({form}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    return (
        <Container>
            <Card className="p-5">
                <Card.Body className="text-center">
                    <Card.Title>General Settings</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted mb-5">Set up General Settings</Card.Subtitle>
                    <div className="card-text text-start">
                        <Form onClick={e => handleSubmit(e)}>
                            <Row className="mx-auto">
                                <Col lg={6} md={6} sm={12}>
                                    <Form.Group className="mb-5" controlId="vesselName">
                                        <Form.Label>Vessel Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Vessel Name"
                                            step=".01"
                                            name="vesselName"
                                            value={form.vesselName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                    <Form.Group className="mb-5" controlId="vesselCapacity">
                                        <Form.Label>Vessel RF capacity [TEU]</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Vessel RF capacity"
                                            className="mb-5"
                                            name="reeferCapacity"
                                            value={form.reeferCapacity}
                                            onChange={handleChange}
                                        />
                                        <Form.Label>Vessel Total capacity [TEU]</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Vessel Total capacity"
                                            value={form.totalCapacity}
                                            name="totalCapacity"
                                            onChange={handleChange}
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