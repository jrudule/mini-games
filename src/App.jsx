import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import "./App.css";

import RPS from "./games/RPS";
import Snake from "./games/Snake";

import DCA from "./games/2048/App";
import MemoryCards from "./games/memory-cards/App";
import Sudoku from "./games/sudoku/App";
import TicTacToe from "./games/tic tac toe/App";

function App() {
  const location = useLocation();

  // Check if the user is on the home route ("/")
  const isHome = location.pathname === "/";

  return (
    <div>
      {/* Show the links only on the home route */}
      {isHome ? (
        <nav>
          <ul className="links">
            <li className="rps"><Link to="/rps">Rock Paper Scissors</Link></li>
            <li className="snake"><Link to="/snake">Snake</Link></li>
            <li className="dca"><Link to="/2048">2048</Link></li>
            <li className="mc"><Link to="/memory-cards">Memory Cards</Link></li>
            <li className="sudoku"><Link to="/sudoku">Sudoku</Link></li>
            <li className="ttt"><Link to="/tic-tac-toe">Tic Tac Toe</Link></li>
          </ul>
        </nav>
      ) : (
        // Show the Home button when not on the home route
        <div style={{ position: "fixed", top: 1, left: 1, background: "#9a0d4a", padding: "5px 7px 0", borderRadius: "5px" ,  }}>
          <Link to="/" style={{ textDecoration: "none", color: "white"}}>
            <HomeIcon />
          </Link>
        </div>
      )}

      <Routes>
        <Route path="/rps" element={<RPS />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/2048" element={<DCA />} />
        <Route path="/memory-cards" element={<MemoryCards />} />
        <Route path="/sudoku" element={<Sudoku />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
      </Routes>
    </div>
  );
}

export default App;
