import React, { useEffect, useState } from "react";
import { Table, Spinner, Modal, Form, Button, Col, Row } from "react-bootstrap";
import constructTableData from "./constructTableData";
import uniqid from "uniqid";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import LogoMain from "./LogoMain";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const UnitsTable = ({ datesToShootString }) => {
  const [threshold, setThreshold] = useState({ supply: "", return: "" });
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalContID, setModalContID] = useState("");
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    //Shoot for data
    fetch(`/api/settings/settingsThreshold`)
      .then((resp) => {
        if (resp.ok === true) return resp.json();
        else console.log("Wystąpił błąd");
      })
      .then((queryData) => {
        setThreshold({
          supply: queryData.supplyThreshold,
          return: queryData.returnThreshold,
        });
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    //Shoot for data
    fetch(`/api/reeferServer/${datesToShootString}`)
      .then((resp) => {
        if (resp.ok === true) return resp.json();
        else console.log("Wystąpił błąd");
      })
      .then((queryData) => {
        if (queryData[0].length === 0) {
          setTableData([]);
          setLoading(false);
        } else {
          setTableData(constructTableData(queryData));
          setLoading(false);
        }
      });
  }, [datesToShootString]);

  useEffect(() => {
    if (show === true) {
      setOptions({
        responsive: true,
        interaction: {
          intersect: false,
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
            text: modalContID,
          },
          annotation: {
            annotations: {
              drawTime: "beforeDatasetsDraw",
              setPoint: {
                type: "line",
                yMin: tableData.containers.filter(
                  (container) => container.ContainerID === modalContID
                )[0].TempSP,
                yMax: tableData.containers.filter(
                  (container) => container.ContainerID === modalContID
                )[0].TempSP,
                borderColor: "rgba(1, 120, 253, .2)",
                borderWidth: 10,
                label: {
                  enabled: true,
                  backgroundColor: "rgba(1, 120, 253, 0.8)",
                  drawTime: "afterDatasetsDraw",
                  content: "Set Point",
                  position: "start",
                },
              },
              supply: {
                type: "line",
                borderColor: "rgba(53, 162, 235, 0.2)",
                yMin:
                  tableData.containers.filter(
                    (container) => container.ContainerID === modalContID
                  )[0].TempSP + threshold.supply,
                yMax:
                  tableData.containers.filter(
                    (container) => container.ContainerID === modalContID
                  )[0].TempSP + threshold.supply,
                borderDash: [6, 6],
                borderDashOffset: 0,
                borderWidth: 3,
                label: {
                  enabled: threshold.supply !== 0,
                  content: "Supply threshold",
                  position: "start",
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
              },
              return: {
                type: "line",
                borderColor: "rgba(255, 99, 132, 0.2)",
                yMin:
                  tableData.containers.filter(
                    (container) => container.ContainerID === modalContID
                  )[0].TempSP + threshold.return,
                yMax:
                  tableData.containers.filter(
                    (container) => container.ContainerID === modalContID
                  )[0].TempSP + threshold.return,
                borderDash: [6, 6],
                borderDashOffset: 0,
                borderWidth: 3,
                label: {
                  enabled: threshold.return !== 0,
                  content: "Return threshold",
                  position: "end",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              },
            },
          },
        },
      });

      setData({
        labels: tableData.dates.reduce(
          (arr, date) =>
            date !== "" ? [...arr, `${date} AM`, `${date} PM`] : [...arr],
          []
        ),
        datasets: [
          {
            label: "Supply",
            data: tableData.containers
              .filter((container) => container.ContainerID === modalContID)[0]
              .Supply.map((temp) => (temp !== "" ? temp : null)),

            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            cubicInterpolationMode: "monotone",
          },
          {
            label: "Return",
            data: tableData.containers
              .filter((container) => container.ContainerID === modalContID)[0]
              .Return.map((temp) => (temp !== "" ? temp : null)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            cubicInterpolationMode: "monotone",
          },
        ],
      });
    }
  }, [show]);

  const handleShow = (e) => {
    e.preventDefault();
    setModalContID(e.currentTarget.id);
    setShow(true);
  };

  const handleShowSelect = (e) => {
    e.preventDefault();
    setShow(true);
  };

  //If loading Data
  if (loading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Spinner animation="border" variant="info" className="mb-5" />
        <div className="p-3 mb-2 bg-info text-white col-3 text-center">
          Loading data...
        </div>
      </div>
    );

  //If no Data
  if (tableData.length === 0)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Spinner animation="grow" variant="warning" className="mb-5" />
        <div className="p-3 mb-2 bg-warning text-dark col-3 text-center">
          There are no requested Readings...
        </div>
      </div>
    );

  //If Data received properly
  return (
    <>
      <Form onSubmit={(e) => handleShowSelect(e)} className="mb-2">
        <Row className="row g-3 justify-content-center align-items-center">
          <Col className="col-auto">
            <Form.Label>Select Unit</Form.Label>
          </Col>
          <Col className="col-2">
            <Form.Select
              className="col-6"
              value={modalContID}
              onChange={(e) => setModalContID(e.target.value)}
            >
              {tableData.containers.map((container) =>
                container.ContainerID !== undefined ? (
                  <option key={uniqid()} value={container.ContainerID}>
                    {container.ContainerID}
                  </option>
                ) : null
              )}
            </Form.Select>
          </Col>
          <Col className="col-auto">
            <Button
              variant="success btn-block"
              type="submit"
              className="bg-primary"
            >
              Load Chart
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="table-wrapper">
        <Table striped bordered hover size="sm" className="table-fixed">
          <thead className="sticky-header">
            <tr className="sticky-header">
              <th className="sticky-header" colSpan={3}>
                Standard Info
              </th>
              <th className="sticky-header" colSpan={2}>
                Manifest
              </th>
              <th className="sticky-header">Communication Info</th>
              <th className="sticky-header">Temp</th>
              {tableData.dates.map((date) => (
                <th colSpan={4} key={uniqid()}>
                  {date.length !== 0
                    ? `${date.substring(4, 6)} / ${date.substring(
                        2,
                        4
                      )} / 20${date.substring(0, 2)}`
                    : ""}
                </th>
              ))}
            </tr>
            <tr className="sticky-header">
              <th className="sticky-header">Location</th>
              <th className="sticky-header">ContainerID</th>
              <th className="sticky-header">Malf</th>
              <th className="sticky-header">LoadPort</th>
              <th className="sticky-header">Disch.Port</th>
              <th className="sticky-header">Monitored</th>
              <th className="sticky-header">SP</th>
              {tableData.dates.map(() => (
                <>
                  <th key={uniqid()} className="sticky-header">
                    Supply AM
                  </th>
                  <th key={uniqid()} className="sticky-header">
                    Return AM
                  </th>
                  <th key={uniqid()} className="sticky-header">
                    Supply PM
                  </th>
                  <th key={uniqid()} className="sticky-header">
                    Return PM
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.containers.map((container) => (
              <tr
                key={uniqid()}
                id={container.ContainerID}
                onClick={(e) => handleShow(e)}
              >
                <td key={uniqid()}>{container.Locations}</td>
                <td key={uniqid()}>{container.ContainerID}</td>
                <td key={uniqid()}>{container.Alms}</td>
                <td key={uniqid()}>{container.LoadPort}</td>
                <td key={uniqid()}>{container.DischPort}</td>
                <td key={uniqid()}>{container.Monitored}</td>
                <td key={uniqid()}>
                  {typeof container.TempSP === "number" &&
                    container.TempSP.toFixed(2)}
                </td>
                {[...Array(4 * tableData.dates.length)].map((x, i) => {
                  if ((i + 1) % 2 !== 0) {
                    return (
                      <td
                        key={uniqid()}
                        className={
                          container.Supply[i / 2] !== "" &&
                          threshold.supply !== 0 &&
                          typeof container.TempSP === "number" &&
                          container.Supply[i / 2] >
                            threshold.supply + container.TempSP
                            ? "bg-warning"
                            : ""
                        }
                      >
                        {typeof container.Supply[i / 2] === "number" &&
                          container.Supply[i / 2].toFixed(2)}
                      </td>
                    );
                  } else {
                    return (
                      <td
                        key={uniqid()}
                        className={
                          container.Return[i / 2 - 0.5] !== "" &&
                          threshold.return !== 0 &&
                          typeof container.TempSP === "number" &&
                          container.Return[i / 2 - 0.5] >
                            threshold.return + container.TempSP
                            ? "bg-warning"
                            : ""
                        }
                      >
                        {typeof container.Return[i / 2 - 0.5] === "number" &&
                          container.Return[i / 2 - 0.5].toFixed(2)}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <LogoMain />
          <Modal.Title className="justify-self-center">
            Weekly temperature chart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1">
          <Table
            striped
            bordered
            hover
            size="sm"
            className="table-fixed text-center mx-auto w-50"
          >
            <thead className="sticky-header">
              <tr className="sticky-header">
                <th className="sticky-header" colSpan={2}>
                  Standard Info
                </th>
                <th className="sticky-header" colSpan={2}>
                  Manifest
                </th>
                <th className="sticky-header" rowSpan={2}>
                  Temp SP
                </th>
              </tr>
              <tr className="sticky-header">
                <th className="sticky-header">Location</th>
                <th className="sticky-header">ContainerID</th>
                <th className="sticky-header">LoadPort</th>
                <th className="sticky-header">Disch.Port</th>
              </tr>
            </thead>
            <tbody>
              {tableData.containers
                .filter((container) => container.ContainerID === modalContID)
                .map((container) => (
                  <tr key={uniqid()}>
                    <td key={uniqid()}>{container.Locations}</td>
                    <td key={uniqid()}>{modalContID}</td>
                    <td key={uniqid()}>{container.LoadPort}</td>
                    <td key={uniqid()}>{container.DischPort}</td>
                    <td key={uniqid()}>{container.TempSP}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="w-75 mx-auto">
            {data === undefined ? (
              <p> Loading ...</p>
            ) : (
              <Line options={options} data={data} />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UnitsTable;
