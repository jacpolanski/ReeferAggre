import React, {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import UnitsTable from "../components/UnitsTable";
import {DateTime} from "luxon";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBackward, faForward} from "@fortawesome/free-solid-svg-icons"

export default function containersO_B() {
    const [date, setDate] = useState(DateTime.now())
    const [year, setYear] = useState(date.year)
    const [week, setWeek] = useState(date.weekNumber)
    const [datesToShootString, setDatesToShootString] = useState("")

    useEffect(() => {

        // Check beginning and end of current week
        const dateFromStr = date.startOf('week')

        //Set week range
        const datesToShoot = []
        for (let i = 0; i < 7; i++) {
            const datePlusI = dateFromStr.plus({days: i}).toFormat("yyLLdd")
            datesToShoot.push(datePlusI)
        }

        //Parse week range to string
        setDatesToShootString(datesToShoot.join("/"))
    }, [])

    useEffect(() => {

        setYear(date.year)
        setWeek(date.weekNumber)
        const datesFromStr = date.startOf("week")
        const datesToShoot = []
        for (let i = 0; i < 7; i++) {
            const datePlusI = datesFromStr.plus({days: i}).toFormat("yyLLdd")
            datesToShoot.push(datePlusI)
        }

        setDatesToShootString(datesToShoot.join("/"))

    }, [date])


    const handleClickBack = () => {
        setDate(prevDate => prevDate.minus({days: 7}))
    }

    const handleClickFwd = () => {
        setDate(prevDate => prevDate.plus({days: 7}))
    }

    if (datesToShootString.length === 0) return null
    return (
        <>
            <div className="card p-5 text-center table-containers">
                <Card.Title>M/V Katherine</Card.Title>
                <Card.Subtitle className="mb-2 text-muted mb-5">Reefer units on-board</Card.Subtitle>
                <Card.Subtitle className="mb-2 mb-2">Week {week}, {year}</Card.Subtitle>
                <Card.Subtitle className="mb-2 mb-2">
                    <Button variant="outline-secondary"
                            className="col-2"
                            onClick={(e) => handleClickBack(e)}>
                        <FontAwesomeIcon icon={faBackward}/> Previous week
                    </Button>
                    <Button variant="outline-secondary"
                            className="col-2"
                            onClick={(e) => handleClickFwd(e)}>
                        Next week <FontAwesomeIcon icon={faForward}/>
                    </Button>
                </Card.Subtitle>
                <div className="table-wrapper">
                    <UnitsTable datesToShootString={datesToShootString}/>
                </div>
            </div>
        </>
    )
}
