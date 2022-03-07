import React, {useEffect, useState} from "react";
import {Table, Spinner} from "react-bootstrap";
import constructTableData from "./constructTableData";


const UnitsTable = ({datesToShootString}) => {
    const [tableData, setTableData] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)

        //Shoot for data
        fetch(`/api/reeferServer/${datesToShootString}`)
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


    }, [datesToShootString])

    //If loading Data
    if (loading) return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="border" variant="info" className="mb-5"/>
            <div className="p-3 mb-2 bg-info text-white col-3">Loading data...</div>
        </div>)

    //If no Data
    if (tableData.length === 0) return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="grow" variant="warning" className="mb-5"/>
            <div className="p-3 mb-2 bg-warning text-dark col-3">There are no requested Readings...</div>
        </div>
    )

    //If Data received properly
    return (
        <Table striped bordered hover size="sm" className="table-fixed">
            <thead className="sticky-header">
            <tr className="sticky-header">
                <th className="sticky-header" colSpan={3}>Standard Info</th>
                <th className="sticky-header" colSpan={2}>Manifest</th>
                <th className="sticky-header">Communication Info</th>
                <th className="sticky-header">Temp</th>
                {tableData.dates.map(date => <th colSpan={4}>{date}</th>)}
            </tr>
            <tr className="sticky-header">
                <th className="sticky-header">Location</th>
                <th className="sticky-header">ContainerID</th>
                <th className="sticky-header">Malf</th>
                <th className="sticky-header">LoadPort</th>
                <th className="sticky-header">Disch.Port</th>
                <th className="sticky-header">Monitored</th>
                <th className="sticky-header">SP</th>
                {tableData.dates.map(() =>
                    <>
                        <th className="sticky-header">Supply AM</th>
                        <th className="sticky-header">Return AM</th>
                        <th className="sticky-header">Supply PM</th>
                        <th className="sticky-header">Return PM</th>
                    </>
                )}
            </tr>
            </thead>
            <tbody>
            {tableData.containers.map(container =>
                <tr key={container.ContainerID}>
                    <td>{container.Locations}</td>
                    <td>{container.ContainerID}</td>
                    <td>{container.Alms}</td>
                    <td>{container.LoadPort}</td>
                    <td>{container.DischPort}</td>
                    <td>{container.Monitored}</td>
                    <td>{container.TempSP}</td>
                    {[...Array(4 * tableData.dates.length)].map((x, i) => {
                        if ((i + 1) % 2 !== 0) {
                            return <td key={i}>{container.Supply[(i / 2)]}</td>
                        } else {
                            return <td key={i}>{container.Return[(i / 2 - 0.5)]}</td>
                        }
                    })}
                </tr>)}
            </tbody>
        </Table>
    )
}

export default UnitsTable