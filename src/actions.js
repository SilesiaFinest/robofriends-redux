import {
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
});

//create requestRobots as a Higher Order Function to return a function
// and provide the 'second layer' with dispatch && important = to be 'caught' by react-thunk
export const requestRobots = () => (dispatch) => {
    dispatch({ type: REQUEST_ROBOTS_PENDING });
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
}
// in the case above Action is triggered ( in ComponentDidMount - App.js)  requestRobots is called
// thanks to Middleware = react-thunk it's recognised as function(HUF) so first:
// dispatch pending to reducer, it'll let you know when the promise is done and if robots were returned
// when it returns it will dispatch the success(or err) >through the reducer>update sto re>make changes