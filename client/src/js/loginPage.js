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
import {
    Redirect
} from 'react-router-dom'
import style from './../css/form.scss'


function FieldGroup({
    id,
    label,
    help,
    ...props
}) {
    return (
        <FormGroup  bsSize='large' controlId={id}>
        
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
    );
}


export default @observer class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }
    handleLogin(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        });

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
                    this.setState({
                        isLoading: false
                    });
                    //跳转，更改全局用户名，登录状态
                    AppState.user = document.getElementById('User').value;
                    AppState.handleLogin()
                    this.props.history.push('/');
                    console.log(AppState.user)
                } else {
                    this.setState({
                        isLoading: false
                    });
                    alert(code.status)
                }
            })
    }
    render() {
        return (<Col sm={6} md={4} smOffset={3} mdOffset={4}><form className={style.form}>
             <FieldGroup
      id="User"
      type="text"
      label="User:"
      placeholder='Insert UserName Here'
    />

    <FieldGroup
      id="password"
      type="password"
      label="Password:"
    />
        <Button bsStyle="primary" disabled={this.state.isLoading} onClick={this.handleLogin.bind(this)}>Login</Button> 
        <Button bsStyle="success" type="reset">Reset</Button>
        </form></Col>)
    }
}
