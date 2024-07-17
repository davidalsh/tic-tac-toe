import { useState } from "react";
import Square from "./components/Square";
import Refresh from "./icons/Refresh";

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [showHistory, setShowHistory] = useState(false);
  const [current, setCurrent] = useState(0);
  const gameData = history[current];
  const winnerLine = calculateWinner(gameData);
  const moves = history.slice(0, current).map((el, move) => {
    return (
      <button
        key={move}
        className="p-3 rounded-xl bg-slate-500"
        onClick={() => jumpToMove(move)}
      >
        Undo move {move + 1}
      </button>
    );
  });

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrent(0);
  }

  function jumpToMove(i) {
    setShowHistory(false);
    setHistory(history.slice(0, i + 1));
    setCurrent(i);
  }

  function handleClick(i) {
    if (gameData[i] || winnerLine.length) return;
    const nextData = gameData.slice();
    if (history.length % 2 === 1) {
      nextData[i] = "X";
    } else {
      nextData[i] = "O";
    }
    setCurrent(current + 1);
    setHistory([...history, nextData]);
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-amber-500 p-5 rounded-2xl">
        <div className="flex">
          <Square
            className="border-b-2 border-r-2"
            onClick={() => handleClick(0)}
            value={gameData[0]}
            isWinnerLineSquare={winnerLine.includes(0)}
          />
          <Square
            className="border-b-2 border-r-2"
            onClick={() => handleClick(1)}
            value={gameData[1]}
            isWinnerLineSquare={winnerLine.includes(1)}
          />
          <Square
            className="border-b-2"
            onClick={() => handleClick(2)}
            value={gameData[2]}
            isWinnerLineSquare={winnerLine.includes(2)}
          />
        </div>
        <div className="flex">
          <Square
            className="border-b-2 border-r-2"
            onClick={() => handleClick(3)}
            value={gameData[3]}
            isWinnerLineSquare={winnerLine.includes(3)}
          />
          <Square
            className="border-b-2 border-r-2"
            onClick={() => handleClick(4)}
            value={gameData[4]}
            isWinnerLineSquare={winnerLine.includes(4)}
          />
          <Square
            className="border-b-2"
            onClick={() => handleClick(5)}
            value={gameData[5]}
            isWinnerLineSquare={winnerLine.includes(5)}
          />
        </div>
        <div className="flex">
          <Square
            className="border-r-2"
            onClick={() => handleClick(6)}
            value={gameData[6]}
            isWinnerLineSquare={winnerLine.includes(6)}
          />
          <Square
            className="border-r-2"
            onClick={() => handleClick(7)}
            value={gameData[7]}
            isWinnerLineSquare={winnerLine.includes(7)}
          />
          <Square
            onClick={() => handleClick(8)}
            value={gameData[8]}
            isWinnerLineSquare={winnerLine.includes(8)}
          />
        </div>
        <div className="flex gap-2 items-center mt-5">
          <button
            onClick={resetGame}
            className="flex justify-center items-center bg-emerald-500 text-white p-3 rounded-xl shadow-xl active:shadow-inner"
          >
            <Refresh />
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex-grow font-mono bg-red-500 text-white p-3 rounded-xl shadow-xl active:shadow-inner"
          >
            history
          </button>
        </div>
        <div
          className={`text-white flex-col-reverse gap-2 bottom-0 -right-0 mt-3 justify-end ${
            showHistory ? "flex" : "hidden"
          }`}
        >
          {moves}
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return [];
}
