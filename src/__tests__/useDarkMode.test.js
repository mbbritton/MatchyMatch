import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

function wrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    delete document.documentElement.dataset.theme;
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    delete document.documentElement.dataset.theme;
  });

  it('should initialize from localStorage if available', () => {
    localStorage.setItem('puzzlr-theme', 'dark');
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('dark');
    expect(result.current.dark).toBe(true);
  });

  it('should migrate the legacy boolean storage key', () => {
    localStorage.setItem('puzzlr-dark-mode', 'true');
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('dark');
  });

  it('should default to system when nothing is stored', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('system');
  });

  it('should switch themes', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('midnight');
    });

    expect(result.current.theme).toBe('midnight');
    expect(result.current.dark).toBe(true);
  });

  it('should persist the theme to localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('light');
    });

    expect(localStorage.getItem('puzzlr-theme')).toBe('light');
  });

  it('should add the dark class and data-theme attribute for dark themes', () => {
    localStorage.setItem('puzzlr-theme', 'midnight');
    renderHook(() => useTheme(), { wrapper });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.dataset.theme).toBe('midnight');
  });

  it('should remove the dark class for the light theme', () => {
    localStorage.setItem('puzzlr-theme', 'light');
    renderHook(() => useTheme(), { wrapper });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
