import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";

import { Homepage } from "./components/homepage/homepage";
import { Inspiration } from "./inspriration/inspiration";
import { Article2 } from "./components/article2/article2";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="article2" element={<Article2 />} />
				<Route path="inspiration" element={<Inspiration />} />
			</Routes>

			<Footer />
		</BrowserRouter>
	);
}

export default App;