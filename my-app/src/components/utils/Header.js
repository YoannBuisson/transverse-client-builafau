import React, {Component} from "react";
import {Link} from "react-router-dom";
import {AUTH_TOKEN} from "../../constants";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AccountCircle} from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        '&:hover': {
            color: 'white', textDecoration: "none",
        },
        flexGrow: 1,
    },
    navButton: {
        '&:hover': {
            color: 'white', textDecoration: "none",
        }
    },
    appBar: {
        background: "linear-gradient(to right, #2c3e50, #3498db)"
    }
}));

export const state = {
    logged: false
}

function AppNavBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        localStorage.removeItem(AUTH_TOKEN)
        history.push('/');
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title}>
                        StudentsQL
                    </Typography>
                    {state.logged ? (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Se déconnecter</MenuItem>
                                </Menu>
                            </div>
                        ) :
                        <div className="d-flex">
                            <Button component={Link} to="/login" color="inherit"
                                    className={classes.navButton}>Connexion</Button>
                            <div className="border"/>
                            <Button component={Link} to="/register" color="inherit" className={classes.navButton}>Créer
                                un compte</Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export class Header extends Component {

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            <AppNavBar/>
            // <Navbar variant="dark" bg="dark" expand="md" sticky="top">
            //     <div className="container-fluid">
            //         <Navbar.Brand href="/">
            //             Transverse Client
            //         </Navbar.Brand>
            //         <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            //         <Navbar.Collapse id="response-navbar-nav">
            //             <Nav>
            //                 <li role="presentation" className="nav-item">
            //                     <NavLink to="/students" className="nav-link">
            //                         <FontAwesomeIcon className={styles.icon} icon={faUser}/>
            //                         Etudiants
            //                     </NavLink>
            //                 </li>
            //                 <Nav.Item role="presentation" className="nav-item">
            //                     <NavLink to="/projects" className="nav-link">
            //                         <FontAwesomeIcon className={styles.icon} icon={faProjectDiagram}/>
            //                         Projets
            //                     </NavLink>
            //                 </Nav.Item>
            //                 <Nav.Item role="presentation" className="nav-item">
            //                     <NavLink to="/tasks" className="nav-link">
            //                         <FontAwesomeIcon className={styles.icon} icon={faTasks}/>
            //                         Tâches
            //                     </NavLink>
            //                 </Nav.Item>
            //                 {authToken ? (
            //                     <Nav.Item role="presentation" className="nav-item" onClick={() => {
            //                         localStorage.removeItem(AUTH_TOKEN)
            //                         this.props.history.push('/')
            //                     }}>
            //                         <span>
            //                             <FontAwesomeIcon className={styles.icon} icon={faTasks}/>
            //                             Se déconnecter
            //                         </span>
            //                     </Nav.Item>
            //                 ) : (
            //                     <Nav.Item role="presentation" className="nav-item">
            //                         <NavLink to="/login" className="nav-link">
            //                             <FontAwesomeIcon className={styles.icon} icon={faTasks}/>
            //                             Se connecter
            //                         </NavLink>
            //                     </Nav.Item>
            //                 )}
            //             </Nav>
            //         </Navbar.Collapse>
            //     </div>
            // </Navbar>
        );
    }
}

export default Header