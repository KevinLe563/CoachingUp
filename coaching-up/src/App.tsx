import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate, // Redirect changed to navigate
  Routes // Switch changed to routes
} from 'react-router-dom';

import Users from './User/pages/User';
import Home from './Home/pages/home';
import { NewPosting } from './User/pages/NewPosting';
import { MainNavigation } from './Shared/components/Navigation/MainNavigation';
import logo from './logo.svg';
import './App.css';
import { EditListing } from './User/pages/EditListing';

function App() {
  return (
    <Router>
      <MainNavigation />
        <Routes>
          <Route path='/:userId/listings/new' element={<NewPosting />} />
          <Route path='/:uid/listings' element={<Users />} />
          <Route path='/:userId/listings/:listingId/edit' element={<EditListing />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
    </Router>
  )
}

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
