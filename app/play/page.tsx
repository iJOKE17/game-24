"use client";

import React, { useState, useEffect, useRef } from "react";
import CheckIcon from "../component/checkIcon";
import ReloadIcon from "../component/reload";
import CelebrationAnimation from "../component/CelebrationAnimation";
import ResultModal from "../component/ResultModal";
import GameTimer from "../component/GameTimer";

// Play Page: 24 Game
// ---------------------------------------------
// - Generates 4 unique random numbers (1-9)
// - Provides +, -, *, / operators
// - Users fill 4 number input boxes and 3 operator input boxes to form an expression
// - Each input box (number or operator) has a clear (×) button icon to remove its value and reselect
// - Click numbers/operators to fill slots, clear to reselect
// - "Check" button validates if the expression equals 24
// - Shows success/failure message
// - "New Game" button resets with new numbers
// ---------------------------------------------

const operatorList = ["+", "-", "*", "/"];

const Page = () => {
  function getUniqueRandomNumbers(
    count: number,
    min: number,
    max: number
  ): number[] {
    const numbers: number[] = [];
    while (numbers.length < count) {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(n)) numbers.push(n);
    }
    return numbers;
  }

  // Initialize as null so server and client render the same placeholder (avoids hydration mismatch from Math.random())
  const [numbers, setNumbers] = useState<number[] | null>(null);
  useEffect(() => {
    setNumbers(getUniqueRandomNumbers(4, 1, 9));
    gameStartTimeRef.current = Date.now();
  }, []);
  const [usedNumbers, setUsedNumbers] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [inputs, setInputs] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [operators, setOperators] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [activeSlot, setActiveSlot] = useState<{
    type: "num" | "op";
    idx: number;
  }>({ type: "num", idx: 0 });
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  const [thinkingSeconds, setThinkingSeconds] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const gameStartTimeRef = useRef<number>(Date.now());

  // Evaluate the expression
  function evaluateExpression(
    nums: (number | null)[],
    ops: (string | null)[]
  ): number | null {
    if (nums.some((n) => n === null) || ops.some((o) => o === null))
      return null;
    try {
      // Left to right evaluation: (n0 op0 n1) op1 n2 ...
      let res = nums[0]!;
      for (let i = 0; i < 3; ++i) {
        const n = nums[i + 1]!;
        const op = ops[i]!;
        if (op === "+") res += n;
        else if (op === "-") res -= n;
        else if (op === "*") res *= n;
        else if (op === "/") res /= n;
      }
      return res;
    } catch {
      return null;
    }
  }

  const handleCheck = () => {
    const elapsed = Math.round((Date.now() - gameStartTimeRef.current) / 1000);
    const val = evaluateExpression(inputs, operators);
    if (val === null) {
      setThinkingSeconds(elapsed);
      setResultMsg("Please complete the expression.");
    } else if (Math.abs(val - 24) < 1e-6) {
      setThinkingSeconds(elapsed);
      setResultMsg("🎉 Success! You made 24!");
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4100);
    } else {
      setThinkingSeconds(elapsed);
      setResultMsg(`❌ Not 24. Result: ${val}`);
    }
  };
  const handleNewGame = () => {
    const newNums = getUniqueRandomNumbers(4, 1, 9);
    setNumbers(newNums);
    setUsedNumbers([false, false, false, false]);
    setInputs([null, null, null, null]);
    setOperators([null, null, null]);
    setActiveSlot({ type: "num", idx: 0 });
    setResultMsg(null);
    setThinkingSeconds(0);
    setShowCelebration(false);
    gameStartTimeRef.current = Date.now();
    setGameKey((k) => k + 1);
  };

  // Handle number click
const handleNumberClick = (num: number, idx: number) => {
    if (usedNumbers[idx]) return;
    if (activeSlot.type !== "num") return;

    const prevNum = inputs[activeSlot.idx];
    const newInputs = [...inputs];
    newInputs[activeSlot.idx] = num;
    setInputs(newInputs);

    const newUsed = [...usedNumbers];
    newUsed[idx] = true;
    // If previous number existed, mark it as unused
    if (prevNum !== null && numbers) {
        const prevIdx = numbers.findIndex((n) => n === prevNum);
        if (prevIdx !== -1) newUsed[prevIdx] = false;
    }
    setUsedNumbers(newUsed);

    // Move to next operator slot if not last
    if (activeSlot.idx < 3) {
        setActiveSlot({ type: "op", idx: activeSlot.idx });
    }
};

  // Handle operator click
  const handleOperatorClick = (op: string) => {
    if (activeSlot.type !== "op") return;
    const newOperators = [...operators];
    newOperators[activeSlot.idx] = op;
    setOperators(newOperators);
    // Move to next number slot if not last
    if (activeSlot.idx < 3) {
      setActiveSlot({ type: "num", idx: activeSlot.idx + 1 });
    }
  };

  // Handle input slot click (to allow user to reselect)
  const handleInputSlotClick = (idx: number) => {
    setActiveSlot({ type: "num", idx });
  };

  const handleOperatorSlotClick = (idx: number) => {
    setActiveSlot({ type: "op", idx });
  };

  return (
    <main className="flex items-center justify-center bg-[#faf9f5]  ">
      <CelebrationAnimation visible={showCelebration} />
      <div className="w-full px-2 sm:px-0 flex justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 w-full max-w-2xl flex flex-col items-center">
        <p className="text-gray-500 text-center mb-6">Use all 4 numbers and 3 operators to make 24!</p>

    {/* Timer */}
        <GameTimer resetKey={gameKey} />

        {/* Available Numbers */}
        <div className="w-full bg-indigo-50 rounded-xl p-4 mb-4 flex flex-col items-center">
          <div className="text-sm font-semibold text-gray-700 mb-2">Available Numbers</div>
          <div className="flex flex-row flex-wrap gap-2 sm:gap-4 justify-center items-center">
            {(numbers ?? [0, 0, 0, 0]).map((num, idx) => (
              <button
                key={idx}
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg text-lg sm:text-2xl font-bold shadow-sm transition border-2 cursor-pointer ${
                  !numbers || usedNumbers[idx]
                    ? "bg-gray-200 border-gray-300 text-gray-400"
                    : "bg-white hover:bg-indigo-100 border-indigo-400 text-indigo-700"
                }`}
                disabled={!numbers || usedNumbers[idx]}
                onClick={() => numbers && handleNumberClick(num, idx)}
              >
                {numbers ? num : "?"}
              </button>
            ))}
          </div>
        </div>

        {/* Select Numbers & Operators */}
        <div className="w-full flex flex-row flex-wrap gap-2 sm:gap-4 mb-4 justify-center items-center">
          <div className="flex-1 bg-purple-50 rounded-xl p-4 flex flex-col items-center">
            <div className="text-sm font-semibold text-gray-700 mb-2">Select Operators</div>
            <div className="flex flex-row flex-wrap gap-2 sm:gap-4 justify-center items-center">
              {operatorList.map((op) => (
                <button
                  key={op}
                  className={
                    `w-10 h-10 sm:w-14 sm:h-14 rounded-lg font-bold flex items-center justify-center text-lg sm:text-2xl shadow-sm transition border-2 cursor-pointer ` +
                    (activeSlot.type === "op" && operators[activeSlot.idx] === op
                      ? "bg-purple-400 text-white border-purple-600"
                      : "bg-purple-200 text-purple-800 border-purple-300 hover:bg-purple-300")
                  }
                  onClick={() => handleOperatorClick(op)}
                  type="button"
                  aria-label={`Select operator ${op}`}
                >
                  {op === '*' ? '×' : op}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Build Your Expression */}
        <div className="w-full bg-indigo-50 rounded-xl p-3 sm:p-4 mb-6 flex flex-col items-center">
          <div className="text-sm font-semibold text-gray-700 mb-2">Build Your Expression</div>
          <div className="flex items-center gap-2 justify-center relative">
            {inputs.map((val, i) => (
              <React.Fragment key={i}>
                <div className="relative">
                  <input
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center border-2 rounded-lg text-xl font-bold cursor-pointer bg-white shadow-sm transition focus:outline-none ${
                      activeSlot.type === "num" && activeSlot.idx === i
                        ? "border-indigo-500 ring-2 ring-indigo-300"
                        : "border-gray-300"
                    }`}
                    value={val ?? ""}
                    readOnly
                    onClick={() => handleInputSlotClick(i)}
                    aria-label={`Number slot ${i + 1}`}
                    title={`Number slot ${i + 1}`}
                    placeholder="?"
                  />
                  {val !== null && (
                    <button
                      type="button"
                      aria-label="Clear number"
                      title="Clear number"
                      className="absolute -top-2 -right-2 bg-white rounded-full border border-gray-300 w-5 h-5 flex items-center justify-center text-xs text-gray-500 hover:bg-gray-100 shadow cursor-pointer"
                      onClick={() => {
                        // Remove number from input slot
                        const newInputs = [...inputs];
                        newInputs[i] = null;
                        setInputs(newInputs);

                        // Mark the number as unused
                        const numIdx = numbers?.findIndex(
                          (n, idx) => n === val && usedNumbers[idx]
                        );
                        if (numIdx !== undefined && numIdx !== -1) {
                          const newUsed = [...usedNumbers];
                          newUsed[numIdx] = false;
                          setUsedNumbers(newUsed);
                        }

                        // Set active slot to this input
                        setActiveSlot({ type: "num", idx: i });
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
                {i < 3 && (
                  <div className="relative flex items-center">
                    <span
                      className={`w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer select-none border-2 rounded-lg bg-white shadow-sm transition ${
                        activeSlot.type === "op" && activeSlot.idx === i
                          ? "border-purple-500 ring-2 ring-purple-300"
                          : "border-gray-300"
                      }`}
                      style={{ minWidth: "2.5rem" }}
                      onClick={() => handleOperatorSlotClick(i)}
                      aria-label={`Operator slot ${i + 1}`}
                      title={`Operator slot ${i + 1}`}
                    >
                      {operators[i] ? (operators[i] === '*' ? '×' : operators[i]) : <span className="text-gray-400 text-base">?</span>}
                    </span>
                    {operators[i] !== null && (
                      <button
                        type="button"
                        aria-label="Clear operator"
                        title="Clear operator"
                        className="absolute -top-2 -right-2 bg-white rounded-full border border-gray-300 w-5 h-5 flex items-center justify-center text-xs text-gray-500 hover:bg-gray-100 shadow"
                        onClick={() => {
                          // Remove operator from slot
                          const newOperators = [...operators];
                          newOperators[i] = null;
                          setOperators(newOperators);

                          // Set active slot to this operator
                          setActiveSlot({ type: "op", idx: i });
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Check and New Game Buttons */}
        <div className="flex flex-row flex-wrap gap-2 sm:gap-4 w-full justify-center mt-2 items-center">
          <button
            className="flex-1 min-w-[120px] sm:min-w-[160px] px-3 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-lg font-bold text-base sm:text-lg shadow hover:bg-green-600 transition cursor-pointer"
            onClick={handleCheck}
            type="button"
          >
            <span className="inline-flex items-center">
              <CheckIcon className="mr-2 w-4 h-4 sm:w-5 sm:h-5" color="#fff" />
              Check Answer
            </span>
          </button>
          <button
            className="flex-1 min-w-[120px] sm:min-w-[160px] px-3 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-lg font-bold text-base sm:text-lg shadow hover:bg-blue-600 transition cursor-pointer"
            onClick={handleNewGame}
            type="button"
          >
            <span className="inline-flex items-center">
              <ReloadIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" color="#fff" />
              New Game
            </span>
          </button>
        </div>
        </div>
      </div>

      {resultMsg && (
        <ResultModal
          message={resultMsg}
          thinkingSeconds={thinkingSeconds}
          onClose={() => setResultMsg(null)}
          onNewGame={() => { setResultMsg(null); handleNewGame(); }}
        />
      )}
    </main>
  );
};

export default Page;
