import React, {Component} from "react";
import {Menubar} from "primereact/menubar";

export class AppMenu extends Component {

    render() {
        var items = [
            {label: 'Home', icon: 'pi pi-home', command: () => { window.location.hash="/home"; } },
            {label: 'User', icon: 'pi pi-user', command: () => { window.location.hash="/user/:id"; }},
            {label: 'Profile Page', icon: 'pi pi-user', command: () => { window.location.hash="/me"; }},
            {label: 'Projects', icon: 'pi pi-file', command: () => { window.location.hash="/projects"; }},
            {label: 'Tasks', icon: 'pi pi-file', command: () => { window.location.hash="/tasks"; }}
        ];

        return (
            <Menubar model={items}>
            </Menubar>
        );
    }
}

export default AppMenu