import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, { Component } from 'react';
import { EditorState } from 'draft-js';
class CommentEditor extends Component{constructor(props) {
    super(props);
    this.state = {
        editorState: EditorState.createEmpty(),
    };
}

    onEditorStateChange = (editorState) => {
        console.log(editorState)
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
}

export default CommentEditor;