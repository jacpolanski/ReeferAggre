import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSnowflake} from "@fortawesome/free-solid-svg-icons"

const LoginPage = ({users, handleSubmit, errMsg}) => {
    const [title, setTitle] = useState("Master")
    const [pass, setPass] = useState("")




    return (
        <>
            <Container className="vh-100 d-flex flex-column justify-content-center">
                <Row className="justify-content-center rounded-3">
                    <Col lg={5} md={6} sm={12}
                         className="p-5 shadow-sm rounded-lg bg-white d-flex justify-content-center align-items-center login-logo">
                        <div className="login">
                            <span className="login logo logo-reefer">Reefer</span>
                            <span className="login logo logo-aggre">Aggre</span>
                            <FontAwesomeIcon icon={faSnowflake} className="login snowflake"/>
                        </div>
                    </Col>
                    <Col lg={5} md={6} sm={12} className="p-5 shadow-sm rounded-lg bg-white">

                        <Form onSubmit={e => handleSubmit(e, title, pass)}>

                            <Form.Group controlId="formSelectUser">
                                <Form.Label>Select your position</Form.Label>
                                <Form.Select value={title} onChange={(e) => setTitle(e.target.value)}>
                                    {users.map(user => <option key={user.id}
                                                               value={user.position}>{user.position}</option>)}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label className="mt-2">Password</Form.Label>
                                <Form.Control required type="password" placeholder="Password"
                                              onChange={e => setPass(e.target.value)}/>
                            </Form.Group>

                            <Button variant="success btn-block" type="submit" className="bg-primary mt-4"
                                    style={{float: "right"}}>
                                Login
                            </Button>
                            <Col className={errMsg}>Enter correct password</Col>
                        </Form>
                    </Col>
                </Row>
                <h6 className="mt-5 p-5 text-center text-secondary ">Copyright © 2022 jac.polanski. All Rights
                    Reserved.</h6>
            </Container>
        </>
    );
};

export default LoginPage;