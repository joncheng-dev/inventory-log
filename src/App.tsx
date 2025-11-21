import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import InventoryPage from "./pages/InventoryPage";
import SignInPage from "./pages/SignInPage";
import { CatalogProvider } from './contexts/CatalogContext.tsx'
import { InventoryProvider } from './contexts/InventoryContext.tsx';
import ThemeViewerPage from "./pages/ThemeViewerPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

function App() {

  return (
    <ThemeProvider>
      <CatalogProvider>
        <InventoryProvider>          
          <Routes>
            <Route path="/" element={<InventoryPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/catalog" element={<CatalogPage view="active"/>} />
            <Route path="/catalog/archived" element={<CatalogPage view="archived"/>} />
            <Route path="/theme-viewer" element={<ThemeViewerPage />} />
          </Routes>
        </InventoryProvider>
      </CatalogProvider>
    </ThemeProvider>
  );
}

export default App;
