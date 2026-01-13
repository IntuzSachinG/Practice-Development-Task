// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import DashBoard from "./pages/DashBoard";
import AddTask from "./pages/AddTask";
import About from "./pages/About";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <>
      <div>
        <TaskProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/add" element={<AddTask />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </div>
    </>
  );
}

export default App;
