import React, { useEffect, useState } from "react";
import Controls from "../../components/Controls/Controls";
import { useFormik } from "formik";
import {
    Grid,
    Button, Typography, Paper
} from "@material-ui/core";
import {Form} from "../../components/Form/Form";
import Header from "../../components/Header/Header";
import {authApi} from "../../configs/configs";
import {makeStyles} from "@material-ui/core/styles";

var initialValues = {
    id: 0,
    username: "",
    first_name: "",
    last_name: "",
};

const useStyles = makeStyles(theme => ({
    container: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
    },
}))


const UpdateProfile = (props) => {
    var [error, setError] = useState(null);

    const classes = useStyles();

    const updateProfile = async (values) => {

        try {
            await authApi.put("/api/update_profile/", values)
                .then((res) => {
                    props.history.push("/profile");
                })
                .catch((err) => {
                    setError(true);
                });
        } catch (error) {
            setError(true);
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            updateProfile(values);
        },
    });

    const fetchProfile = async () => {

        try {
            await authApi.get("/api/profile/")
                .then((res) => {
                    formik.setValues({
                        ...res.data
                    });
                })
                .catch((err) => {
                    setError(true);
                });
        } catch (error) {
            setError(true);
        }
    };


    useEffect(() => {
        fetchProfile();
    }, []);


    return (
        <div>
            <Header {...props} />
            <div style={{margin: "16px"}}>
                <Typography>Update Profile</Typography>
            </div>
            <Grid container className={classes.container}>
                <Paper
                    elevation={3}
                    square={false}
                    style={{ padding: 16, margin: "16px" }}
                >
                    <Form onSubmit={formik.handleSubmit}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item md={6} sm={12} xs={12}>
                                <Controls.Input
                                    label="email"
                                    name="email"
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                <Controls.Input
                                    label="First Name"
                                    name="first_name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controls.Input
                                    label="Last Number"
                                    name="last_name"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={12} style={{ marginTop: 16 }}>
                                <div style={{float: "right"}}>
                                    <Button style={{justifyContent: 'center'}}
                                            variant={"contained"}
                                            size={"large"}
                                            color={"primary"}
                                            type="submit"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Form>
                </Paper>
            </Grid>
        </div>
    );
};

export default UpdateProfile;