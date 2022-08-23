import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const emptyPokemon = screen.getByText(/No favorite pokemon found/i);
    expect(emptyPokemon).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonExist = screen.getByText(/More Details/i);
    userEvent.click(pokemonExist);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    history.push('/favorites');
    const havePokemon = screen.getByTestId('pokemon-name');
    expect(havePokemon).toBeInTheDocument();
  });
});
