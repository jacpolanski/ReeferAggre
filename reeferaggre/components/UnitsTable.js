import React, {useEffect, useState} from "react";
import {Table, Spinner} from "react-bootstrap";
import constructTableData from "./constructTableData";





const UnitsTable = ({datesToShootString}) => {
    const [threshold, setThreshold] = useState({supply: '', return: ''});
    const [tableData, setTableData] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {

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
    },[])

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
            <div className="p-3 mb-2 bg-info text-white col-3 text-center">Loading data...</div>
        </div>)

    //If no Data
    if (tableData.length === 0) return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="grow" variant="warning" className="mb-5"/>
            <div className="p-3 mb-2 bg-warning text-dark col-3 text-center">There are no requested Readings...</div>
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
                {tableData.dates.map((date, i) => <th colSpan={4} key={(i + 1) * Math.floor(Math.random() * 10000 + 1)}>{ (date.length !== 0) ? (`${date.substring(4, 6)} / ${date.substring(2,4)} / 20${date.substring(0,2)}`) : ("")}</th>)}
            </tr>
            <tr className="sticky-header">
                <th className="sticky-header">Location</th>
                <th className="sticky-header">ContainerID</th>
                <th className="sticky-header">Malf</th>
                <th className="sticky-header">LoadPort</th>
                <th className="sticky-header">Disch.Port</th>
                <th className="sticky-header">Monitored</th>
                <th className="sticky-header">SP</th>
                {tableData.dates.map((i) =>
                    <>
                        <th key={(i + 1) * Math.floor(Math.random() * 10000 + 1)} className="sticky-header">Supply AM</th>
                        <th key={(i + 1) * Math.floor(Math.random() * 10000 + 1)} className="sticky-header">Return AM</th>
                        <th key={(i + 1) * Math.floor(Math.random() * 10000 + 1)} className="sticky-header">Supply PM</th>
                        <th key={(i + 1) * Math.floor(Math.random() * 10000 + 1)} className="sticky-header">Return PM</th>
                    </>
                )}
            </tr>
            </thead>
            <tbody>
            {tableData.containers.map((container, i) =>
                <tr key={container.ContainerID}>
                    <td key={(i + 1) * Math.floor(Math.random() * 10000 + 1)}>{container.Locations}</td>
                    <td key={(i + 1) * Math.floor(Math.random() * 10000 + 1)}>{container.ContainerID}</td>
                    <td key={(i + 1) * Math.floor(Math.random() * 10000 + 1)}>{container.Alms}</td>
                    <td key={(i + 1) * Math.floor(Math.random() * 10000 + 1)}>{container.LoadPort}</td>
                    <td key={(i + 1) * Math.floor(Math.random() * 10000 + 1)}>{container.DischPort}</td>
                    <td key={(i + 1) * Math.floor(Math.random() * 10000 + 1)}>{container.Monitored}</td>
                    <td key={(i + 1) * Math.floor(Math.random() * 10000 + 1)}>{(typeof container.TempSP === "number") && container.TempSP.toFixed(2)}</td>
                    {[...Array(4 * tableData.dates.length)].map((x, i) => {
                        if ((i + 1) % 2 !== 0) {
                            return <td key={(i + 1) * Math.floor(Math.random() * 10000 + 1)} className={
                                (container.Supply[(i / 2)] !== "" && threshold.supply !== 0 && (typeof container.TempSP === "number")) &&
                                (container.Supply[(i / 2)] > threshold.supply + container.TempSP)
                                    ? "bg-warning"
                                    : ""
                            }>{(typeof container.Supply[(i / 2)] === "number") && container.Supply[(i / 2)].toFixed(2)}</td>
                        } else {
                            return <td key={(i + 1) * Math.floor(Math.random() * 10000 + 1)} className={
                                (container.Return[(i / 2 - 0.5)] !== ""  && threshold.return !== 0 && (typeof container.TempSP === "number")) &&
                                (container.Return[(i / 2 - 0.5)] > threshold.return + container.TempSP)
                                    ? "bg-warning"
                                    : ""
                            }>{(typeof container.Return[(i / 2 - 0.5)] === "number") &&  container.Return[(i / 2 - 0.5)].toFixed(2)}</td>
                        }
                    })}
                </tr>)}
            </tbody>
        </Table>
    )
}

export default UnitsTable