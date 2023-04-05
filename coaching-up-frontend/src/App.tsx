import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate, // Redirect changed to navigate
  Routes // Switch changed to routes
} from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay-ts';

import logo from './logo.svg';
import './App.css';
import Users from './User/pages/User';
import Home from './Home/pages/home';
import NewPosting from './User/pages/NewPosting';
import UpdatePosting from './User/pages/UpdatePosting';
import Auth from './User/pages/Auth';
import { MainNavigation } from './Shared/components/Navigation/MainNavigation';
import { AuthContext } from './Shared/context/AuthContext';
import { LoadingContext } from './Shared/context/LoadingContext';

function App() {
  // refactor this to be in the context file
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // cache app function between re-renders based on dependancies to remove infinite loops
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  
  // cache app function between re-renders based on dependancies to remove infinite loops
  const Loading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const isNotLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path='/:userId/listings/new' element={<NewPosting />} />
        <Route path='/:uid/listings' element={<Users />} />
        <Route path='/:userId/listings/:listingId/edit' element={<UpdatePosting />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/auth' element={<Auth />} /> 
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='*' element={<Navigate to={'/auth'} />} />
      </Routes>
    );
  }

  return (
    <LoadingContext.Provider value={{isLoading: isLoading, setLoading: Loading, setNotLoading: isNotLoading }}>
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
          <Router>
            {isLoggedIn && <MainNavigation />}
            {routes}
          </Router>
        </AuthContext.Provider>
    </LoadingContext.Provider>
  )
}

{/* <LoadingContext.Provider value={{isLoading: isLoading, setLoading: Loading, setNotLoading: isNotLoading }}>
      {isLoading ? (<LoadingOverlay className="loading-overlay" active={isLoading} spinner text="Logging you in...">
        {appBody}
      </LoadingOverlay>
      ) : (
        <>
        {appBody}
        </>
      )}
    </LoadingContext.Provider> */}

// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.tsx</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// );

export default App;
