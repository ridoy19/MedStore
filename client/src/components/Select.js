import React from 'react'

function Select(props) {
    return (
        <div>
            <select 
                id={props.id}
                name={props.name}
                value={props.value}
                className={props.className} 
                style={props.style}>
                {props.children}
            </select>
        </div>
    )
}

export default Select
