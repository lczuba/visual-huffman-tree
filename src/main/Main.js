import React, {Component} from 'react'
import TextArea from './TextArea'
import HuffmanTree from './HuffmanTree'

class Main extends Component{
    constructor(props) {
        super();
        this.state = {
            allText: "test",
        };

    }
    render(){
        const updateAllText = (text) => {
            console.log(text);
            this.setState({
                allText: text
            })
        } 
         
        return(
            <main className="main">
                <TextArea  updateAllText={updateAllText} />
                <HuffmanTree allText={this.state.allText} />
            </main>
        )
    }
}

export default Main