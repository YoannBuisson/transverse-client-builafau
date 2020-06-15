import React from 'react';
import './App.css';
import AppMenu from "./component/utils/AppMenu";
import {Route, Switch} from "react-router-dom";
import Home from "./component/home/Home";
import StudentDetails from "./component/student/StudentDetails";
import Tasks from "./component/task/Tasks";
import TaskDetail from "./component/task/TaskDetail";
import Projects from "./component/project/Projects";
import ProjectDetail from "./component/project/ProjectDetail";
import NewStudent from "./component/student/NewStudent";
import Students from "./component/student/Students";


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <AppMenu/>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/students" component={Students}/>
                    <Route path="/students/:id" component={StudentDetails}/>
                    <Route path="/new/student" component={NewStudent}/>
                    <Route path="/tasks" component={Tasks}/>
                    <Route path="/tasks/:id" component={TaskDetail}/>
                    <Route path="/projects" component={Projects}/>
                    <Route path="/projects/:id" component={ProjectDetail}/>
                </Switch>
            </header>
        </div>
    );
}

export default App;
