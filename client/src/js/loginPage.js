import React from 'react'
import {
    observer
} from 'mobx-react';
import {
    AppState
} from "./Appstate.js"
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Col
} from "react-bootstrap"

function FieldGroup({
    id,
    label,
    help,
    ...props
}) {
    return (
        <FormGroup controlId={id}>
        
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
    );
}


export default @observer class LoginPage extends React.Component {
    handleLogin(e) {
        e.preventDefault();
        fetch('http://localhost:3000', {
                method: "POST",
                mode: 'no-cors',
                body: "firstName=Nikhil&favColor=blue&password=easytogues"
            })
            .then((res) => {
                AppState.handleLogin()
            }, function(e) {
                alert("Error submitting form!");
            });
    }
    render() {
        return (<form>
             <FieldGroup
      id="User"
      type="text"
      label="User:"
    />

    <FieldGroup
      id="password"
      type="password"
      label="Password:"
    />
        <Button bsStyle="primary" onClick={this.handleLogin.bind(this)}>Login</Button> < /form>)

    }
}
