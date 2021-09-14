import React, { useEffect, useState } from "react";
import Controls from "../../components/Controls/Controls";
import { useFormik } from "formik";
import MUIRichTextEditor from "mui-rte";
import { makeStyles } from "@material-ui/core/styles";
import {convertToRaw, convertFromHTML} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'
import {stateToHTML} from 'draft-js-export-html';
import {
    Chip,
    Grid, TextField,
} from "@material-ui/core";
import {Form} from "../../components/Form/Form";
import {api} from "../../configs/configs";
import ContentState from "draft-js/lib/ContentState";

const defaultTheme = createTheme()

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                marginTop: 10,
                marginBottom: 50,
                width: "100%",

            },
            toolbar: {
                border: "1px solid gray"
            },
        }
    }
})

const style = makeStyles({
    wrapper: {
        position: "relative",
    },
});

var initialValues = {
    id: 0,
    text: "",
    note_tag: "",
    is_archived: false
};


const NoteForm = (props) => {
    const [tags, setTags] = useState([])
    const [ content, setContent ] = useState('')

    const { addOrEdit, recordForEdit, previousTags } = props;

    // const validationSchema = yup.object().shape({
    //   name: yup.string()
    //       .required("Name is required")
    //       .test("Unique", "Name needs te be unique", (values) => {
    //         return duplicateNameCheck(supplierList, recordForEdit, values)
    //       }),
    //   vat_number: yup.number().required("Vat number is required"),
    //   corporate_address: yup.string().required("Corporate address is required"),
    //   supplier_address: yup.string().required("Supplier address is required"),
    // });

    const classes = style();

    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            addOrEdit(values, resetForm, setSubmitting);
        },
    });

    useEffect(() => {
        if (recordForEdit != null) {
            recordForEdit.tags = previousTags;
            recordForEdit.is_archived = false;
            formik.setValues({
                ...recordForEdit,
            });
            const contentHTML = convertFromHTML(recordForEdit.text);
            const {contentBlocks, entityMap} = contentHTML;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const content = JSON.stringify(convertToRaw(contentState))
            setContent(content);
        }
    }, [recordForEdit]);

    const tagListUrl = "/api/tag-list";

    useEffect(() => {
        (async () => {
            await api.get(tagListUrl).then((res) => {
                if (res.status === 200) {
                    setTags(res.data);
                }
            });
        })();
    }, []);


    return (
        <Form onSubmit={formik.handleSubmit}>
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <MuiThemeProvider theme={defaultTheme}>
                        <MUIRichTextEditor
                            label="Start Typing here..."
                            defaultValue={content}
                            onChange={value => {
                                const content = draftToHtml(convertToRaw(value.getCurrentContent()))
                                formik.setFieldValue("text", content);
                            }}
                        />
                    </MuiThemeProvider>
                </Grid>
                <br />
                <Grid item md={12} sm={12} xs={12}>
                    <Autocomplete
                        multiple
                        id="tags"
                        defaultValue={previousTags}
                        options={tags.map((option) => option.name)}
                        onChange={(event, value) => formik.setFieldValue("tags", value)}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} variant="filled" label="Tag" name="tags" placeholder="Tags" />
                        )}
                    />
                </Grid>

                <Grid item md={12} style={{ marginTop: 16 }}>
                    <div className={classes.wrapper}>
                        <Controls.Button
                            type="submit"
                            disabled={formik.isSubmitting}
                            text="Submit"
                        />
                    </div>

                </Grid>
            </Grid>
        </Form>
    );
};

export default NoteForm;