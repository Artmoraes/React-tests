import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('este se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    // 'O botão deve conter o texto Próximo pokémon';

    const buttonNext = screen.getByTestId('next-pokemon');
    const textButton = screen.getByText(/Próximo pokémon/i);
    expect(buttonNext).toBe(textButton);

    // 'Os próximos Pokémons da lista devem ser mostrados'
    const allPokemon = screen.getByRole('button', { name: /All/i });
    const Pikachu = screen.getByRole('button', { name: /Electric/i });
    expect(allPokemon.textContent).toContain('All');
    userEvent.click(allPokemon);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    expect(Pikachu).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const imgPokemon = screen.getAllByRole('img');
    expect(imgPokemon).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    // 'Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetir'
    const typePokemon = screen.getByRole('button', { name: /Fire/i });
    const buttonNext = screen.getByTestId('next-pokemon');
    const sete = 7;
    expect(screen.getAllByTestId(/pokemon-type-button/)).toHaveLength(sete);

    // 'A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo'
    userEvent.click(typePokemon);
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
    userEvent.click(buttonNext);
    expect(screen.getByText(/Rapidash/i)).toBeInTheDocument();

    // 'O texto do botão deve corresponder ao nome do tipo, ex. Psychic'
    const textButton = screen.getAllByRole('button');
    expect(textButton[0].textContent).toContain('All');
    expect(textButton[1].textContent).toContain('Electric');
    expect(textButton[2].textContent).toContain('Fire');
    expect(textButton[3].textContent).toContain('Bug');
    expect(textButton[4].textContent).toContain('Poison');
    expect(textButton[5].textContent).toContain('Psychic');
    expect(textButton[6].textContent).toContain('Normal');
    expect(textButton[7].textContent).toContain('Dragon');

    // 'O botão All precisa estar sempre visível'
    expect(screen.getByText(/All/i)).toBeDefined();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    //   'O texto do botão deve ser All'
    expect(screen.getByText(/All/i)).toBeInTheDocument();
  });
});
