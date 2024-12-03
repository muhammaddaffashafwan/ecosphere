import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Login } from './page/login/login';
import { Homepage } from './page/homepage/homepage';
import { Inspiration } from './page/inspiration/inspiration';
import { Inspiration2 } from './page/inpiration2/inspiration2';
import { Article2 } from './page/article2/article2';
import { Article1 } from './page/article1/article1';
import Property from "./page/property/Property";
import ProductDetail from './page/ProductDetail/ProductDetail';
import { Forum1 } from './page/forum1/forum1';
import { Forum2 } from './page/forum2/forum2';
import Profile from "./page/profile/profile";
import { ForgotPassword } from './page/forgotPassword/forgotpassword';
import { Signup } from './page/signup/signup';
import ForumPost from './components/ForumPost/ForumPost';
import Modal from './components/Modal/Modal';
import { useState } from 'react';
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  console.log('Current location:', location.pathname); // Log current route

  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const showFooter = location.pathname.toLowerCase() !== '/login' && location.pathname.toLowerCase() !== '/signup' && location.pathname.toLowerCase() !== '/forgotpassword';

  // Function to handle closing of the modal
  const handleModalClose = () => {
    console.log('Modal closed');
    setIsModalOpen(false);
  };

  return (
    <>
      <AuthProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="inspiration" element={<Inspiration />} />
        <Route path="inspiration2" element={<Inspiration2 />} />
        <Route path="article1" element={<Article1 />} />
        <Route path="article2" element={<Article2 />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="property" element={<Property />} />
        <Route path="forum1" element={<Forum1 />} />
        <Route path="forum2/:postId" element={<Forum2 />} />
        <Route path="profile" element={<Profile />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forum1/:id" element={<ForumPost />} />
      </Routes>

      {/* Conditionally show Modal based on isModalOpen */}
      {isModalOpen && <Modal onClose={handleModalClose} />}

      {/* Footer only shown if not on login, signup, or forgotpassword page */}
      {showFooter && <Footer />}
      </AuthProvider>
    </>
  );
}

export default App;
