import React, { Component } from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
// import actions for redux
import { setSearchField, requestRobots } from '../actions';

//define functions to be used by connect(), this is default syntax to be used in future!
    //here goes the state assignment from reducers (point to state.reducer.stateKey)
const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}
    //here are the actions! dispatch(1st) or return the function(2nd) with dispatch method
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

// after class declaration there's no longer need for constructor and super
// there's no state declaration here now! robots and searchfield are passed as props now
class App extends Component {

// no longer needs to fetch data, now can call action from this.props
    componentDidMount() {
        this.props.onRequestRobots();
    }
// onSearchChange method deleted as it's done by connect() functions

//render, deconstruction, then create filteredRobots from searchfield input
// searchField, onSearchChange and robots are now passed as props by mapStateToProps
    render () {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
// if isPending === true show Loading. Classes by tachyons. Searchbox prop value is passed
// CardList receives filteredRobots list as prop, wrapped in error boundry
        return isPending ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    };
}
// using higher order function connect() for redux, this is correct syntax
export default connect(mapStateToProps, mapDispatchToProps)(App);