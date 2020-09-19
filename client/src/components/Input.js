import React from 'react';

const Input = (props) => {
    return (
        <React.Fragment>
            <input 
                className={props.className}
                type={props.type} 
                style={props.style}
                name={props.name}
                value={props.value}
                id={props.id}
                disabled={props.disabled}
                onChange={props.onChange}
                placeholder={props.placeholder}
                />
        </React.Fragment>
    )
}

export default Input;