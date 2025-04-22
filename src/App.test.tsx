import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
    it('renders the main table component', () => {
        render(<App />);
        expect(screen.getByRole('table')).toBeInTheDocument();
    });
});