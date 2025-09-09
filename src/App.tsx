/** @jsxImportSource react */
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DoctorRegistration from './pages/DoctorRegistration';
import PatientRegistration from './pages/PatientRegistration';
import About from './pages/About';
import Contact from './pages/Contact';

class ErrorBoundary extends Component<{children: JSX.Element}, {hasError: boolean}> {
  constructor(props: {children: JSX.Element}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.error('ErrorBoundary caught an error:', error);
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error('Error details:', error);
    console.error('Component stack:', info);
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      console.log("ErrorBoundary caught an error");
      return (
        <div className="flex items-center justify-center p-5">
          <div className="text-center space-y-4 p-8 bg-red-50 rounded-lg border-2 border-red-200">
            <p className="text-red-600 text-lg font-semibold">Something went wrong</p>
            <p className="text-gray-600">We encountered an error loading this page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
            <Route path="/doctor-registration" element={<ErrorBoundary><DoctorRegistration /></ErrorBoundary>} />
            <Route path="/patient-registration" element={<ErrorBoundary><PatientRegistration /></ErrorBoundary>} />
            <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
            <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </div>
    </Router>
  );
}

export default App;