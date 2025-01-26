import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Auth } from "./routs/auth";
import { AuthProvider } from "./contextApi";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Auth />
        <ToastContainer position="bottom-left" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
