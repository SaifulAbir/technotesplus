import React, { useEffect, useState } from "react";


export function Form(props) {
    const { children, ...other } = props;
    return (
        <form autoComplete="off" noValidate {...other}>
            {props.children}
        </form>
    )
}