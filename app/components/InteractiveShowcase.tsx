"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Sparkles,
  Terminal as TerminalIcon,
  Cpu,
  CheckCircle2,
  Zap,
  ArrowRight,
} from "lucide-react";

// Tabelloni predefiniti
const PRESET_PUZZLES: Record<string, number[][]> = {
  facile: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  medio: [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0],
  ],
  difficile: [
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 3],
    [0, 7, 4, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 2],
    [0, 8, 0, 0, 4, 0, 0, 1, 0],
    [6, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 7, 8, 0],
    [5, 0, 0, 0, 0, 9, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 0],
  ],
};

function isValid(board: number[][], row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[startRow + r][startCol + c] === num) return false;
    }
  }
  return true;
}

function solveSudoku(board: number[][], countRef: { steps: number }): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        for (let num = 1; num <= 9; num++) {
          countRef.steps++;
          if (isValid(board, r, c, num)) {
            board[r][c] = num;
            if (solveSudoku(board, countRef)) {
              return true;
            }
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"sudoku" | "terminal">("sudoku");

  // --- STATO SUDOKU ---
  const [selectedPreset, setSelectedPreset] = useState<"facile" | "medio" | "difficile">("medio");
  const [initialBoard, setInitialBoard] = useState<number[][]>(() =>
    PRESET_PUZZLES.medio.map((r) => [...r])
  );
  const [currentBoard, setCurrentBoard] = useState<number[][]>(() =>
    PRESET_PUZZLES.medio.map((r) => [...r])
  );
  const [isSolving, setIsSolving] = useState(false);
  const [solveStats, setSolveStats] = useState<{ steps: number; timeMs: number } | null>(null);

  const loadPreset = (preset: "facile" | "medio" | "difficile") => {
    setSelectedPreset(preset);
    const newBoard = PRESET_PUZZLES[preset].map((r) => [...r]);
    setInitialBoard(newBoard.map((r) => [...r]));
    setCurrentBoard(newBoard);
    setSolveStats(null);
  };

  const handleInstantSolve = () => {
    setIsSolving(true);
    const boardCopy = currentBoard.map((r) => [...r]);
    const countRef = { steps: 0 };
    const startTime = performance.now();

    const solved = solveSudoku(boardCopy, countRef);
    const endTime = performance.now();

    if (solved) {
      setCurrentBoard(boardCopy);
      setSolveStats({
        steps: countRef.steps,
        timeMs: Math.max(0.5, Math.round((endTime - startTime) * 10) / 10),
      });
    }
    setIsSolving(false);
  };

  const handleReset = () => {
    setCurrentBoard(initialBoard.map((r) => [...r]));
    setSolveStats(null);
  };

  // --- STATO TERMINALE CLI ---
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    {
      cmd: "welcome",
      output: (
        <span className="text-zinc-400">
          Benvenuto nel terminale interattivo di Fabio Zanetti. Digita <strong className="text-indigo-400">help</strong> per visualizzare i comandi disponibili.
        </span>
      ),
    },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === "terminal") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory, activeTab]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-zinc-300">Comandi disponibili:</p>
            <p><span className="text-indigo-400 font-semibold w-24 inline-block">whoami</span> Mostra il profilo e biografia</p>
            <p><span className="text-indigo-400 font-semibold w-24 inline-block">skills</span> Elenca le competenze tecniche chiave</p>
            <p><span className="text-indigo-400 font-semibold w-24 inline-block">projects</span> Elenca i progetti principali</p>
            <p><span className="text-indigo-400 font-semibold w-24 inline-block">education</span> Voti ed esami di punta a UniBo</p>
            <p><span className="text-indigo-400 font-semibold w-24 inline-block">contact</span> Mostra email e profili social</p>
            <p><span className="text-indigo-400 font-semibold w-24 inline-block">sudo hire</span> Easter egg per reclutatori</p>
            <p><span className="text-indigo-400 font-semibold w-24 inline-block">clear</span> Pulisce lo schermo</p>
          </div>
        );
        break;

      case "whoami":
        output = "Fabio Zanetti - Studente al 2° anno di Ingegneria Informatica @ UniBo. Appassionato di sviluppo backend, architetture software e algoritmi.";
        break;

      case "skills":
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-semibold">Linguaggi:</p>
            <p>• C (30L - Gestione memoria dinamica, puntatori, strutture dati)</p>
            <p>• Java (30 - OOP, Collections, Concorrenza, Design Pattern)</p>
            <p>• Python (Scripting, automazione, data processing)</p>
            <p className="text-emerald-400 font-semibold pt-1">Strumenti:</p>
            <p>• Git, GitHub, Linux/Bash, Valgrind, GDB, VS Code</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1 text-xs">
            <p>1. <strong className="text-white">C Memory Leak Detector</strong> - Tracking dinamico heap e free orfane in C99</p>
            <p>2. <strong className="text-white">Java Sudoku Engine</strong> - Solver a backtracking con propagazione vincoli</p>
            <p>3. <strong className="text-white">Dunkest Auction Manager</strong> - Algoritmi asta e gestione rose fantabasket</p>
            <p>4. <strong className="text-white">UniBo Telegram Bot</strong> - Bot universitario per notifiche e orari</p>
          </div>
        );
        break;

      case "education":
        output = "Laurea Triennale in Ingegneria Informatica (L-8) @ Università di Bologna. Esami di punta: Informatica 1 (30 e Lode), Sistemi Software a Oggetti (30), Analisi Matematica 1 (30).";
        break;

      case "contact":
        output = "Email: fabio06ap@gmail.com | LinkedIn: fabio-zanetti-68b8a1279 | GitHub: zannaStack";
        break;

      case "sudo hire":
      case "sudo hire fabio":
        output = (
          <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            [ACCESS GRANTED] Fabio è disponibile per una collaborazione part-time (~20h/settimana)! Invia una proposta a <a href="mailto:fabio06ap@gmail.com" className="underline font-bold text-white">fabio06ap@gmail.com</a>.
          </div>
        );
        break;

      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;

      default:
        output = `Comando non riconosciuto: "${cmd}". Digita "help" per i comandi disponibili.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: terminalInput, output }]);
    setTerminalInput("");
  };

  return (
    <section id="demo-interattiva" className="space-y-8 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            <Cpu className="w-4 h-4" />
            <span>Interactive Code Playground</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Demo Interattiva dal Vivo
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl">
            Testa direttamente dal browser la logica degli algoritmi sviluppati nei progetti universitari.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("sudoku")}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "sudoku"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sudoku Solver (Java Backtracking)</span>
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "terminal"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Terminale CLI</span>
          </button>
        </div>
      </div>

      {/* CONTAINER WIDGET */}
      <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-sm card-hover-border">
        {activeTab === "sudoku" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sinistra: Griglia Sudoku 9x9 */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="inline-block p-2 sm:p-3 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-2xl">
                <div className="grid grid-cols-9 gap-[1px] sm:gap-[2px] bg-zinc-800 border-2 border-zinc-700/80 rounded-xl overflow-hidden p-[2px]">
                  {currentBoard.map((row, rIdx) =>
                    row.map((val, cIdx) => {
                      const isInitial = initialBoard[rIdx][cIdx] !== 0;
                      const borderBottom = (rIdx + 1) % 3 === 0 && rIdx !== 8 ? "border-b-2 border-b-zinc-600" : "";
                      const borderRight = (cIdx + 1) % 3 === 0 && cIdx !== 8 ? "border-r-2 border-r-zinc-600" : "";

                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center text-xs sm:text-base font-mono font-semibold transition-colors bg-zinc-900/90 ${borderBottom} ${borderRight} ${
                            isInitial
                              ? "text-zinc-100 font-bold bg-zinc-900"
                              : val !== 0
                              ? "text-indigo-400 font-bold bg-indigo-950/30"
                              : "text-zinc-600"
                          }`}
                        >
                          {val !== 0 ? val : ""}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Statistiche esecuzione */}
              {solveStats && (
                <div className="mt-4 flex items-center gap-4 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl animate-in fade-in duration-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Risolto in <strong>{solveStats.timeMs} ms</strong> ({solveStats.steps.toLocaleString()} nodi ricorsivi esplorati)</span>
                </div>
              )}
            </div>

            {/* Destra: Controlli e Spiegazione dell'algoritmo */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Algoritmo di Risoluzione Ricorsivo</span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Questa demo riproduce in TypeScript la logica del progetto <strong className="text-zinc-200">Java Sudoku Engine</strong>: un algoritmo di soddisfacimento vincoli a **backtracking ricorsivo** con potatura dello spazio degli stati.
                </p>
              </div>

              {/* Scelta livello puzzle */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Seleziona Difficoltà Schema
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["facile", "medio", "difficile"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => loadPreset(level)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium capitalize border transition-all ${
                        selectedPreset === level
                          ? "bg-zinc-800 border-indigo-500/60 text-indigo-300"
                          : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pulsanti di Azione */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleInstantSolve}
                  disabled={isSolving}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-xs transition-all shadow-md shadow-indigo-600/30 cursor-pointer active:scale-95"
                >
                  <Zap className="w-4 h-4" />
                  <span>Risolvi Subito</span>
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 text-xs font-medium transition-all cursor-pointer"
                  title="Ripristina schema originale"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Link alla scheda completa del progetto */}
              <div className="pt-4 border-t border-zinc-800/80">
                <Link
                  href="/progetti/java-sudoku-engine"
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium group"
                >
                  <span>Approfondisci il codice sorgente nel progetto Java</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Scheda Terminale CLI */
          <div className="rounded-xl border border-zinc-800 bg-[#0d0f17] overflow-hidden shadow-2xl">
            {/* Header Terminale macOS/Linux style */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#16161e] border-b border-zinc-800/80 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="ml-2 font-mono text-[11px] text-zinc-400">fabio@unibo:~</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">bash 5.2</span>
            </div>

            {/* Contenuto Terminale */}
            <div className="p-4 sm:p-6 font-mono text-xs space-y-3 min-h-[280px] max-h-[360px] overflow-y-auto">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <span className="text-emerald-400">fabio@unibo</span>
                    <span className="text-zinc-600">:</span>
                    <span className="text-zinc-400">~</span>
                    <span className="text-zinc-600">$</span>
                    <span className="text-white font-medium">{item.cmd}</span>
                  </div>
                  <div className="text-zinc-300 leading-relaxed pl-4">
                    {item.output}
                  </div>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Line */}
            <form
              onSubmit={handleTerminalSubmit}
              className="flex items-center gap-2 px-4 py-3 bg-[#13151f] border-t border-zinc-800 text-xs font-mono"
            >
              <span className="text-emerald-400">fabio@unibo</span>
              <span className="text-zinc-600">:</span>
              <span className="text-zinc-400">~</span>
              <span className="text-zinc-600">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="digita un comando (es. 'skills', 'projects', 'help')..."
                className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-600"
                autoFocus={activeTab === "terminal"}
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] transition-colors"
              >
                Invio
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
