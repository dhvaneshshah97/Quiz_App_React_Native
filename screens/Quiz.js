import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Quiz = ({navigation}) => {
    return(
        <View style={styles.screen}>
            <Text>
                Go back to Home!
            </Text>
            <Button title="Go to Form " onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Quiz;