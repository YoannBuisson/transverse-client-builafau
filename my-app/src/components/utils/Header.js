import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
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
import {changeRoute} from "../App";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ListSubheader from "@material-ui/core/ListSubheader";

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
        background: "linear-gradient(to right, #2c3e50, #3498db)",
    },
    list: {
        height: "100%",
        width: 250,
        color: "#2c3e50",
        background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
    },
    fullList: {
        width: "auto",
    },
    listText: {
        fontSize: "2em",
        color: "#2c3e50"
    },
}));

function AppNavBar({arg}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({left: false});
    const classes = useStyles();
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        localStorage.removeItem(AUTH_TOKEN);
        changeRoute(arg, '/');
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };
    const list = (anchor) => (
        <div className={classes.list} role="presentation"
             onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}
        >
            <List className={classes.list}>
                <ListSubheader className={classes.listText}>StudentsQL</ListSubheader>
                <ListItem button component={Link} to="/students">
                    <ListItemIcon><PeopleAltRoundedIcon className={classes.listText}/></ListItemIcon>
                    <ListItemText className={classes.listText}>Etudiants</ListItemText>
                </ListItem>
                <Divider variant="inset" component="li"/>
                <ListItem button component={Link} to="/projects">
                    <ListItemIcon><AccountTreeRoundedIcon className={classes.listText}/></ListItemIcon>
                    <ListItemText className={classes.listText}>Projets</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    {['left'].map((anchor) => (
                        <React.Fragment key={anchor}>
                            <IconButton edge="start" onClick={toggleDrawer(anchor, true)} className={classes.menuButton}
                                        color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Drawer anchor={anchor} open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}>
                                {list(anchor)}
                            </Drawer>
                        </React.Fragment>
                    ))}
                    <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title}>
                        StudentsQL
                    </Typography>
                    {localStorage.getItem(AUTH_TOKEN) === null ? (
                            <div className="d-flex">
                                <Button component={Link} to="/login" color="inherit" className={classes.navButton}>
                                    Connexion
                                </Button>
                                <div className="border"/>
                                <Button component={Link} to="/register" color="inherit" className={classes.navButton}>
                                    Créer un compte
                                </Button>
                            </div>
                        ) :
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
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export class Header extends Component {
    render() {
        return (
            <AppNavBar arg={this.props}/>
        );
    }
}

export default withRouter(Header)