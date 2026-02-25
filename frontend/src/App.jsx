import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/notes/new" element={<ProtectedRoute><CreateNote /></ProtectedRoute>}/>
        <Route path="/notes/:id/edit" element={<ProtectedRoute><EditNote /></ProtectedRoute>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;