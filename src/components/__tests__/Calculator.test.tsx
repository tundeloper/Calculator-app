import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Calculator, { MAX_VISIBLE_CHARS } from '../Calculator';

describe('Calculator Display Truncation', () => {
  // Helper function to click a keypad button
  const clickKeypadButton = (container: HTMLElement, value: string) => {
    const keypad = container.querySelector('.grid.grid-cols-4') as HTMLElement;
    const button = within(keypad).getByText(value);
    fireEvent.click(button);
  };

  it('should export MAX_VISIBLE_CHARS constant', () => {
    expect(MAX_VISIBLE_CHARS).toBe(14);
  });

  it('should display short expressions without truncation', () => {
    const { container } = render(<Calculator />);
    
    // Enter a short expression: 123
    clickKeypadButton(container, '1');
    clickKeypadButton(container, '2');
    clickKeypadButton(container, '3');
    
    // The display should show "123"
    const display = screen.getByLabelText(/calculator display/i);
    expect(display).toHaveTextContent('123');
  });

  it('should show operators in the expression', () => {
    const { container } = render(<Calculator />);
    
    // Enter: 5 + 3
    clickKeypadButton(container, '5');
    clickKeypadButton(container, '+');
    clickKeypadButton(container, '3');
    
    // The display should show the expression with the operator
    const display = screen.getByLabelText(/calculator display/i);
    expect(display).toHaveTextContent('5+3');
  });

  it('should truncate long expressions to MAX_VISIBLE_CHARS', () => {
    const { container } = render(<Calculator />);
    
    // Build a long expression: 12345678901234567890
    const digits = '12345678901234567890';
    for (const digit of digits) {
      clickKeypadButton(container, digit);
    }
    
    // The display should show only the last MAX_VISIBLE_CHARS characters
    const display = screen.getByLabelText(/calculator display/i);
    const visibleText = display.querySelector('span')?.textContent;
    expect(visibleText?.length).toBeLessThanOrEqual(MAX_VISIBLE_CHARS);
    expect(visibleText).toBe(digits.slice(-MAX_VISIBLE_CHARS));
  });

  it('should preserve full expression in aria-label for accessibility', () => {
    const { container } = render(<Calculator />);
    
    // Build a long expression
    const digits = '12345678901234567890';
    for (const digit of digits) {
      clickKeypadButton(container, digit);
    }
    
    // The aria-label should contain the full expression
    const display = screen.getByLabelText(/calculator display/i);
    expect(display.getAttribute('aria-label')).toContain(digits);
  });

  it('should preserve full expression in title attribute', () => {
    const { container } = render(<Calculator />);
    
    // Build a long expression
    const digits = '12345678901234567890';
    for (const digit of digits) {
      clickKeypadButton(container, digit);
    }
    
    // The title should contain the full expression
    const display = screen.getByLabelText(/calculator display/i);
    expect(display.getAttribute('title')).toBe(digits);
  });

  it('should truncate expression with operators correctly', () => {
    const { container } = render(<Calculator />);
    
    // Build: 1234567890+987654321 - this is 21 chars
    const firstNumber = '1234567890';
    for (const digit of firstNumber) {
      clickKeypadButton(container, digit);
    }
    clickKeypadButton(container, '+');
    
    const secondNumber = '987654321';
    for (const digit of secondNumber) {
      clickKeypadButton(container, digit);
    }
    
    const fullExpression = '1234567890+987654321';
    const expectedVisible = fullExpression.slice(-MAX_VISIBLE_CHARS);
    
    // The display should show the last 14 chars
    const display = screen.getByLabelText(/calculator display/i);
    const visibleText = display.querySelector('span')?.textContent;
    expect(visibleText).toBe(expectedVisible);
    
    // Full expression should be in aria-label
    expect(display.getAttribute('aria-label')).toContain(fullExpression);
  });

  it('should reset expression on clear', () => {
    const { container } = render(<Calculator />);
    
    // Enter some digits
    clickKeypadButton(container, '1');
    clickKeypadButton(container, '2');
    clickKeypadButton(container, '3');
    
    // Clear
    clickKeypadButton(container, 'RESET');
    
    // Display should show "0"
    const display = screen.getByLabelText(/calculator display/i);
    expect(display).toHaveTextContent('0');
    expect(display.getAttribute('aria-label')).toBe('Calculator display: 0');
  });

  it('should use × symbol for multiplication', () => {
    const { container } = render(<Calculator />);
    
    clickKeypadButton(container, '5');
    clickKeypadButton(container, 'x'); // x button for multiply
    clickKeypadButton(container, '3');
    
    const display = screen.getByLabelText(/calculator display/i);
    expect(display).toHaveTextContent('5×3');
  });

  it('should use ÷ symbol for division', () => {
    const { container } = render(<Calculator />);
    
    clickKeypadButton(container, '8');
    clickKeypadButton(container, '/'); 
    clickKeypadButton(container, '2');
    
    const display = screen.getByLabelText(/calculator display/i);
    expect(display).toHaveTextContent('8÷2');
  });
});
