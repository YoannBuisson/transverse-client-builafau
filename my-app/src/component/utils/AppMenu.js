import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import styles from './menu.module.css';
import {faProjectDiagram} from "@fortawesome/free-solid-svg-icons/faProjectDiagram";
import {faTasks} from "@fortawesome/free-solid-svg-icons/faTasks";

export class AppMenu extends Component {

    render() {
        return (
            <Navbar bg="light" expand="md">
                <div className="container-fluid">
                    <Navbar.Brand href="/home">
                        Transverse Client
                    </Navbar.Brand>
                    <button data-toggle="collapse" data-target="#navcol-1" className="navbar-toggler">
                        <span className="sr-only">
                            Toggle navigation
                        </span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Navbar.Collapse id="navcol-1">
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
                    <NavLink to="/new/student" className="btn btn-outline-dark" role="button">
                        Nouvel étudiant
                    </NavLink>
                </div>
            </Navbar>
        );
    }
}

export default AppMenu