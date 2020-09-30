import React, {Component} from 'react'
import getCaretCoordinates from 'textarea-caret'

class TextArea extends Component{
    constructor(props){
        super();
        this.state = {};
    }

    handleChange = (e) => {
        var caret = getCaretCoordinates(e.target, e.target.selectionEnd);
        console.log('(top, left)', caret.top, caret.left);
        this.props.updateAllText(e.target.value);
    }

    render(){
        return(
            <textarea
            className="textArea"
            placeholder="Write sth..." 
            onChange={this.handleChange}>
            </textarea>
        )
    }
}

export default TextArea