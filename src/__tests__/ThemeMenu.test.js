import { render, screen, fireEvent } from '@testing-library/react';
import ThemeMenu from '../components/ThemeMenu';
import { ThemeProvider } from '../contexts/ThemeContext';

function renderMenu() {
  return render(
    <ThemeProvider>
      <ThemeMenu />
    </ThemeProvider>
  );
}

describe('ThemeMenu', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    delete document.documentElement.dataset.theme;
  });

  it('should render a trigger button', () => {
    renderMenu();
    expect(screen.getByRole('button', { name: 'Choose theme' })).toBeInTheDocument();
  });

  it('should open a menu with all theme options when clicked', () => {
    renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Choose theme' }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
    ['System', 'Light', 'Dark', 'Midnight'].forEach((label) => {
      expect(screen.getByRole('menuitemradio', { name: new RegExp(label) })).toBeInTheDocument();
    });
  });

  it('should mark the active theme as checked', () => {
    localStorage.setItem('puzzlr-theme', 'dark');
    renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Choose theme' }));

    expect(screen.getByRole('menuitemradio', { name: /Dark/ })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('menuitemradio', { name: /Light/ })).toHaveAttribute('aria-checked', 'false');
  });

  it('should switch themes and close the menu on selection', () => {
    renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Choose theme' }));
    fireEvent.click(screen.getByRole('menuitemradio', { name: /Midnight/ }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe('midnight');
    expect(localStorage.getItem('puzzlr-theme')).toBe('midnight');
  });

  it('should close the menu when clicking outside', () => {
    renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Choose theme' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
