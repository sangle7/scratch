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
import style from './../css/form.scss'

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
        var file = document.getElementById('formControlsFile').files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
            var rawData = reader.result;
            this.handleUpload(file, rawData)
        }
        reader.readAsBinaryString(file);
    }
    handleUpload = (file, rawData) => {
        //上传note，发送ajax传入数据库（用户名，文字内容，时间）
        fetch('/newNote', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    user: AppState.user,
                    content: document.getElementById('note').value,
                    time: new Date().toString().slice(4, 21),
                    file: {
                        name: file.name,
                        data: rawData
                    }
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
        return (<Col sm={10} md={8} smOffset={1} mdOffset={2}><form className={style.form}>
   <FormGroup controlId="note">
      <FormControl onChange={this.handleChange} componentClass="textarea" placeholder="Write something..." />
    </FormGroup>
    <FieldGroup
      id="formControlsFile"
      type="file"
      label="Attachment"
      help="Example block-level help text here."
    />
          <Button bsSize="large" block bsStyle="primary" disabled={this.state.isLoading||this.state.validation} onClick={this.saveNote.bind(this)}>Create</Button></form>
</Col>)
    }
}
