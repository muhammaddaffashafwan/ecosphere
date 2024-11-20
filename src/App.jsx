import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Login } from "./components/login/login";
import { Homepage } from './components/homepage/homepage';
import { Inspiration } from './components/inspiration/inspiration';
import { Inspiration2 } from "./components/inpiration2/inspiration2";
import { Article2 } from './components/article2/article2';
import { Article1 } from './components/article1/article1';
import Property from "./page/property/Property";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import { Signup } from './components/signup/signup';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  const showFooter = 
    location.pathname.toLowerCase() !== '/login' && 
    location.pathname.toLowerCase() !== '/signup';

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
        <Route path="signup" element={<Signup />} />
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
