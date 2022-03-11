import React from "react";
import {Card, Container, Carousel} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons"

export default function About() {
    return (
        <Container>
            <Card className="text-center p-5">
                <div className="card-text">
                    <Carousel pause="hover">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="./178004_450713274948442_1379655746_o.jpg"
                                alt="Island in fog"
                                style={{width: 800, height: 600}}
                            />
                            <Carousel.Caption>
                                <div className="bg-opacity-50 bg-white rounded-3 p-5">
                                    <div>
                                        <h2 className="text-dark mb-5">Hi, my name is Jacek,</h2>
                                        <p className="card-text bg-25 fs-4 text-dark">
                                            I'm a Front-End developer, with former experience in Merchant Navy.
                                            Interested in wide range of frontend technologies and working on ambitious
                                            projects with positive people.
                                        </p>
                                    </div>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="./919134_725321127487654_186444004_o.jpg"
                                alt="Second slide"
                                style={{width: 800, height: 600}}
                            />

                            <Carousel.Caption>
                                <div className="bg-opacity-50 bg-white rounded-3 p-5">
                                    <div>
                                        <p className="card-text bg-25 fs-4 text-dark">
                                            I am well organized person, good at problem solving, eager to learn new
                                            technologies. Fan of hiking, aquarium hobbyist and fish-keeper.
                                        </p>
                                    </div>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="./23406047_1760055774014179_3448217236588905289_o.jpg"
                                alt="Third slide"
                                style={{width: 800, height: 600}}
                            />

                            <Carousel.Caption>
                                <div className="bg-opacity-50 bg-white rounded-3 p-5">
                                    <div>
                                        <p className="card-text bg-25 fs-4 text-dark">Father of two, girl and boy and
                                            family person. Looking for interesting job opportunities. Do not hesitate
                                            contact me on below socials if you have any questions.
                                        </p>
                                    </div>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </Card>

            <div className="socials-icons text-center">
                <FontAwesomeIcon icon={faGithub} className="mx-2"/>
                <FontAwesomeIcon icon={faLinkedin} style={{color: "#0072b1"}} className="mx-2"/>
            </div>
        </Container>

    )
}