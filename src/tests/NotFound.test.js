import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página tem um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = screen.getByRole(
      'heading',
      { name: /Page requested not fou/i },
      { level: 2 },
    );

    expect(notFound).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem do Pikachu', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFoundImage = screen.getAllByRole('img');
    expect(notFoundImage[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
