"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const executeOperation = (
    currentValue: number,
    inputValue: number,
    op: string
  ): { result: number; error: boolean } => {
    switch (op) {
      case "+":
        return { result: currentValue + inputValue, error: false };
      case "-":
        return { result: currentValue - inputValue, error: false };
      case "*":
        return { result: currentValue * inputValue, error: false };
      case "/":
        if (inputValue === 0) {
          return { result: 0, error: true };
        }
        return { result: currentValue / inputValue, error: false };
      default:
        return { result: inputValue, error: false };
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operator) {
      const currentValue = parseFloat(previousValue);
      const { result, error } = executeOperation(currentValue, inputValue, operator);

      if (error) {
        setDisplay("Error");
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplay(String(result));
      setPreviousValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (!operator || previousValue === null) return;

    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);
    const { result, error } = executeOperation(currentValue, inputValue, operator);

    if (error) {
      setDisplay("Error");
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      return;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const buttonClass =
    "flex items-center justify-center text-2xl font-bold rounded-lg transition-colors";
  const numberClass = `${buttonClass} bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600`;
  const operatorClass = `${buttonClass} bg-orange-500 hover:bg-orange-600 text-white`;
  const equalClass = `${buttonClass} bg-green-500 hover:bg-green-600 text-white`;
  const clearClass = `${buttonClass} bg-red-500 hover:bg-red-600 text-white`;

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl">
      <div className="bg-gray-900 text-white text-right p-4 rounded-lg mb-4 min-h-[80px] flex items-center justify-end">
        <span className="text-4xl font-mono truncate">{display}</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <button onClick={clear} className={`${clearClass} col-span-2`}>
          C
        </button>
        <button onClick={() => performOperation("/")} className={operatorClass}>
          ÷
        </button>
        <button onClick={() => performOperation("*")} className={operatorClass}>
          ×
        </button>

        {/* Row 2 */}
        <button onClick={() => inputDigit("7")} className={numberClass}>
          7
        </button>
        <button onClick={() => inputDigit("8")} className={numberClass}>
          8
        </button>
        <button onClick={() => inputDigit("9")} className={numberClass}>
          9
        </button>
        <button onClick={() => performOperation("-")} className={operatorClass}>
          −
        </button>

        {/* Row 3 */}
        <button onClick={() => inputDigit("4")} className={numberClass}>
          4
        </button>
        <button onClick={() => inputDigit("5")} className={numberClass}>
          5
        </button>
        <button onClick={() => inputDigit("6")} className={numberClass}>
          6
        </button>
        <button onClick={() => performOperation("+")} className={operatorClass}>
          +
        </button>

        {/* Row 4 */}
        <button onClick={() => inputDigit("1")} className={numberClass}>
          1
        </button>
        <button onClick={() => inputDigit("2")} className={numberClass}>
          2
        </button>
        <button onClick={() => inputDigit("3")} className={numberClass}>
          3
        </button>
        <button onClick={calculate} className={`${equalClass} row-span-2`}>
          =
        </button>

        {/* Row 5 */}
        <button onClick={() => inputDigit("0")} className={`${numberClass} col-span-2`}>
          0
        </button>
        <button onClick={inputDecimal} className={numberClass}>
          .
        </button>
      </div>
    </div>
  );
}
