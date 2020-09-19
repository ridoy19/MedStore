import React, {createContext, useReducer} from 'react';
import './App.css';
// import Routing from './components/routing/Routing';
import SideNav from './components/SideNav'
import { CartProvider } from './context/CartContext';
//import { initialState } from './Reducers/CartReducers';
import { reducer, initialState } from './Reducers/AuthReducer';
export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ userState: state, userDispatch: dispatch }}>

      <div className="App">
        {/* <Routing /> */}

        {/* <CartProvider initialState={ initialState }> */}
          <SideNav />
        {/* </CartProvider> */}

      </div>
    </AuthContext.Provider>

  );
}

export default App;
