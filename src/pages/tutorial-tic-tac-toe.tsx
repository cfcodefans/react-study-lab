import React, { JSX, MouseEventHandler, ReactNode, useState } from "react"

function Square({
  value,
  onSquareClick,
}: {
  value: ReactNode
  onSquareClick: MouseEventHandler
}): JSX.Element {
  return (
    <button
      onClick={onSquareClick}
      className="bg-slate-400 w-[3rem] h-[3rem] rounded-lg"
    >
      {value}
    </button>
  )
}

function calculateWinner(squares: string[]): string | null {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean
  squares: string[]
  onPlay: (ns: string[]) => void
}): JSX.Element {
  function handleClick(i: number): void {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares: string[] = squares.slice()
    nextSquares[i] = xIsNext ? "X" : "O"
    onPlay(nextSquares)
  }

  let status: string = ""
  const winner: string = calculateWinner(squares)
  if (winner) {
    status = "winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return <div className="flex flex-col">
    <div className="w-full">{status}</div>
    <div className="grid grid-cols-3 gap-2">
      {squares.map((s, i) => {
        return (
          <Square key={i} value={s} onSquareClick={() => handleClick(i)} />
        )
      })}
    </div>
  </div>
}

function HistoryPane({
  moves,
  jumpTo,
}: {
  moves: number[]
  jumpTo: (number) => void
}): JSX.Element {
  return <ol>
    {moves.map((move) => {
      const description: string =
        move > 0 ? `Go to move #${move}` : "go to start#"
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      )
    })}
  </ol>
}

export default function Game(): JSX.Element {
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState<number>(0)

  const xIsNext: boolean = currentMove % 2 === 0
  const currentSquares: string[] = history[currentMove]

  function handlePlay(nextSquares: string[]): void {
    const nextHistory: string[][] = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  return <>
    <a href="https://react.dev/learn/tutorial-tic-tac-toe" target="_blank">
      https://react.dev/learn/tutorial-tic-tac-toe
    </a>
    <div className="flex flex-row gap-4">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <HistoryPane moves={history.map((h, i) => i)} jumpTo={setCurrentMove} />
    </div>
  </>
}
