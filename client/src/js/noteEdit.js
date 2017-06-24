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
    observer
} from 'mobx-react';
import {
    AppState
} from "./Appstate.js"
import {
    Link,
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
        <FormGroup controlId={id}>
        
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
    );
}



export default @observer class noteEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }
    saveNote(id) {
        //如果success，跳转到首页，反之提示网络错误
        this.setState({
            isLoading: true
        });
        var formdata = new FormData();
        formdata.append('id', id)
        formdata.append('user', AppState.user)
        formdata.append('time', new Date().toString().slice(4, 21))
        formdata.append('content', document.getElementById('note').value)
        formdata.append('file', document.getElementById('formControlsFile').files[0])
        fetch('/editNote', {
                method: 'POST',
                body: formdata
            })
            .then(blob => {
                if (blob.ok) {
                    blob.json()
                } else {
                    alert('文件传输失败')
                }
            })
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
                    alert('网络错误')
                }
            })
            .catch(() => {
                alert('文件传输失败')
            })
    }
    deleteNote(id) {
        this.setState({
            isLoading: true
        });
        var r = confirm("Do you really want to DETELE it?");
        if (r) {
            fetch('/deleteNote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                        id: id,
                        user: AppState.user
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
                        alert('网络错误')
                    }
                })
        } else {
            this.setState({
                isLoading: false
            });
        }
    }
    render() {
        const thisNote = AppState.mynotes.slice().filter((elem) => {
            return elem.id == this.props.match.params.id
        })
        if (!thisNote[0]) {
            return (<Redirect to={{pathname: '/'}}/>)
        }
        const fileurl = '/public/' + thisNote[0].file
        return (<Col sm={10} md={8} smOffset={1} mdOffset={2}><form className={style.form}  enctype="multipart/form-data">
   <FormGroup controlId="note">
      <FormControl  defaultValue={thisNote[0].content} componentClass="textarea" placeholder="Write something..." />
    </FormGroup>
    <FieldGroup
      id="formControlsFile"
      type="file"
      label="Attachment"
      help="Example block-level help text here."
    />
    <a target="_blank" href={fileurl}>{thisNote[0].file}</a>
          <Button bsSize="large" block bsStyle="primary" disabled={this.state.isLoading} onClick={this.saveNote.bind(this,this.props.match.params.id)}>Save</Button>
          <Button bsSize="large" block bsStyle="danger" disabled={this.state.isLoading} onClick={this.deleteNote.bind(this,this.props.match.params.id)}>Delete</Button>
          </form></Col>)
    }
}
