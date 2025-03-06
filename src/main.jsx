import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SearchApp from "./components/SearchApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <SearchApp />
  </StrictMode>
);
