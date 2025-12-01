import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Display, { truncateExpression, formatNumber, MAX_VISIBLE_CHARS } from '../Display';

describe('truncateExpression', () => {
  it('should return the full expression when shorter than MAX_VISIBLE_CHARS', () => {
    expect(truncateExpression('123+456')).toBe('123+456');
  });

  it('should return the full expression when exactly MAX_VISIBLE_CHARS', () => {
    const expr = '12345678901234'; // 14 chars
    expect(truncateExpression(expr)).toBe(expr);
  });

  it('should truncate expression to last MAX_VISIBLE_CHARS characters', () => {
    const expr = '1234567890+9876'; // 15 chars
    expect(truncateExpression(expr)).toBe('234567890+9876'); // last 14 chars
  });

  it('should handle long expressions with operators', () => {
    const expr = '1234567890+987654321'; // 20 chars
    expect(truncateExpression(expr)).toBe('7890+987654321'); // last 14 chars
  });

  it('should accept custom max chars', () => {
    expect(truncateExpression('1234567890', 5)).toBe('67890');
  });

  it('should preserve decimal points in truncation', () => {
    const expr = '123456789.123+456'; // 17 chars
    expect(truncateExpression(expr)).toBe('456789.123+456'); // last 14 chars
  });

  it('should preserve operators in truncation', () => {
    const expr = '999999999999999+1'; // 17 chars
    expect(truncateExpression(expr)).toBe('999999999999+1'); // last 14 chars
  });
});

describe('formatNumber', () => {
  it('should format single digit', () => {
    expect(formatNumber('5')).toBe('5');
  });

  it('should format number with thousands separator', () => {
    expect(formatNumber('1234')).toBe('1,234');
    expect(formatNumber('1234567')).toBe('1,234,567');
  });

  it('should preserve decimal points', () => {
    expect(formatNumber('1234.56')).toBe('1,234.56');
  });

  it('should return error messages as-is', () => {
    expect(formatNumber('Error')).toBe('Error');
    expect(formatNumber("Can't divide by 0")).toBe("Can't divide by 0");
  });

  it('should return expressions with operators as-is', () => {
    expect(formatNumber('123+456')).toBe('123+456');
    expect(formatNumber('100-50')).toBe('100-50');
    expect(formatNumber('10*5')).toBe('10*5');
    expect(formatNumber('100/2')).toBe('100/2');
  });
});

describe('MAX_VISIBLE_CHARS', () => {
  it('should be defined and have value 14', () => {
    expect(MAX_VISIBLE_CHARS).toBe(14);
  });
});

describe('Display component', () => {
  const mockTheme = {
    screenBg: 'bg-[#182034]',
    textColor: 'text-white',
  };

  it('should render expression', () => {
    render(<Display expression="123" theme={mockTheme} />);
    expect(screen.getByTestId('display-value')).toHaveTextContent('123');
  });

  it('should show full expression in aria-label', () => {
    render(<Display expression="1234567890+9876" theme={mockTheme} />);
    expect(screen.getByRole('region')).toHaveAttribute(
      'aria-label',
      'Calculator display: 1234567890+9876'
    );
  });

  it('should truncate displayed value but preserve full expression in data attribute', () => {
    const fullExpression = '1234567890+9876';
    render(<Display expression={fullExpression} theme={mockTheme} />);
    
    const displayElement = screen.getByTestId('display-value');
    expect(displayElement).toHaveAttribute('data-full-expression', fullExpression);
    expect(displayElement).toHaveTextContent('234567890+9876');
  });

  it('should show title attribute with full expression', () => {
    const fullExpression = '1234567890+987654321';
    render(<Display expression={fullExpression} theme={mockTheme} />);
    
    expect(screen.getByRole('region')).toHaveAttribute('title', fullExpression);
  });

  it('should format standalone numbers with thousands separators', () => {
    render(<Display expression="1234567" theme={mockTheme} />);
    expect(screen.getByTestId('display-value')).toHaveTextContent('1,234,567');
  });
});
