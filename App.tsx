import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Home from './pages/Home'
import ResumeEditor from './pages/ResumeEditor'
import Pricing from './pages/Pricing'
import { AuthProvider } from './contexts/AuthContext'
import { SubscriptionProvider } from './contexts/SubscriptionContext'
import { AdSenseService } from './services/monetization'
import './App.css'

// Initialize AdSense
if (typeof window !== 'undefined') {
  AdSenseService.getInstance().initialize()
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SubscriptionProvider>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resume-editor" element={<ResumeEditor />} />
                <Route path="/pricing" element={<Pricing />} />
              </Routes>
            </main>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </SubscriptionProvider>
      </AuthProvider>
    </Router>
  )
}

export default App 