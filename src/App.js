import './styles/global.css'
import Quizz from "./pages/Quizz";
import {HashRouter, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route index element={<Quizz />} />
          </Route>
        </Routes>
      </HashRouter>
  );
}

export default App;

/*
*

 */
