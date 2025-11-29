import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MemberPage from "./pages/MemberPage.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/member/:id" element={<MemberPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
