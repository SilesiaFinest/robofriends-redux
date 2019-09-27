import React from 'react';
// SearchBox uses event to pass value entered in the box to the App.js
const SearchBox = ({ searchChange }) => {
    return (
        <div className='pa2' >
            <input
            className='pa3 ba b--green bg-lightest-blue'
            type='search'
            placeholder='search robots'
            onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;