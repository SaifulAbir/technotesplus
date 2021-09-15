import React, { useState } from "react";
import Controls from "../../components/Controls/Controls";
import { useFormik } from "formik";
import {
    Grid,
    Button, Typography, Paper, Fade
} from "@material-ui/core";
import {Form} from "../../components/Form/Form";
import Header from "../../components/Header/Header";
import {baseAPIURL} from "../../configs/configs";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import * as yup from "yup";
import * as Yup from "yup";

var initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
};

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
    },
    errorMessage: {
        textAlign: "center",
    },
}))

var holdPassword = '';

const ChangePassword = (props) => {
    var [error, setError] = useState(null);

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

    const changePassword = async (values, setSubmitting) => {

        try {
            await axios.post("/api/change-password/", values, requestOptions)
                .then((res) => {
                    props.history.push("/profile");
                })
                .catch((err) => {
                    setError(true);
                    setSubmitting(false);
                });
        } catch (error) {
            setError(true);
            setSubmitting(false);
        }
    };

    const validationSchema = yup.object().shape({
        old_password: yup.string().required('Old Password is required'),
        new_password: yup.string().required("New Password is required").test((values)=>{
            holdPassword = values
            return true
        }),
        confirm_password: yup.string()
            .required("Confirm Password is required")
            .test("Match", "Password doesn't match!", (values) => {
                if (values === holdPassword){
                    return true
                }
                return false
            }),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            changePassword(values, setSubmitting);
        },
    });

    return (
        <div>
            <Header {...props} />
            <div style={{margin: "16px"}}>
                <Typography>Change Password</Typography>
            </div>
            <Grid container className={classes.container}>
                <Paper
                    elevation={3}
                    square={false}
                    style={{ padding: 16, margin: "16px" }}
                >
                    <Fade in={error}>
                        <Typography color="secondary" className={classes.errorMessage}>
                            Old password is not correct!!!
                        </Typography>
                    </Fade>
                    <Form onSubmit={formik.handleSubmit}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item md={6} sm={12} xs={12}>
                                <Controls.Input
                                    label="Old Password"
                                    name="old_password"
                                    id="old_password"
                                    type = "password"
                                    value={formik.values.old_password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                                    helperText={formik.touched.old_password && formik.errors.old_password}
                                />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                <Controls.Input
                                    label="New Password"
                                    name="new_password"
                                    type="password"
                                    value={formik.values.new_password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                                    helperText={formik.touched.new_password && formik.errors.new_password}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controls.Input
                                    label="Confirm Password"
                                    name="confirm_password"
                                    type="password"
                                    value={formik.values.confirm_password}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                    helperText={formik.touched.confirm_password && formik.errors.confirm_password}
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

export default ChangePassword;