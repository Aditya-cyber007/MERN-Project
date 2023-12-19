//testing footer component using vitest
import { render, screen } from '@testing-library/react';
import Footer from '../pages/Footer';
import {test, expect} from 'vitest';

test('renders learn react link', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/Made By/i);
    expect(linkElement).toBeInTheDocument();
    });