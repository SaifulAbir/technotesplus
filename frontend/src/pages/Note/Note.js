import React from "react";
import Header from "../../components/Header/Header";
import {Box, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";


export default function Note(props) {
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
                    <div></div>
                    <div>
                        <Box mx={1} display="inline-flex">
                            <Link to="/update-profile" style={{ textDecoration: 'none', color: 'unset' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                >
                                    Add Note
                                </Button>
                            </Link>
                        </Box>
                    </div>
                </div>
                <div>

                </div>
            </Paper>
        </div>
    );
}