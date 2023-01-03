import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
class Ckeditor extends Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.onChange = this.onChange.bind(this);
        
        this.state = {
            content: this.props.content,
        }
        if(props.onChange != undefined)
        {
            this.PushDatetoParent = props.onChange;
        }
    }

    updateContent(newContent) {
        //console.log(newContent)
        this.setState({
        	content: newContent
        })
    }

    onChange(evt) {
        console.log("onChange fired with event info: ", evt);
       var newContent = evt.editor.getData();
        this.setState({
        	content: newContent
        });
        this.PushDatetoParent(newContent);
    }
    PushDatetoParent(){

    }

    onBlur(evt) {
        // console.log("onBlur event called with event info: ", evt);
    }

    afterPaste(evt) {
        // console.log("afterPaste event called with event info: ", evt);
    }
    render() {
        return (
            <div>
                <CKEditor
                    activeClass="p10"
                    content={this.state.content}
                    events={{
                        "blur": this.onBlur,
                        "afterPaste": this.afterPaste,
                        "change": this.onChange
                    }}
                />
            </div>
        );
    }
}

export default (Ckeditor);
