import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import InventoryPage from './pages/InventoryPage';
import SignInPage from './pages/SignInPage';
import ManageUsersPage from './pages/ManageUsersPage.tsx';
import { AuthProvider } from './auth/AuthContext.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import { CatalogProvider } from './contexts/CatalogContext.tsx'
import { InventoryProvider } from './contexts/InventoryContext.tsx';
import ThemeViewerPage from "./pages/ThemeViewerPage";
import { NotificationProvider } from './contexts/NotificationContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './utils/ProtectedRoute.tsx';
import "./App.css";
import UnauthorizedPage from './pages/UnauthorizedPage.tsx';

function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <NotificationProvider>
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
                    path="/admin/catalog"
                    element={
                      <ProtectedRoute requireSignIn requireAdmin>
                        <CatalogPage view="active" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/catalog/archived"
                    element={
                      <ProtectedRoute requireSignIn requireAdmin>
                        <CatalogPage view="archived" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <ProtectedRoute requireSignIn requireAdmin>
                        <ManageUsersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/theme-viewer" element={<ThemeViewerPage />} />
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />
                </Routes>
              </InventoryProvider>
            </CatalogProvider>
          </NotificationProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
