import React from 'react';
import Card from './Card';
//CardList maps over robots list passed from the App.js as props, and passes {name,email,id} to Card.js
// when added SearchBox const filteredRobots is being passed to filter. ALWAYS ADD KEY!
// Single card designed in Card.js
const CardList = ({ robots }) => {
    return (
        <div>
            {
                robots.map((user, i) => {
                    return (
                        <Card
                            key={robots[i].id}
                            id={robots[i].id}
                            name={robots[i].name}
                            email={robots[i].email} />
                    );
                })
            }
        </div>
    );
}

export default CardList;