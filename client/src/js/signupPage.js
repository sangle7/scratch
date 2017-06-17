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
    Button
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


export default @observer class signupPage extends React.Component {
    handleSignup(e) {
        e.preventDefault();
        fetch('http://localhost:3000', {
                method: "POST",
                mode: 'no-cors',
                body: 'user=' + this.refs.user.value + '&password=' + this.refs.pw.value
            })
            .then((res) => {
                AppState.handleLogin()
            }, function(e) {
                alert("Error submitting form!");
            });

    }
    signupFail() {
        console.log('fail...')
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
    <FieldGroup
      id="repassword"
      type="password"
      label="Confirm Password:"
    />
      <Button bsStyle="primary" onClick={this.handleSignup.bind(this)}>Signup</Button> </form>)
    }
}
