import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import About from "./pages/About";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;