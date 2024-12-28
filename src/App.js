import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress });
    if (progress === 100) {
      setTimeout(() => this.setState({ progress: 0 }), 500);
    }
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
           color='#f11946'
           progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress}  key="general"country="us" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress}  key="business"country="us" category="business" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress}  key="general"country="us" category="general" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment"country="us" category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress}  key="health"country="us" category="health" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports"country="us" category="sports" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress}  key="science"country="us" category="science" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress}  key="technology"country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
