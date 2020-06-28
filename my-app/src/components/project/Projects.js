import React, {Component} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {AUTH_TOKEN} from "../../constants";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import styles from './styles/projects.module.css';
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

/*=============================== GraphQL ===============================*/
/*=======================================================================*/
/*=======================================================================*/
const GET_PROJECTS = gql`
    {
        projects {
            _id
            name
            description
            dateOfReturn
        }
    }
`;
/*=======================================================================*/
/*=======================================================================*/
/*=======================================================================*/

/*================================ Const ================================*/
/*=======================================================================*/
/*=======================================================================*/
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    btnLink: {
        '&:hover': {
            color: "white"
        }
    }
});
/*=======================================================================*/
/*=======================================================================*/

/*=======================================================================*/

function ListProjects() {
    const {loading, error, data} = useQuery(GET_PROJECTS);
    const classes = useStyles();

    if (loading) return <span className="status-warning"><CircularProgress/></span>;
    if (error) return <span className="status-error">ERREUR</span>;
    return data.projects.map(({_id, name, description, dateOfReturn}) => (
        <Card className={`${classes.root} ${styles.card}`}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={require('../../img/software-engineer.png')}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Ce projet est rendre avant le <strong>{new Date(dateOfReturn).toLocaleDateString()}</strong>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {localStorage.getItem(AUTH_TOKEN) !== null && (
                    <Button classes={classes.btnLink} size="small" color="primary" variant="contained" component={Link}
                            to={`/new/task/${_id}`}>
                        Ajouter une tâche
                    </Button>
                )}
                <Button size="small" color="primary" component={Link} to={`/projects/${_id}`}>
                    En savoir plus
                </Button>
            </CardActions>
        </Card>
    ));
}

class Projects extends Component {
    render() {
        return (
            <div className={styles.projects}>
                <h1 className={styles.projectTitle}>Projets</h1>
                <div className="d-flex justify-content-center flex-wrap">
                    <ListProjects/>
                </div>
                {localStorage.getItem(AUTH_TOKEN) !== null && (
                    <Fab style={{backgroundColor: "#306a94", color: "white"}} aria-label="add" component={Link}
                         to="/new/project">
                        <AddIcon/>
                    </Fab>
                )}
            </div>
        )
    }
}

export default Projects;