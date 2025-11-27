"use client";

import { useState } from "react";
import Keyboards from "./Keyboards";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [theme, setTheme] = useState(1);

  const formatNumber = (numStr: string): string => {
    if (numStr === "Error") return numStr;
    const num = parseFloat(numStr);
    if (isNaN(num)) return numStr;
    
    const parts = numStr.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    const formattedInteger = parseInt(integerPart).toLocaleString("en-US");
    
    if (decimalPart !== undefined) {
      return `${formattedInteger}.${decimalPart}`;
    }
    return formattedInteger;
  };

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

  const deleteLastChar = () => {
    if (display.length === 1 || display === "Error") {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
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
      setDisplay("Can't divide by 0");
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

  // Theme configurations
  const themes = {
    1: {
      bg: "bg-[#3a4764]",
      keypadBg: "bg-[#232c43]",
      screenBg: "bg-[#182034]",
      numberKey: "bg-[#eae3dc] hover:bg-[#fffffe] text-[#444b5a] shadow-[0_4px_0_#b4a597]",
      functionKey: "bg-[#647198] hover:bg-[#a2b2e1] text-white shadow-[0_4px_0_#404e72]",
      equalsKey: "bg-[#d03f2f] hover:bg-[#f96b5b] text-white shadow-[0_4px_0_#93261a]",
      textColor: "text-white",
    },
    2: {
      bg: "bg-[#e6e6e6]",
      keypadBg: "bg-[#d1cccc]",
      screenBg: "bg-[#ededed]",
      numberKey: "bg-[#e5e4e1] hover:bg-[#ffffff] text-[#35352c] shadow-[0_4px_0_#a69d91]",
      functionKey: "bg-[#378187] hover:bg-[#62b5bc] text-white shadow-[0_4px_0_#1b6066]",
      equalsKey: "bg-[#ca5502] hover:bg-[#ff8a38] text-white shadow-[0_4px_0_#893901]",
      textColor: "text-[#35352c]",
    },
    3: {
      bg: "bg-[#160628]",
      keypadBg: "bg-[#1d0934]",
      screenBg: "bg-[#1d0934]",
      numberKey: "bg-[#341c4f] hover:bg-[#6c34ac] text-[#ffe53d] shadow-[0_4px_0_#871c9c]",
      functionKey: "bg-[#58077d] hover:bg-[#bc15f4] text-white shadow-[0_4px_0_#bc15f4]",
      equalsKey: "bg-[#00e0d1] hover:bg-[#93fff8] text-[#1b2428] shadow-[0_4px_0_#6cf9f2]",
      textColor: "text-[#ffe53d]",
    },
  };

  const currentTheme = themes[theme as keyof typeof themes];

  return (
    <div className={`w-full max-w-lg mx-auto p-6 ${currentTheme.bg} rounded-lg`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${currentTheme.textColor}`}>calc</h1>
        <div className="flex items-center gap-4">
          <span className={`text-xs font-bold tracking-widest ${currentTheme.textColor}`}>THEME</span>
          <div className="flex flex-col items-center">
            <div className={`flex gap-3 text-xs mb-1 ${currentTheme.textColor}`}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <div className={`${currentTheme.keypadBg} rounded-full p-1 flex gap-1`}>
              {[1, 2, 3].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-4 h-4 rounded-full transition-colors ${
                    theme === t ? currentTheme.equalsKey.split(" ")[0] : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Display */}
      <div className={`${currentTheme.screenBg} ${currentTheme.textColor} text-right p-6 rounded-lg mb-6`}>
        <span className="text-5xl font-bold">{formatNumber(display)}</span>
      </div>

      {/* Keypad */}
      <Keyboards
        currentTheme={currentTheme}
        inputDigit={inputDigit}
        deleteLastChar={deleteLastChar}
        performOperation={performOperation}
        inputDecimal={inputDecimal}
        clear={clear}
        calculate={calculate}
      />
    </div>
  );
}
