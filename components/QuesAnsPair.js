import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const QuesAnsPair = (props) => {
    const [selected, setSelected] = useState({});
    const [score, setScore] = useState([]);

    console.log(selected)
    return (
        <>
            <View style={styles.questionContainer}>
                <Text style={styles.questionIndex}>Question {props.index + 1}</Text>
                <Text style={styles.questionText}>
                    {props.question}
                </Text>
            </View>
            <View>
                <Text>Selected Answer: {selected[props.index]} </Text>
            </View>
            <View style={styles.answersContainer}>
                {/* <RadioForm
                    animation={false}
                    radio_props={props.answers}
                    initial={props.initialState}
                    onPress={handleRadioSubmit}
                /> */}
                {
                    props.answers.map((ans, i) => {
                        return (

                            <TouchableOpacity key={i} style={styles.answer} onPress={() => setSelected({ ...selected, [props.index]: ans['label'] })}>
                                <View>
                                    <Text style={styles.answerText}>{ans['label']}</Text>
                                </View>
                            </TouchableOpacity>


                        )
                    })
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    questionContainer: {
        margin: 20,
        backgroundColor: Colors.accent,
        padding: 15,
        borderRadius: 7,
        borderColor: Colors.primary,
        borderWidth: 2,
        minHeight: '25%'
    },
    questionIndex: {
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 15,
        fontWeight: 'bold',
        color: Colors.primary
    },
    questionText: {
        fontSize: 20,
        textAlign: 'center',

    },
    answersContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    answer: {
        backgroundColor: 'lightyellow',
        padding: 10,
        width: '45%',
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.primary
    },
    answerText: {
        fontSize: 17,
    }
})

export default QuesAnsPair;