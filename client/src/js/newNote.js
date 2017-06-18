import React from 'react'
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Col
} from "react-bootstrap";
import {
    AppState
} from "./Appstate.js"

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



export default class newNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            validation: true
        }
    }
    saveNote(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        //上传note，发送ajax传入数据库（用户名，文字内容，时间，//附件）
        //fetch(url,{mode:'no-cors',type:'post'})
        fetch('/newNote', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    user: AppState.user,
                    content: document.getElementById('note').value,
                    time: new Date().toString().slice(4, 21)
                })
            })
            .then(blob => blob.json())
            .then(code => {
                if (code.status == 'success') {
                    this.setState({
                        isLoading: false
                    });
                    this.props.history.push('/');
                } else {
                    this.setState({
                        isLoading: false
                    });
                    alert(code.status)
                }
            })
    }
    handleChange = (e) => {
        if (e.target.value.length != 0) {
            this.setState({
                validation: false
            })
        } else {
            this.setState({
                validation: true
            })
        }
    }
    render() {
        return (<form>
   <FormGroup controlId="note">
      <ControlLabel>Textarea</ControlLabel>
      <FormControl onChange={this.handleChange} componentClass="textarea" placeholder="Write something..." />
    </FormGroup>
    <FieldGroup
      id="formControlsFile"
      type="file"
      label="File"
      help="Example block-level help text here."
    />
          <Button bsStyle="primary" disabled={this.state.isLoading||this.state.validation} onClick={this.saveNote.bind(this)}>Create</Button></form>)
    }
}
