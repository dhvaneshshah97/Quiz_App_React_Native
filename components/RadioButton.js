import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const RadioButton = (props) => {
    return (
        <>
            <TouchableOpacity>
                <View style={styles.outerCircle}>
                    {
                        props.selected ?
                            <View style={styles.innerCircel} />
                            : null
                    }
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircel: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    }
})

export default RadioButton;