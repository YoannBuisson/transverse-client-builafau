import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route} from "react-router-dom";
import HomePage from "./component/home/HomePage";
import ProfilePage from "./component/user/ProfilePage";
import UserPage from "./component/user/UserPage";
import TaskList from "./component/task/TaskList";
import TaskDetail from "./component/task/TaskDetail";
import ProjectList from "./component/project/ProjectList";
import ProjectDetail from "./component/project/ProjectDetail";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <Switch>
                    <Route path="/home">
                        <HomePage/>
                    </Route>
                    <Route path="/me">
                        <ProfilePage />
                    </Route>
                    <Route path="/user/:id">
                        <UserPage />
                    </Route>
                    <Route path="/tasks">
                        <TaskList />
                    </Route>
                    <Route path="/task/:id">
                        <TaskDetail />
                    </Route>
                    <Route path="/projects/">
                        <ProjectList />
                    </Route>
                    <Route path="/project/:id">
                        <ProjectDetail />
                    </Route>
                </Switch>
            </header>
        </div>
    );
}

export default App;
