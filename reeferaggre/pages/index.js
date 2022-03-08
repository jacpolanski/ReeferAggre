import React, {useEffect, useState} from "react";
import {CardGroup, Container, Row, Spinner} from "react-bootstrap";
import {DateTime} from "luxon";

import {HPCardLeft} from "../components/HPCardLeft";
import {HPCardBtm} from "../components/HPCardBtm";
import {HPCardRight} from "../components/HPCardRight";
import {HPCardCntr} from "../components/HPCardCntr";


export default function Home() {
    const [date, setDate] = useState(DateTime.now())
    const [loading, setLoading] = useState(true)
    const [generalSettings, setGeneralSettings] = useState({})

    useEffect(() => {
        setLoading(true)

        const updateDate = setInterval(() => {
            setDate(DateTime.now())
        }, 1_000)

        fetch("/api/settings/settingsGeneral")
            .then((resp) => {
                if (resp.ok === true) return resp.json();
                else console.log('Wystąpił błąd');
            })
            .then(settings => {
                setGeneralSettings(settings)
                setLoading(false)
            })
        console.log(generalSettings)

        return () => {
            clearInterval(updateDate)
        }
    }, [])

    //If loading Data
    if (loading) return (
        <div className="card w-75">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <Spinner animation="border" variant="info" className="mb-5"/>
                <div className="p-3 mb-2 bg-info text-white col-3 text-center">Loading data...</div>
            </div>
        </div>)

    //If Data received properly
    return (
        <Container>
            <Row>
                <CardGroup className="flex-grow-0">
                    <HPCardLeft date={date} generalSettings={generalSettings}/>
                    <HPCardCntr/>
                    <HPCardRight/>
                </CardGroup>
                <HPCardBtm/>
            </Row>
        </Container>
    )
}
