import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Homepage } from './components/homepage/homepage';
import { Inspiration } from './components/inspiration/inspiration';
import { Article2 } from './components/article2/article2';
import { Article1 } from './components/article1/article1';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/Product/ProductPage';
import { UserProvider } from './context/UserContext';
import ProductDetail from './pages/Product/ProductDetail/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="article1" element={<Article1 />} />
        <Route path="inspiration" element={<Inspiration />} />
        <Route path="inspiration2" element={<Inspiration2 />} />
        <Route path="login" element={<Login />} />
        <Route path="article2" element={<Article2 />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/roductPage" element={<ProductPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
