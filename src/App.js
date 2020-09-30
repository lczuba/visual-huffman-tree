import React, {Component} from 'react'
import Header from './header/Header'
import Main from './main/Main'
import './App.css'


class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        )
    }
}

export default App