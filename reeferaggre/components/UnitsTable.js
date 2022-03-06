import React from "react";
import {Table} from "react-bootstrap";
import {queryData} from "../data/queryData";
import constructTableData from "./constructTableData";


const UnitsTable = () => {

    const tableData = constructTableData(queryData);

    return (
        <Table striped bordered hover size="sm" responsive="lg">
            <thead>
            <tr>
                <th colSpan={3}>Standard Info</th>
                <th colSpan={2}>Manifest</th>
                <th>Communication Info</th>
                <th>Temp</th>
                {tableData.dates.map(date => <th colSpan={4}>{date}</th>)}
            </tr>
            <tr>
                <th>Location</th>
                <th>ContainerID</th>
                <th>Malf</th>
                <th>LoadPort</th>
                <th>Disch.Port</th>
                <th>Monitored</th>
                <th>SP</th>
                {tableData.dates.map(() =>
                    <>
                        <th>Supply AM</th>
                        <th>Return AM</th>
                        <th>Supply PM</th>
                        <th>Return PM</th>
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