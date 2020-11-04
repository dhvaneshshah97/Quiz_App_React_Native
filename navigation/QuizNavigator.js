import React from 'react';
import Colors from '../constants/Colors';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UserFormScreen from '../screens/UserFormScreen';
import Quiz from '../screens/Quiz';

const Stack = createStackNavigator();

const QuizNavigator = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary
                    },
                    headerTintColor: 'white',
                }}>
                    <Stack.Screen
                        name="Home"
                        component={UserFormScreen}
                        options={{
                            title: "My Profile",
                        }}
                    />
                    <Stack.Screen
                        name="Quiz"
                        component={Quiz}
                        options={{
                            title: "Quiz",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default QuizNavigator;

