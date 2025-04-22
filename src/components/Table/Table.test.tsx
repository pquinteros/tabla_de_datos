import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi, Mock } from 'vitest';
import '@testing-library/jest-dom'
import Table from './Table';
import api from '@api/axios';

// Mock API calls

vi.mock('@api/axios', () => ({
    default: {
        get: vi.fn(() => Promise.resolve({ 
            data: [
                { id: 1, title: 'Product 1', price: '100' },
                { id: 2, title: 'Product 2', price: '200' }
            ]
        })),
        delete: vi.fn()
    }
}));
  

describe('Table Component', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        render(<Table />);
    });

    it('fetches and displays products', async () => {
        // Verify API call
        expect(api.get).toHaveBeenCalledWith('/products');
        // Verify products are displayed
        expect(await screen.findByText('Product 1')).toBeInTheDocument();
        expect(await screen.findByText('Product 2')).toBeInTheDocument();
    });

    it('filters products based on search input', async () => {
        const searchInput = screen.getByPlaceholderText('Search');
        
        fireEvent.change(searchInput, { target: { value: 'Product 1' } });
        
        expect(await screen.findByText('Product 1')).toBeInTheDocument();
        expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
    });

    it('renders the search input', () => {
        // Assert that the search input is rendered
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    it('confirms and deletes a product', async () => {
        vi.spyOn(window, 'confirm').mockReturnValue(true);
        
        const deleteButtons = await screen.findAllByRole('button', { name: /eliminar/i });
        const firstProductDeleteButton = deleteButtons[0];
        fireEvent.click(firstProductDeleteButton);

        expect(window.confirm).toHaveBeenCalled();
        expect(api.delete).toHaveBeenCalledWith('/products/1');
    });

    it('does not delete when user cancels confirmation', async () => {
        vi.spyOn(window, 'confirm').mockReturnValue(false);
        
        const deleteButtons = await screen.findAllByRole('button', { name: /eliminar/i });
        const firstProductDeleteButton = deleteButtons[0];
        fireEvent.click(firstProductDeleteButton);

        expect(window.confirm).toHaveBeenCalled();
        expect(api.delete).not.toHaveBeenCalled();
    });

    it('renders table headers', () => {
        expect(screen.getByText('Nombre')).toBeInTheDocument();
        expect(screen.getByText('Precio')).toBeInTheDocument();
        expect(screen.getByText('Acciones')).toBeInTheDocument();
    });

    it('handles API error when deleting product', async () => {
        // Setup mocks
        vi.spyOn(window, 'confirm').mockReturnValue(true);
        (api.delete as Mock).mockRejectedValueOnce(new Error('Delete Error'));
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        // Render and get delete button
        const deleteButtons = await screen.findAllByRole('button', { name: /eliminar/i });
        const firstProductDeleteButton = deleteButtons[0];
        
        // Trigger delete
        fireEvent.click(firstProductDeleteButton);
        
        // Assert error handling
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Error al eliminar producto:', expect.any(Error));
        });
        
        // Clean up
        consoleSpy.mockRestore();
    });

    it('handles API error when fetching products', async () => {
        // Clean up previous renders and mocks
        vi.clearAllMocks();
        
        // Setup API error mock
        (api.get as Mock).mockRejectedValueOnce(new Error('API Error'));
        
        // Setup console spy
        const consoleSpy = vi.spyOn(console, 'error');
        
        // Render component
        render(<Table />);
        
        // Wait for and verify error handling
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalled();
            expect(consoleSpy.mock.calls[0][0]).toBe('Error fetching products:');
            expect(consoleSpy.mock.calls[0][1]).toBeInstanceOf(Error);
        });
        
        // Verify error message appears in the UI
        expect(await screen.findByText('Error al cargar los productos')).toBeInTheDocument();
        
        // Clean up
        consoleSpy.mockRestore();
    });
    
});

// We recommend installing an extension to run vitest tests.

