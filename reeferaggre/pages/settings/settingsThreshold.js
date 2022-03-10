import React, {useEffect, useState} from "react";
import {Card, Container, Form, Button} from "react-bootstrap";

export default function SettingsThreshold() {
    const [form, setForm] = useState({supplyThreshold: '', returnThreshold: ''});
    const [toggleSupply, setToggleSupply] = useState()
    const [toggleReturn, setToggleReturn] = useState()


    useEffect(() => {

        //Shoot for data
        fetch(`/api/settings/settingsThreshold`)
            .then((resp) => {
                if (resp.ok === true) return resp.json();
                else console.log('Wystąpił błąd');
            })
            .then((queryData) => {
                console.log(queryData);
                setForm({
                    supplyThreshold: queryData.supplyThreshold,
                    returnThreshold: queryData.returnThreshold,
                })
                setToggleSupply(queryData.isSupply)
                setToggleReturn(queryData.isReturn)
            })
        console.log(toggleSupply, toggleReturn);
    }, [])

    const handleSupplyToggle = () => {
        setToggleSupply(prevState => !prevState)
        setForm(prevState => ({
            ...prevState,
            supplyThreshold: 0,
        }))
    }

    const handleReturnToggle = () => {
        setToggleReturn(prevState => !prevState)
        setForm(prevState => ({
            ...prevState,
            returnThreshold: 0,
        }))
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
        console.log(form);
        await fetch('/api/settings/settingsThreshold', {
            method: 'PUT',
            body: JSON.stringify({
                ...form,
                isReturn: toggleReturn,
                isSupply: toggleSupply,
            }),
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
                                            defaultChecked={toggleSupply}
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
                                            disabled={!toggleSupply}
                                        />
                                    </div>
                                    <Form.Range
                                        name="supplyThreshold"
                                        value={form.supplyThreshold}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        max="3"
                                        disabled={!toggleSupply}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-5" controlId="returnThreshold">
                                    <Form.Label>Setup Return threshold</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Off"
                                            defaultChecked={toggleReturn}
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
                                            disabled={!toggleReturn}
                                        />
                                    </div>
                                    <Form.Range
                                        name="returnThreshold"
                                        value={form.returnThreshold}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        max="3"
                                        disabled={!toggleReturn}
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
