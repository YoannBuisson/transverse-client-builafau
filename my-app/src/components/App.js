import React from 'react';
import '../styles/App.css';
import Header from "./utils/Header";
import {Route, Switch} from "react-router-dom";
import Home from "./home/Home";
import StudentDetails from "./student/StudentDetails";
import Tasks from "./task/Tasks";
import TaskDetail from "./task/TaskDetail";
import Projects from "./project/Projects";
import ProjectDetail from "./project/ProjectDetail";
import NewStudent from "./student/NewStudent";
import Students from "./student/Students";


function App() {
    return (
        <div>
            <Header/>
            <div className="app-body">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/students" component={Students}/>
                    <Route exact path="/students/:id" component={StudentDetails}/>
                    <Route exact path="/new/student" component={NewStudent}/>
                    <Route exact path="/tasks" component={Tasks}/>
                    <Route exact path="/tasks/:id" component={TaskDetail}/>
                    <Route exact path="/projects" component={Projects}/>
                    <Route exact path="/projects/:id" component={ProjectDetail}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
