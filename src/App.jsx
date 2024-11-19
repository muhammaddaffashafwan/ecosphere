import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { Homepage } from "./components/homepage/homepage";
import { Inspiration } from "./inspriration/inspiration";
import { Article2 } from "./components/article2/article2";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='article1' element={<Article1 />} />
        <Route path='inspiration' element={<Inspiration />} />
        <Route path='inspiration2' element={<Inspiration2 />} />
        <Route path='login' element={<Login />} />
        <Route path='article2' element={<Article2 />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
