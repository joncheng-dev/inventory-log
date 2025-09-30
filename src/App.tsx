import { useState } from 'react';
import InventoryPage from "./pages/InventoryPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

function App() {

  return (
    <ThemeProvider>
      <InventoryPage/>
    </ThemeProvider>
  );
}

export default App;
