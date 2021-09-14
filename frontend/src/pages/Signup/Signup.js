import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
    Grid,
    Typography,
    Button,
    Fade,
    TextField,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from "formik";
import { Form } from "../../components/Form/Form";
import { api } from "../../configs/configs";
import * as yup from "yup";


var signupValues = {
    username: "",
    password: "",
    email: "",
    confirmPassword: ""
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    },
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
    greeting: {
        fontWeight: 500,
        textAlign: "center",
        marginTop: theme.spacing(4),
    },
    formButtons: {
        width: "100%",
        marginTop: theme.spacing(4),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    errorMessage: {
        textAlign: "center",
    },
}))

var holdPassword = ''

const Login = (props) => {
    const classes = useStyles();
    var [error, setError] = useState(null);


    const validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email"),
        password: yup.string().required("Password is required").test((values)=>{
            holdPassword = values
            return true
        }),
        confirmPassword: yup.string()
            .required("Confirm Password is required")
            .test("Match", "Password doesn't match!", (values) => {
                if (values === holdPassword){
                    return true
                }
                return false
            }),
    });

    const signupFormik = useFormik({
        initialValues: signupValues,
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            signup(values);
        },
    });

    const signup = async (values) => {

        try {
            await api.post("/api/signup/", values)
                .then((res) => {
                    props.history.push('/')
                })
                .catch((err) => {
                    setError(true);
                });
        } catch (error) {
            setError(true);
        }
    };

    return (
        <Grid container className={classes.container}>
            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <Typography variant="h3" className={classes.greeting}>
                        Tech Notes Plus
                    </Typography>
                    <Typography variant="h5" className={classes.greeting}>
                        Signup Here
                    </Typography>
                    <Fade in={error}>
                        <Typography color="secondary" className={classes.errorMessage}>
                            Something wrong is occurred
                        </Typography>
                    </Fade>
                    <Form onSubmit={signupFormik.handleSubmit}>
                        <Grid container justifyContent="space-between" alignItems="flex-start" spacing={0}>
                            <Grid item md={12} sm={12} xs={12}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    InputProps={{
                                        classes: {
                                            underline: classes.textFieldUnderline,
                                            input: classes.textField,
                                        },
                                    }}
                                    value={signupFormik.values.username}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                    margin="normal"
                                    type="text"
                                    error={signupFormik.touched.username && Boolean(signupFormik.errors.username)}
                                    helperText={signupFormik.touched.username && signupFormik.errors.username}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    InputProps={{
                                        classes: {
                                            underline: classes.textFieldUnderline,
                                            input: classes.textField,
                                        },
                                    }}
                                    value={signupFormik.values.email}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                    margin="normal"
                                    type="text"
                                    error={signupFormik.touched.email && Boolean(signupFormik.errors.email)}
                                    helperText={signupFormik.touched.email && signupFormik.errors.email}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    id="password"
                                    InputProps={{
                                        classes: {
                                            underline: classes.textFieldUnderline,
                                            input: classes.textField,
                                        },
                                    }}
                                    value={signupFormik.values.password}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                    margin="normal"
                                    type="password"
                                    fullWidth
                                    error={signupFormik.touched.password && Boolean(signupFormik.errors.password)}
                                    helperText={signupFormik.touched.password && signupFormik.errors.password}
                                />
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <TextField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    InputProps={{
                                        classes: {
                                            underline: classes.textFieldUnderline,
                                            input: classes.textField,
                                        },
                                    }}
                                    value={signupFormik.values.confirmPassword}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                    margin="normal"
                                    type="password"
                                    fullWidth
                                    error={signupFormik.touched.confirmPassword && Boolean(signupFormik.errors.confirmPassword)}
                                    helperText={signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword}
                                />
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <div className={classes.formButtons}>
                                    <Link to="/">
                                        <Button style={{justifyContent: 'center'}}
                                                variant={"contained"}
                                                size={"large"}
                                                color={"primary"}
                                                classes={{ root: classes.root, label: classes.label }}>
                                            Login
                                        </Button>
                                    </Link>
                                    <Button style={{justifyContent: 'center'}}
                                            variant={"contained"}
                                            size={"large"}
                                            color={"primary"}
                                            type="submit"
                                            disabled={
                                                signupFormik.isSubmitting || signupFormik.values.username.length === 0 || signupFormik.values.password.length === 0
                                                || signupFormik.values.email.length === 0 || signupFormik.values.confirmPassword.length === 0
                                            }
                                            classes={{ root: classes.root, label: classes.label }}>
                                        Signup
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Form>
                </div>
            </div>
        </Grid>
    );
};

export default Login;
