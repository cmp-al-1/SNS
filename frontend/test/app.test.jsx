import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../src/App';
beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve([{ id: '1', title: 'a' }, { id: '2', title: 'b' }]) }));
});
describe('App', () => {
  it('lists, filters and runs playbook', async () => {
    render(<App />);
    await screen.findByText('a');
    fireEvent.change(screen.getByPlaceholderText('filter'), { target: { value: 'b' } });
    await screen.findByText('b');
    fireEvent.click(screen.getAllByText('run')[0]);
    expect(fetch).toHaveBeenLastCalledWith('/alerts/2/run/close', { method: 'POST' });
  });
});
