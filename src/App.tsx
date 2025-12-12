import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import InventoryPage from "./pages/InventoryPage";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from './contexts/AuthContext.tsx';
import { CatalogProvider } from './contexts/CatalogContext.tsx'
import { InventoryProvider } from './contexts/InventoryContext.tsx';
import ThemeViewerPage from "./pages/ThemeViewerPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from './utils/ProtectedRoute.tsx';
import "./App.css";
import UnauthorizedPage from './pages/UnauthorizedPage.tsx';

function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <CatalogProvider>
          <InventoryProvider>          
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route
                path="/inventory"
                element={
                  <ProtectedRoute requireSignIn>
                    <InventoryPage />
                  </ProtectedRoute>

                }
              />
              <Route
                path="/catalog"
                element={
                  <ProtectedRoute requireSignIn requireAdmin>
                    <CatalogPage view="active" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/catalog/archived"
                element={
                  <ProtectedRoute requireSignIn requireAdmin>
                    <CatalogPage view="archived" />
                  </ProtectedRoute>
                }
              />
              <Route path="/theme-viewer" element={<ThemeViewerPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Routes>
          </InventoryProvider>
        </CatalogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
