import { Article2 } from "./components/article2/article2"

import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Homepage } from "./components/homepage/homepage"
import { Inspiration } from "./inspriration/inspiration"



function App() {
  

  return (
    <BrowserRouter> 
     <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="article2" element={<Article2/>}/>
      <Route path="inspiration" element={<Inspiration/>}/>
     </Routes>
     
    </BrowserRouter>
  )
}

export default App
