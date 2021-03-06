﻿import React from 'react';
import { connect } from 'react-redux'; 
import SearchBox from '../../components/searchbox/SearchBox';
import CardList from '../../components/cardlist/CardList';
import Scroll from '../../components/scroll/Scroll';
import ErrorBoundary from '../errorboundary/ErrorBoundary';
import './App.css';

import { setSearchField, requestRobots } from '../../actions'

const mapStateToProps = (state) => {
    return {
        searchField: state.searchReducer.searchField,
        robots: state.requestReducer.robots,
        isPending: state.requestReducer.isPending,
        error: state.requestReducer.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => {
            dispatch(setSearchField(event.target.value))
        },
        onRequestRobots: () => dispatch(requestRobots())
    };
};

class App extends React.Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }

    render(){
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        let returnElement;
        if (!robots.length && isPending) {
            returnElement = <h1 className='tc'>Loading...</h1>;
        } else {
            returnElement = <div className='tc'>
                <h1 className='f1'>The Widget Team</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>;
        }
        return returnElement;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);