import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ScanStack from './src/navigation/ScanStack';

const App = () => {
    return (
        <NavigationContainer>
            <ScanStack />
        </NavigationContainer>
    );
};

export default App;