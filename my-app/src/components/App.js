import React from 'react';
import '../styles/App.css';
import Header from './utils/Header';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from './home/Home';
import StudentDetails from './student/StudentDetails';
import NewTask from './task/NewTask';
import Projects from './project/Projects';
import ProjectDetail from './project/ProjectDetail';
import NewProject from './project/NewProject';
import NewStudent from './student/NewStudent';
import Students from './student/Students';
import Login from './utils/Login';
import Register from './utils/Register';
import {AUTH_TOKEN} from "../constants";


export function changeRoute(props, route) {
    console.log(props, route);
    props.history.push(route);
}

function App() {
    return (
        <div className="app-body">
            <Header/>
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/students' component={Students}/>
                    <Route exact path='/students/:id' component={StudentDetails}/>
                    <Route exact path='/projects' component={Projects}/>
                    <Route exact path='/projects/:id' component={ProjectDetail}/>
                    {localStorage.getItem(AUTH_TOKEN) !== null ? (
                        <Route exact path='/new/student' component={NewStudent}/>
                    ) : (
                        <Redirect to="/login"/>
                    )}
                    {localStorage.getItem(AUTH_TOKEN) !== null ? (
                        <Route exact path='/new/task/:id' component={NewTask}/>
                    ) : (
                        <Redirect to="/login"/>
                    )}
                    {localStorage.getItem(AUTH_TOKEN) !== null ? (
                        <Route exact path='/new/project' component={NewProject}/>
                    ) : (
                        <Redirect to="/login"/>
                    )}
                </Switch>
            </div>
        </div>
    );
}

export default App;
