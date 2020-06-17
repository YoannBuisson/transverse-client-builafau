import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import styles from './css/menu.module.css';
import {faProjectDiagram} from "@fortawesome/free-solid-svg-icons/faProjectDiagram";
import {faTasks} from "@fortawesome/free-solid-svg-icons/faTasks";

export class Header extends Component {

    render() {
        return (
            <Navbar variant="dark" bg="dark" expand="md" sticky="top">
                <div className="container-fluid">
                    <Navbar.Brand href="/">
                        Transverse Client
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="response-navbar-nav">
                        <Nav>
                            <li role="presentation" className="nav-item">
                                <NavLink to="/students" className="nav-link">
                                    <FontAwesomeIcon className={styles.icon} icon={faUser}/>
                                    Etudiants
                                </NavLink>
                            </li>
                            <Nav.Item role="presentation" className="nav-item">
                                <NavLink to="/projects" className="nav-link">
                                    <FontAwesomeIcon className={styles.icon} icon={faProjectDiagram}/>
                                    Projets
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item role="presentation" className="nav-item">
                                <NavLink to="/tasks" className="nav-link">
                                    <FontAwesomeIcon className={styles.icon} icon={faTasks}/>
                                    Tâches
                                </NavLink>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}

export default Header