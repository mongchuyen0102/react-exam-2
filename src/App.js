import './App.scss';
import './reset.scss';

import { createBrowserHistory } from 'history';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <HashRouter
      history={createBrowserHistory({ basename: process.env.PUBLIC_URL })}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
