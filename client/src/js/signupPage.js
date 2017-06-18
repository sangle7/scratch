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
<FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}>
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Password should contains a number.</HelpBlock>
        </FormGroup>

export default @observer class signupPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: ''
        }
    }
    getValidationState() {
        const length = this.state.password.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange(e) {
        this.setState({
            password: e.target.value
        }.bind(this));
    }
    handleSignup(e) {
        e.preventDefault();
        //进行表单验证
        fetch('/signup', {
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

    <FormGroup
          controlId="password"
          validationState={this.getValidationState.bind(this)}>
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback />
          <HelpBlock>Password should contains a number.</HelpBlock>
        </FormGroup>

    <FieldGroup
      id="repassword"
      type="password"
      label="Confirm Password:"
    />
      <Button bsStyle="primary" disabled onClick={this.handleSignup.bind(this)}>Signup</Button> </form>)
    }
}
