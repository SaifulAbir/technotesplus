import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Paper, TextField,
    Typography
} from "@material-ui/core";
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Markup } from 'interweave';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Popup from "../../components/Controls/Popup";
import NoteForm from "./NoteForm";
import Notification from "../../components/SnackBar/Notification";
import {api, authApi} from "../../configs/configs";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import {Autocomplete} from "@material-ui/lab";
import {Form} from "../../components/Form/Form";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginRight: "10px"
    },
}));

export default function Note(props) {
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [error, setError] = useState(null);
    const [noteRecord, setNoteRecord] = useState(null);
    const [noteList, setNoteList] = useState([]);
    const [note, setNote] = useState('');
    const [previousTags, setPreviousTags] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState({});
    const [openSharePopup, setOpenSharePopup] = React.useState(false);

    const handleClose = () => {
        setOpenSharePopup(false);
    };

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: "",
    });

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function fetchNotes() {

        try {
            await authApi.get("/api/note-search")
                .then((res) => {
                    setNoteList(res.data);
                })
                .catch((err) => {
                    setError(error);
                });
        } catch (error) {
            setError(error);
        }
    }

    const postNote = async (values, setSubmitting) => {

        try {
            await authApi.post("/api/create-note/", values)
                .then((resp) => {
                    setNoteRecord(resp.data);
                    setSubmitting(false);
                });
        } catch (error) {
            setError(error);
        }
    };

    const updateNote = async (values, setSubmitting) => {

        try {
            await authApi.put(`/api/update-note/${values.id}/`, values)
                .then((resp) => {
                    setNoteRecord(resp.data);
                    setSubmitting(false);
                });
        } catch (error) {
            setError(error);
        }
    };

    const deleteNote = async (values) => {
        values.is_archived = true;
        try {
            await authApi.put(`/api/delete-note/${values.id}/`, values)
                .then((resp) => {
                    setNoteRecord(resp.data);
                });
            setConfirmDialog({
                ...confirmDialog,
                isOpen: false
            });
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            });
        } catch (error) {
            setError(error);
        }
    };

    const searchNote = async (value) => {
        var searchNoteUrl = `/api/note-search/?tag=${value}`;
        if(value == null){
            searchNoteUrl = "/api/note-search/";
        }
        try {
            await authApi.get(searchNoteUrl)
                .then((resp) => {
                    setNoteList(resp.data);
                });
        } catch (error) {
            setError(error);
        }
    };

    var shareValues = {
        note: note,
        shared_with: user.id,
    };

    const handleShareSubmit = async (e) => {
        e.preventDefault();
        try {
            await authApi.post("/api/share-note/", shareValues)
                .then((resp) => {
                    setOpenSharePopup(false);
                    setNotify({
                        isOpen: true,
                        message: "Shared Successfully",
                        type: "success",
                    });
                });
        } catch (error) {
            setError(error);
        }
    };

    const tagListUrl = "/api/tag-list";
    const userListUrl = "/api/user-list";

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        fetchNotes();
        (async () => {
            await api.get(tagListUrl).then((res) => {
                if (res.status === 200) {
                    setTagList(res.data);
                }
            });
        })();
        (async () => {
            await authApi.get(userListUrl).then((res) => {
                if (res.status === 200) {
                    setUserList(res.data);
                }
            });
        })();
    }, [noteRecord]);


    const openInPopup = (item) => {
        setRecordForEdit(item);
        var tagList = [];
        if (item.note_tag.length > 0) {
            for (var i = 0; i < item.note_tag.length; i++) {
                tagList.push(item.note_tag[i].name);
            }
        }
        setPreviousTags(tagList);
        setOpenPopup(true);
    };

    const addOrEdit = (note, resetForm, setSubmitting) => {
        if (note.id === 0) postNote(note, setSubmitting);
        else updateNote(note, setSubmitting);
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        setNotify({
            isOpen: true,
            message: "Submitted Successfully",
            type: "success",
        });
    };

    return (
        <div>
            <Header {...props} />
            <div style={{margin: "16px"}}>
                <Typography>Notes</Typography>
            </div>
            <Paper
                elevation={3}
                square={false}
                style={{ padding: 16, margin: "16px" }}
            >
                <div
                    className="px-4"
                    style={{
                        marginBottom: "1.25rem",
                        alignItems: "center",
                        justifyContent: "space-between",
                        display: "flex",
                    }}
                >
                    <div style={{width: "30%"}}>
                        <Autocomplete style={{width: "100%"}}
                                      freeSolo
                                      id="free-solo-2-demo"
                                      options={tagList.map((option) => option.name)}
                                      onChange={(event, value) => searchNote(value)}
                                      renderInput={(params) => (
                                          <TextField
                                              {...params}
                                              label="Search Note by Tag"
                                              margin="normal"
                                              variant="outlined"
                                              fullWidth
                                              InputProps={{ ...params.InputProps }}
                                          />
                                      )}
                        />
                    </div>
                    <div>
                        <Box mx={1} display="inline-flex">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    setOpenPopup(true);
                                    setRecordForEdit(null);
                                    setPreviousTags([]);
                                }}
                            >
                                Add Note
                            </Button>
                        </Box>
                    </div>
                </div>
                <div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        {noteList.map((note, index) => (
                            <Card key={index} className={classes.root}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            <EditIcon />
                                        </Avatar>
                                    }
                                    title={note.created_by}
                                    subheader={note.created_at}
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
                                <CardActions disableSpacing>
                                    <IconButton color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: "Are you sure to delete this note?",
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => {
                                                            deleteNote(note);
                                                        },
                                                    });
                                                }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share" color="default"
                                                onClick={() => {
                                                    setOpenSharePopup(true);
                                                    setNote(note.id);
                                                }}>
                                        <ShareIcon />
                                    </IconButton>
                                    <IconButton color="primary"
                                                onClick={() => {
                                                    openInPopup(note);
                                                }}>
                                        <EditIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </div>

            </Paper>
            <Dialog open={openSharePopup} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Share Note</DialogTitle>
                <Form onSubmit={handleShareSubmit}>
                <DialogContent>
                    <DialogContentText>
                        To share note, please select user here.
                    </DialogContentText>
                    <Autocomplete
                        id="combo-box-demo"
                        options={userList}
                        getOptionLabel={(option) => option.username}
                        style={{ width: 400 }}
                        renderInput={(params) => <TextField {...params} label="Choose user" variant="outlined" />}
                        onChange={(event, value) => {
                            setUser(value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Share
                    </Button>
                </DialogActions>
                </Form>
            </Dialog>
            <Popup
                title="Note Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <NoteForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                    previousTags={previousTags}
                />
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div>
    );
}