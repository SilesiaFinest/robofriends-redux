import React from 'react';
//Wraps around CardList.js (in App.js) adds scroll to overflowY in the list area,
// so when scroling on smaller screen the SearchBar stays visible
const Scroll = (props) => {
    return (
        <div style={{overflowY: 'scroll', border: '3px solid black', height: '800px'}} >
            {props.children}
        </div>
    );
};

export default Scroll;