import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';

function GuardedRouting({component: Component, ...rest}) {
    const authContext = useContext(AuthContext);
    return (<Route {...rest} render={props => (
        authContext.userState.isAuthenticated ? (
            <Component  {...props} />
            
        ) : (
            <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
               }}
            />
            )
        )} 
    />
    )
}

export default GuardedRouting
