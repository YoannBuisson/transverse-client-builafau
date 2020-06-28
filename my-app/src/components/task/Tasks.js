import React, {Component} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {Link} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import {AUTH_TOKEN} from '../../constants';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../student/styles/students.module.css";

const GET_TASKS = gql`
    {
        tasks {
            _id
            name
            status
        }
    }
`;

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function ShowTasks(){
    const classes = useStyles();
    const {loading, error, data} = useQuery(GET_TASKS);

    if (loading) return <div className="status-warning"><Spinner animation="grow"/></div>;
	if (error) return <span className="status-error">Il y a une erreur !</span>;

	return data.tasks.map(({_id, name, status}) => (
        <Card>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={require('../../img/software-engineer.png')}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Partager
                </Button>
                <Button size="small" color="primary" component={Link} to={`/tasks/${_id}`} >
                    Infos
                </Button>
            </CardActions>
        </Card>
    ));

}

class Tasks extends Component {
    render() {
        return (
            <div>
                <h1>Tâches</h1>
                <div className="d-flex justify-content-center flex-wrap">
                    <ShowTasks/>
                </div>
                {localStorage.getItem(AUTH_TOKEN) !== null && (
                    <Fab aria-label="add" component={Link} to="/new/task">
                        <AddIcon/>
                    </Fab>
                )}
            </div>
        )
    }
}

export default Tasks;