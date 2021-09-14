import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import {Avatar, Card, CardContent, CardHeader, Paper, Typography} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {Markup} from "interweave";
import { baseAPIURL} from "../../configs/configs";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginRight: "10px"
    },
}));

function SharedNote(props) {
    var [error, setError] = useState(null);
    const [sharedNoteList, setSharedNoteList] = useState([]);

    const classes = useStyles();

    const token = localStorage.getItem('access_token');
    const requestOptions = {
        baseURL: baseAPIURL,
        headers: {
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`,
            "Accept-Language": "*",
        },
    };

    async function fetchSharedNote() {

        try {
            await axios.get("/api/shared-note-list", requestOptions)
                .then((res) => {
                    setSharedNoteList(res.data);
                })
                .catch((err) => {
                    setError(error);
                });
        } catch (error) {
            setError(error);
        }
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        fetchSharedNote();
    }, []);

    return (
        <div>
            <Header {...props} />
            <div style={{margin: "16px"}}>
                <Typography>Shared Notes From Others</Typography>
            </div>
            <Paper
                elevation={3}
                square={false}
                style={{ padding: 16, margin: "16px" }}
            >
                <div style={{display: "flex", flexDirection: "row"}}>
                        {sharedNoteList.map((note, index) => (
                            <Card key={index} className={classes.root}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="edit" className={classes.avatar}>
                                            <EditIcon />
                                        </Avatar>
                                    }
                                    title="Note"
                                    subheader={"Shared by: " + note.shared_by}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <Markup content={note.text} />
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Tags: {note.note_tag.map(tag_name => tag_name.name
                                    ).join(', ')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
            </Paper>
        </div>
    );
}

export default SharedNote;
