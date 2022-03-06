import React, {useEffect, useState} from "react";
import {CardGroup, Container, Row} from "react-bootstrap";
import {DateTime} from "luxon";

import {HPCardLeft} from "../components/HPCardLeft";
import {HPCardBtm} from "../components/HPCardBtm";
import {HPCardRight} from "../components/HPCardRight";
import {HPCardCntr} from "../components/HPCardCntr";


export default function Home() {
    const [date, setDate] = useState(DateTime.now())

    useEffect(() => {
        const updateDate = setInterval(() => {
            setDate(DateTime.now())
        }, 1_000)

        return () => {
            clearInterval(updateDate)
        }
    }, [])

    return (
        <Container>
            <Row>
            <CardGroup className="flex-grow-0">
                <HPCardLeft date={date}/>
                <HPCardCntr/>
                <HPCardRight/>
            </CardGroup>
            <HPCardBtm/>
            </Row>
        </Container>
    )
}
