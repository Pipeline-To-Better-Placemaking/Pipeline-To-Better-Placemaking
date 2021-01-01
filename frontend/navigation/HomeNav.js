import React, { Component } from 'react';

import TabNavigation from './TabNavigation';

class HomeNav extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location,
            compare: false
        }

        this.onComparePress = this.onComparePress.bind(this);
    }

    onComparePress() {

        this.setState({
            compare: !this.state.compare
        });
    }

    render() {

        return(
            <TabNavigation
                location={this.state.location}
                toggleTheme={this.props.toggleTheme}
            />
        );

    }
}

export default HomeNav;
