import Header from "./components/Header/Header.tsx"
import Home from "./pages/Home/Home.tsx"
import SearchAnime from "./pages/SearchAnime/SearchAnime.tsx"
import SearchCharacter from "./pages/SearchCharacter/SearchCharacter.tsx"
import TopAnime from "./pages/TopAnime/TopAnime.tsx"

import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/search/anime" element={<SearchAnime/>} />
					<Route path="/search/character" element={<SearchCharacter />} />
					<Route path="/top" element={<TopAnime />} />
				</Routes>
			</Router>
		</QueryClientProvider>
	)
}

export default App
