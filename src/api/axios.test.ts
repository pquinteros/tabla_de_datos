import { describe, it, expect, vi } from 'vitest';
import api from './axios';

describe('API Client', () => {
    it('should be configured with the correct base URL', () => {
        expect(api.defaults.baseURL).toBe('https://fakestoreapi.com');
    });

    it('should have the correct default headers', () => {
        const contentType = api.defaults.headers['Content-Type'];
        expect(contentType).toBe('application/json');
    });

    it('should have the correct timeout configuration', () => {
        expect(api.defaults.timeout).toBe(5000);
    });
});