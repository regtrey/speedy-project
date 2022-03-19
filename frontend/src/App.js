import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CarScreen from './screens/CarScreen';
import CarDetailsScreen from './screens/CarDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/cars/:id" component={CarDetailsScreen} exact />
        <Route path="/profile/:id" component={ProfileScreen} exact />
        <Route path="/cars" component={CarScreen} exact />
        <Route path="/signup" component={SignupScreen} exact />
        <Route path="/login" component={LoginScreen} exact />

        <Route path="/" component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
