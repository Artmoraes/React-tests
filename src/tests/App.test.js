import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se o topo da aplicação tem um conjunto fixo de link de navegação', () => {
  test('Home', () => {
    const { history } = renderWithRouter(<App />);
    const Home = screen.getByRole('link', { name: /Home/i });
    expect(Home).toBeInTheDocument();
    userEvent.click(Home);
    history.push('/');
    expect(screen.getByText(/Encountered pokémons/i));
  });
  test('About', () => {
    const { history } = renderWithRouter(<App />);
    const About = screen.getByRole('link', { name: /About/i });

    expect(About).toBeInTheDocument();
    userEvent.click(About);
    history.push('/About');
    expect(screen.getByRole('heading', { name: /About Pokédex/i }));
  });
  test('Favorite', () => {
    const { history } = renderWithRouter(<App />);
    const Favorite = screen.getByRole('link', { name: /Favorite/i });

    expect(Favorite).toBeInTheDocument();
    userEvent.click(Favorite);
    history.push('/favorites');
    expect(screen.getByRole('heading', { name: /Favorite pokémons/i }));
  });
  test('Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/nada');
    expect(screen.getByRole('heading', { name: /Page requested not found/i }));
  });
});
