import React from 'react';

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {};
    }

    componentDidMount = () => {
        console.log('component mounted')
    }

    render(){
        return (
            <h1>Selenium Webdriver + Applitools + Jest + Just Travis CI</h1>
        )
    }
}