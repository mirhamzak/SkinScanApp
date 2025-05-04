import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ResultScreen from '../screens/ResultScreen';

jest.mock('../components/ProductCard', () => {
    const React = require('react');
    const { Text } = require('react-native');

    return ({ product }) => <Text>{product?.name}</Text>;
});

describe('ResultScreen', () => {
    it('renders skin statistics and switches tabs correctly', () => {
        const { getByText, queryByText } = render(<ResultScreen />);
        expect(getByText('Skin test Results')).toBeTruthy();
        expect(getByText('For wrinkles')).toBeTruthy();
        expect(queryByText('For baldness')).toBeTruthy();
        fireEvent.press(getByText('For baldness'));
        expect(getByText('For baldness')).toHaveStyle({ fontWeight: '600' });
    });
});