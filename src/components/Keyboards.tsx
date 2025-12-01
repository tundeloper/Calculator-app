import React from 'react'

export default function Keyboards({currentTheme, inputDigit, deleteLastChar, performOperation, inputDecimal, clear, calculate}: any) {
  return (
    <div className={`${currentTheme.keypadBg} p-6 rounded-lg`}>
        <div className="grid grid-cols-4 gap-4" data-testid="calculator-keypad">
          {/* Row 1 */}
          <button
            onClick={() => inputDigit("7")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            7
          </button>
          <button
            onClick={() => inputDigit("8")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            8
          </button>
          <button
            onClick={() => inputDigit("9")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            9
          </button>
          <button
            onClick={deleteLastChar}
            className={`h-16 text-xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.functionKey}`}
          >
            DEL
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputDigit("4")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            4
          </button>
          <button
            onClick={() => inputDigit("5")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            5
          </button>
          <button
            onClick={() => inputDigit("6")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            6
          </button>
          <button
            onClick={() => performOperation("+")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            +
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputDigit("1")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            1
          </button>
          <button
            onClick={() => inputDigit("2")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            2
          </button>
          <button
            onClick={() => inputDigit("3")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            3
          </button>
          <button
            onClick={() => performOperation("-")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            -
          </button>

          {/* Row 4 */}
          <button
            onClick={inputDecimal}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            .
          </button>
          <button
            onClick={() => inputDigit("0")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            0
          </button>
          <button
            onClick={() => performOperation("/")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            /
          </button>
          <button
            onClick={() => performOperation("*")}
            className={`h-16 text-3xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.numberKey}`}
          >
            x
          </button>

          {/* Row 5 */}
          <button
            onClick={clear}
            className={`h-16 col-span-2 text-xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.functionKey}`}
          >
            RESET
          </button>
          <button
            onClick={calculate}
            className={`h-16 col-span-2 text-xl font-bold rounded-lg transition-all active:translate-y-1 ${currentTheme.equalsKey}`}
          >
            =
          </button>
        </div>
      </div>
  )
}
