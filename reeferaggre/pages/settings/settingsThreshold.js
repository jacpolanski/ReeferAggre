import React, {useEffect, useState} from "react";
import {Card, Container, Form, Button} from "react-bootstrap";

export default function SettingsThreshold() {
    const [form, setForm] = useState({supplyThreshold: '', returnThreshold: ''});
    const [toggleSupply, setToggleSupply] = useState(false)
    const [toggleReturn, setToggleReturn] = useState(false)


    useEffect(() => {

        //Shoot for data
        fetch(`/api/settings/settingsThreshold`)
            .then((resp) => {
                if (resp.ok === true) return resp.json();
                else console.log('Wystąpił błąd');
            })
            .then((queryData) => {
                setForm({
                    supplyThreshold: queryData.supplyThreshold,
                    returnThreshold: queryData.returnThreshold,
                })
            })
    },[])

    const handleSupplyToggle = () => {
        setToggleSupply(prevState => !prevState)
    }

    const handleReturnToggle = () => {
        setToggleReturn(prevState => !prevState)
    }

    const handleChange = (e) => {
        const {value, name} = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch('/api/settings/settingsThreshold', {
            method: 'PUT',
            body: JSON.stringify({form}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    return (
        <>
            <Container>
                <Card className="p-5">
                    <Card.Body className="text-center">
                        <Card.Title>Threshold Settings</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted mb-5">Set up Supply and Return
                            Thresholds</Card.Subtitle>
                        <div className="card-text">
                            <Form onSubmit={(event => handleSubmit(event))}>
                                <Form.Group className="mb-5" controlId="supplyThreshold">
                                    <Form.Label>Setup Supply threshold</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Off"
                                            // value={toggleSupply}
                                            onClick={(e) => handleSupplyToggle(e)}
                                        />
                                        <Form.Control
                                            type="number"
                                            placeholder="Supply threshold"
                                            step=".01"
                                            style={{width: "10rem"}}
                                            className="mx-5"
                                            name="supplyThreshold"
                                            value={form.supplyThreshold}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <Form.Range
                                        name="supplyThreshold"
                                        value={form.supplyThreshold}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        max="3"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-5" controlId="returnThreshold">
                                    <Form.Label>Setup Return threshold</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Off"
                                            onClick={(e) => handleReturnToggle(e)}
                                        />
                                        <Form.Control
                                            type="number"
                                            placeholder="Returns threshold"
                                            step=".01"
                                            style={{width: "10rem"}}
                                            className="mx-5"
                                            name="returnThreshold"
                                            value={form.returnThreshold}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <Form.Range
                                        name="returnThreshold"
                                        value={form.returnThreshold}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        max="3"
                                    />
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
