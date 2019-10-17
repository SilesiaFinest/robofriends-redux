import React, { Component } from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
// import action for redux
import { setSearchField } from '../actions';

//define functions to be used by connect(), this is default syntax to be used in future!
const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

//state declaration, searchfield already deleted
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: []
        }
    }
//use DiDMount to fetch users data from web and pass it to the robots > then to filter and CardList
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users}));
    }
// onSearchChange method deleted as it's done by connect() functions

//render, deconstruction, then create filteredRobots from searchfield input
// searchField and onSearchChange passed to props by mapStateToProps
    render () {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
// if robots.lenght=0 show Loading. Classes by tachyons. Searchbox prop value is passed
// CardList receives filteredRobots list as prop, wrapped in error boundry
        return !robots.length ?
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