import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
    Paper,
    Grid,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Box,
    Typography
} from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import Header from "../../components/Header/Header";
import {baseAPIURL} from "../../configs/configs";
import axios from "axios";

function Profile(props) {
    var [error, setError] = useState(null);
    const [profile, setProfile] = useState({});

    const token = localStorage.getItem('access_token');
    const requestOptions = {
        baseURL: baseAPIURL,
        headers: {
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`,
            "Accept-Language": "*",
        },
    };

    const fetchProfile = async () => {

        try {
            await axios.get("/api/profile/", requestOptions)
                .then((res) => {
                    setProfile(res.data)
                })
                .catch((err) => {
                    setError(true);
                });
        } catch (error) {
            setError(true);
        }
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div>
            <Header {...props} />
            <div style={{margin: "16px"}}>
                <Typography>User Profile</Typography>
            </div>
            <Paper
                elevation={3}
                square={false}
                style={{ paddingTop: 6, margin: "16px" }}
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
                    <Link to="/notes">
                        <IconButton>
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    </Link>
                    <div>
                        <Box mx={1} display="inline-flex">
                            <Link to="/update-profile">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                >
                                    Update Profile
                                </Button>
                            </Link>
                        </Box>
                    </div>
                </div>
                <div>
                    <Grid container alignItems="flex-start" spacing={6}>
                        <Grid item md={6} sm={12} xs={12}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Username</TableCell>
                                        <TableCell align="right">
                                            {profile.username}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">{profile.email}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell align="right">{profile.first_name || "None"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell align="right">{profile.last_name || "None"}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </div>
    );
}

export default Profile;
