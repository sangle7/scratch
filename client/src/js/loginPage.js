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

            fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                        name: document.getElementById('User').value,
                        password: document.getElementById('password').value
                    })
                })
                .then(blob => blob.json())
                .then(code => {
                    if (code.status == 'success') {
                        //跳转，更改全局用户名，登录状态
                        //跳转
                        AppState.user = document.getElementById('User').value;
                        AppState.handleLogin()
                        console.log(AppState.user)
                    } else {
                        alert(code.status)
                    }
                })
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
