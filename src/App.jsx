import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Login } from "./page/login/login";
import { Homepage } from './page/homepage/homepage';
import { Inspiration } from './page/inspiration/inspiration';
import { Inspiration2 } from "./page/inpiration2/inspiration2";
import { Article2 } from './page/article2/article2';
import { Article1 } from './page/article1/article1';
import Property from "./page/property/Property";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import { Forum1 } from "./page/forum1/forum1";
import { Forum2 } from "./page/forum2/forum2";
import { Profile } from "./page/profile/profile";
import { ForgotPassword } from "./page/forgotPassword/forgotpassword";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Menentukan apakah Footer harus ditampilkan (bukan pada halaman login)
  const showFooter = location.pathname !== '/login';

  return (
    <>
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
        <Route path="forum2" element={<Forum2 />} />
        <Route path="profile" element={<Profile />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Routes>

      {/* Footer hanya ditampilkan jika bukan halaman login */}
      {showFooter && <Footer />}
    </>
  );
}

export default App;




// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Navbar } from './components/navbar/navbar';
// import { Footer } from './components/footer/footer';
// import { Login } from "./components/login/login";
// import { Homepage } from './components/homepage/homepage';
// import { Inspiration } from './components/inspiration/inspiration';
// import { Inspiration2 }  from "./components/inpiration2/inspiration2";
// import { Article2 } from './components/article2/article2';
// import { Article1 } from './components/article1/article1';
// import Property from "./page/property/Property";
// import ProductDetail from "./page/ProductDetail/ProductDetail";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="login" element={<Login />} />
//         <Route path="inspiration" element={<Inspiration />} />
//         <Route path="inspiration2" element={<Inspiration2 />} />
// 				<Route path="article1" element={<Article1 />} />
//         <Route path="article2" element={<Article2 />} />
//         <Route path="/products/:slug" element={<ProductDetail />} />
//         <Route path="property" element={<Property />} />
//       </Routes>

//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;
