
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";
import { DecksPage } from "./pages/DecksPage";
import DeckPage from "./pages/DeckPage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/decks" element={<DecksPage/>}/>
        <Route path="/decks/:id" element={<DeckPage />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
