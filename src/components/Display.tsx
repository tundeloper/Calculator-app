"use client";

// Maximum number of characters to display on the calculator screen
export const MAX_VISIBLE_CHARS = 14;

interface DisplayProps {
  expression: string;
  theme: {
    screenBg: string;
    textColor: string;
  };
}

/**
 * Truncates an expression to show only the last MAX_VISIBLE_CHARS characters.
 * This allows the calculator to accept arbitrarily long input while preventing overflow.
 */
export function truncateExpression(expression: string, maxChars: number = MAX_VISIBLE_CHARS): string {
  if (expression.length <= maxChars) {
    return expression;
  }
  return expression.slice(-maxChars);
}

/**
 * Formats a number string with thousands separators while preserving decimal points.
 */
export function formatNumber(numStr: string): string {
  if (numStr === "Error" || numStr === "Can't divide by 0") return numStr;
  
  // Check if it's an expression (contains operators) - check early for better performance
  if (/[+\-*/×÷]/.test(numStr)) {
    return numStr; // Return expressions as-is without formatting
  }
  
  const num = parseFloat(numStr);
  if (isNaN(num)) return numStr;

  const parts = numStr.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Use Number() instead of parseInt() to avoid precision loss for large numbers
  const formattedInteger = Number(integerPart).toLocaleString("en-US");

  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`;
  }
  return formattedInteger;
}

/**
 * Calculates the appropriate font size based on expression length.
 * Scales down for longer expressions to maintain readability.
 */
function getFontSize(expressionLength: number): string {
  if (expressionLength <= 8) {
    return "text-5xl";
  } else if (expressionLength <= 12) {
    return "text-4xl";
  } else if (expressionLength <= 16) {
    return "text-3xl";
  }
  return "text-2xl";
}

export default function Display({ expression, theme }: DisplayProps) {
  const displayText = truncateExpression(expression);
  const fontSize = getFontSize(displayText.length);

  return (
    <div
      className={`${theme.screenBg} ${theme.textColor} text-right p-6 rounded-lg mb-6 overflow-hidden`}
      role="region"
      aria-live="polite"
      aria-label={`Calculator display: ${expression}`}
      title={expression}
    >
      <span 
        className={`${fontSize} font-bold block truncate`}
        data-testid="display-value"
        data-full-expression={expression}
      >
        {formatNumber(displayText)}
      </span>
    </div>
  );
}
