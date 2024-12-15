

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import {UserDashboard} from './pages/UserDashBoard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import './style/App.css';

import { Provider } from 'react-redux';
import store from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      
      <Router>
      
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UserDashboard />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

