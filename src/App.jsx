import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { Homepage } from "./components/homepage/homepage";
import { Inspiration } from "./components/inspiration/inspiration";
import { Article1 } from "./components/article1/article1";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login/login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='article1' element={<Article1 />} />
        <Route path='inspiration' element={<Inspiration />} />
        <Route path='login' element={<Login />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
