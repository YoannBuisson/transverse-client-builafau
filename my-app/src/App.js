import React from 'react';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AppMenu from "./component/utils/AppMenu";
import {Route, Switch} from "react-router-dom";
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
            <AppMenu/>
            <header className="App-header">
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/me" component={ProfilePage}/>
                    <Route path="/user/:id" component={UserPage}/>
                    <Route path="/tasks" component={TaskList}/>
                    <Route path="/task/:id" component={TaskDetail}/>
                    <Route path="/projects" component={ProjectList}/>
                    <Route path="/projects/:id" component={ProjectDetail}/>
                </Switch>
            </header>
        </div>
    );
}

export default App;
