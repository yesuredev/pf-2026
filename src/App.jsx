import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route
        path="/career"
        element={<div style={{ padding: 40 }}>Career page</div>}
      />
      <Route
        path="/study"
        element={<div style={{ padding: 40 }}>Study page</div>}
      />
    </Routes>
  );
}

export default App;
