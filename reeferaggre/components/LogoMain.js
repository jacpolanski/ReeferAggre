import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSnowflake} from "@fortawesome/free-solid-svg-icons"
import {Navbar} from "react-bootstrap";


const LogoMain = () => {


    return (
        <>
            <Navbar.Brand className="d-flex align-items-center">
                <FontAwesomeIcon icon={faSnowflake} className="logo-snowflake"/>
                <span className="logo logo-reefer">Reefer</span>
                <span className="logo logo-aggre">Aggre</span>
            </Navbar.Brand>
        </>
    )
}

export default LogoMain;