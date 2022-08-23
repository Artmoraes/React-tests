import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado o card com as informações de determinado pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonExist = screen.getByText(/More Details/i);
    userEvent.click(pokemonExist);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    history.push('/favorites');
    const havePokemon = screen.getByTestId('pokemon-name');
    expect(havePokemon).toBeInTheDocument();

    // O nome correto do Pokémon deve ser mostrado na tela
    const idPokemonName = screen.getByTestId(/pokemon-name/i);
    expect(idPokemonName.textContent).toContain('Pikachu');

    // O tipo correto do pokémon deve ser mostrado na tela.
    const idPokemonType = screen.getByTestId(/pokemon-type/i);
    expect(idPokemonType.textContent).toContain('Electric');

    /* O peso médio do pokémon deve ser exibido com um texto no formato Average weight:
    <value> <measurementUnit>, onde <value> e <measurementUnit> são, respectivamente,
    o peso médio do pokémon e sua unidade de medida.
    */
    const idPokemonWeight = screen.getByTestId(/pokemon-weight/i);
    expect(idPokemonWeight.textContent).toContain('Average weight: 6.0 kg');

    /* A imagem do Pokémon deve ser exibida.
    Ela deve conter um atributo src com a URL da imagem e
    um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    */
    const idPokemonImg = screen.getAllByRole('img');
    const pokemonImgUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(idPokemonImg[0].alt).toContain(idPokemonName.textContent, /sprite/);
    expect(idPokemonImg[0].src).toContain(pokemonImgUrl);

    /*
    Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.
    O link deve possuir a URL /pokemons/<id>,
    onde <id> é o id do Pokémon exibido;
     */

    const moreDetails = screen.getByText(/More details/i);
    userEvent.click(moreDetails);
    const pokemon = screen.getByRole('heading', {
      level: 2, name: /Pikachu Details/i });
    expect(pokemon).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
    // console.log(pathname);

    /*
    Teste se existe um ícone de estrela nos Pokémons favoritados.
    O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
    A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite,
    onde <pokemon> é o nome do Pokémon exibido.
    */

    const starIcon = '/star-icon.svg';
    const fraseAltImgStar = 'is marked as favorite';
    expect(idPokemonImg[1].src).toContain(starIcon);
    expect(idPokemonImg[1].alt).toContain(idPokemonName.textContent, fraseAltImgStar);
  });
});
