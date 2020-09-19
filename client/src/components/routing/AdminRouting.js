import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';

function AdminRouting({component: Component, ...rest}) {
    const authContext = useContext(AuthContext);
    return (<Route {...rest} render={props => (
        authContext.userState.isAuthenticated && authContext.userState.user.isAdmin === 1 ? (
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

export default AdminRouting
