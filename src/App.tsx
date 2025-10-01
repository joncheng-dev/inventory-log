import { Routes, Route } from 'react-router-dom';
import InventoryPage from "./pages/InventoryPage";
import SignInPage from "./pages/SignInPage";
import ThemeViewerPage from "./pages/ThemeViewerPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

function App() {

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/theme-viewer" element={<ThemeViewerPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
