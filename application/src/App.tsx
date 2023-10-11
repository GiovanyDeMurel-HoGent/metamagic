
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";
import { DecksPage } from "./pages/DecksPage";
import DeckPage from "./pages/DeckPage";
import { DeckProvider } from "./features/decks/context/DeckContext";


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/decks" element={<DecksPage/>}/>

        <Route path="/decks/:id" element={
              <DeckProvider>
            <DeckPage/>
            </DeckProvider>
        //   <DeckContext.Provider
        //   value={{
        //     deck,
        //     setDeck,
        //     cards,
        //     setCards,
        //     selectedCard,
        //     setSelectedCard,
        //     selectedSearchCard,
        //     setSelectedSearchCard,
        //   }}
        // >
        //   <DeckPage />
        // </DeckContext.Provider>
        }/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
