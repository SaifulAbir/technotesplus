import React, { useState } from "react";
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


var loginValues = {
    username: "",
    password: ""
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

const Login = (props) => {
    const classes = useStyles();
    var [error, setError] = useState(null);

    const LoginFormik = useFormik({
        initialValues: loginValues,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            login(values);
        },
    });

    const login = async (values) => {

        try {
            await api.post("/api/token/", values)
                .then((res) => {
                    localStorage.setItem('access_token', res.data.refresh)
                    props.history.push('/notes')
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
                        Login Here
                    </Typography>
                    <Fade in={error}>
                        <Typography color="secondary" className={classes.errorMessage}>
                            Something is wrong with your username or password
                        </Typography>
                    </Fade>
                    <Form onSubmit={LoginFormik.handleSubmit}>
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
                                    value={LoginFormik.values.username}
                                    onChange={LoginFormik.handleChange}
                                    onBlur={LoginFormik.handleBlur}
                                    margin="normal"
                                    type="text"
                                    error={LoginFormik.touched.username && Boolean(LoginFormik.errors.username)}
                                    helperText={LoginFormik.touched.username && LoginFormik.errors.username}
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
                                    value={LoginFormik.values.password}
                                    onChange={LoginFormik.handleChange}
                                    onBlur={LoginFormik.handleBlur}
                                    margin="normal"
                                    type="password"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <div className={classes.formButtons}>
                                    <Button style={{justifyContent: 'center'}}
                                            variant={"contained"}
                                            size={"large"}
                                            color={"primary"}
                                            classes={{ root: classes.root, label: classes.label }}>
                                        Signup
                                    </Button>
                                    <Button style={{justifyContent: 'center'}}
                                            variant={"contained"}
                                            size={"large"}
                                            color={"primary"}
                                            type="submit"
                                            disabled={
                                                LoginFormik.isSubmitting, LoginFormik.values.username.length === 0 || LoginFormik.values.password.length === 0
                                            }
                                            classes={{ root: classes.root, label: classes.label }}>
                                        Login
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
