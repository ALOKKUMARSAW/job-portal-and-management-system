import './App.css';
import AllPosts from './components/AllPosts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './components/Create';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import JobDetails from './components/JobDetails';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<AllPosts/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/job-details" element={<JobDetails />} />
            <Route 
              path="/create" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <Create />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <Edit />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
