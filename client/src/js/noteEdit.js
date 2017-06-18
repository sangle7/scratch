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
    Link
} from 'react-router-dom'


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
    saveNote(id) {
        fetch('/editNote', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                id: id,
                user: AppState.user,
                content: document.getElementById('note').value,
                time: new Date().toString().slice(4, 21)
            })
        });
        //如果success，跳转到首页，反之提示网络错误
    }
    deleteNote(id) {
        fetch('/deleteNote', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                id: id,
                user: AppState.user
            })
        });
        //如果success，跳转到首页，反之提示网络错误
    }
    render() {
        const thisNote = AppState.mynotes.slice().filter((elem) => {
            return elem.id == this.props.match.params.id
        })
        return (<form>
   <FormGroup controlId="note">
      <ControlLabel>Textarea</ControlLabel>
      <FormControl  defaultValue={thisNote[0].content} componentClass="textarea" placeholder="textarea" />
    </FormGroup>
    <FieldGroup
      id="formControlsFile"
      type="file"
      label="File"
      help="Example block-level help text here."
    />
          <Button bsStyle="primary" onClick={this.saveNote.bind(this,this.props.match.params.id)}>Save</Button>
          <Button bsStyle="danger" onClick={this.deleteNote.bind(this,this.props.match.params.id)}>Delete</Button>
          </form>)
    }
}
