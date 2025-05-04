import React from 'react';
import { render } from '@testing-library/react-native';
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    name: 'Apple Juice',
    description: 'Freshly squeezed apple juice',
    image: 'https://example.com/apple.jpg',
  };

  it('renders product name, description, and image', () => {
    const { getByText, getByTestId } = render(<ProductCard product={mockProduct} />);

    expect(getByText('Apple Juice')).toBeTruthy();
    expect(getByText('Freshly squeezed apple juice')).toBeTruthy();

    const image = getByTestId('product-image');
    expect(image.props.source.uri).toBe(mockProduct.image);
  });
});