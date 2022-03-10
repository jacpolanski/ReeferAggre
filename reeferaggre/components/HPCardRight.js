import React, {useEffect, useState} from "react";
import {Card, Spinner} from "react-bootstrap";
import constructTableData from "./constructTableData"



export const HPCardRight = ({date}) => {
    const [tableData, setTableData] = useState()
    const [loading, setLoading] = useState(true);
    const [threshold, setThreshold] = useState({supply: '', return: ''});
    const [alarmsSupply, setAlarmsSupply] = useState(0)
    const [alarmsReturn, setAlarmsReturn] = useState(0)
    const [alarmsNoReadings, setAlarmNoReadings] = useState(0)
    const dateToShootString = date.toFormat("yyLLdd")

    useEffect(() => {
        setLoading(true)

        //Shoot for data
        fetch(`/api/settings/settingsThreshold`)
            .then((resp) => {
                if (resp.ok === true) return resp.json();
                else console.log('Wystąpił błąd');
            })
            .then((queryData) => {
                setThreshold({
                    supply: queryData.supplyThreshold,
                    return: queryData.returnThreshold,
                })
            })

        fetch(`/api/reeferServer/${dateToShootString}`)
            .then((resp) => {
                if (resp.ok === true) return resp.json();
                else console.log('Wystąpił błąd');
            })
            .then((queryData) => {
                if (queryData[0].length === 0) {
                    setTableData([])
                    setLoading(false)
                } else {
                    setTableData(constructTableData(queryData))
                    setLoading(false)

                }
            })
    }, [])

    useEffect(() => {
        console.log(tableData);
        if (tableData !== undefined) {
            const alarms = checkAlarms(tableData)
            console.log(alarms);
            setAlarmsSupply(alarms[0])
            setAlarmsReturn(alarms[1])
            setAlarmNoReadings(alarms[2])
        }
    }, [tableData])

    //Check alarms - type "supply", "return", noReadings"
    const checkAlarms = (data) => {
        let alarms = [0, 0, 0]
        data.containers.forEach(container => {
            container.Supply.forEach(reading => {
                (reading !== "") && (threshold.supply !== 0) && (typeof container.TempSP === "number") && (reading > container.TempSP + threshold.supply) && (alarms[0] += 1);
                (reading === "") && (alarms[2] += 1);
            })
            container.Return.forEach(reading => {
                (reading !== "") && (threshold.supply !== 0) && (typeof container.TempSP === "number") && (reading > container.TempSP + threshold.return) && (alarms[1] += 1);
                (reading === "") && (alarms[2] += 1);
            })
        })
        return alarms
    }


    //If loading Data
    if (loading) return (
        <Card>
            <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="fs-2 mb-5">
                    Alarms today
                </Card.Title>
                <Card.Subtitle className="mb-5 text-muted fs-3">
                    Total alarms: <Spinner animation="grow" variant="primary" size="sm"/> units
                </Card.Subtitle>
                <div className="fs-3 card-text">
                    <ul>
                        <li>Off supply: <Spinner animation="grow" variant="primary" size="sm"/> units</li>
                        <li>Off return: <Spinner animation="grow" variant="primary" size="sm"/> units</li>
                        <li>No readings: <Spinner animation="grow" variant="primary" size="sm"/> units</li>
                    </ul>
                </div>
            </Card.Body>
        </Card>
    )

    //If rcvd data
    return (
        <Card>
            <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="fs-2 mb-5">
                    Alarms today
                </Card.Title>
                <Card.Subtitle className="mb-5 text-muted fs-3">
                    Total alarms: {alarmsSupply + alarmsReturn + alarmsNoReadings} units
                </Card.Subtitle>
                <div className="fs-3 card-text">
                    <ul>
                        <li>Off supply: {alarmsSupply} units</li>
                        <li>Off return: {alarmsReturn} units</li>
                        <li>No readings: {alarmsNoReadings} units</li>
                    </ul>
                </div>
            </Card.Body>
        </Card>
    )
}