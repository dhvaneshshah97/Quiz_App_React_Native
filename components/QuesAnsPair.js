import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import RadioButton from './RadioButton';

const QuesAnsPair = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <>
            <View style={styles.questionContainer}>
                <Text style={styles.questionIndex}>Question {props.index + 1}</Text>
                <Text style={styles.questionText}>
                    {props.question}
                </Text>
            </View>
            <View style={styles.answersContainer}>
                {
                    props.answers.map((ans, i) => {
                        return (
                            <View style={styles.answers} key={i}>
                                <RadioButton selected={isSelected} />
                                <TouchableOpacity>
                                    <Text style={styles.answer}>{ans['text']}</Text>
                                </TouchableOpacity>
                                
                            </View>
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
    },
    questionIndex: {
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    questionText: {
        fontSize: 20,
        textAlign: 'center',

    },
    answersContainer: {
        marginVertical: 20,
        
    },
    answers: {
        flexDirection: 'row',
        marginVertical: 10,
        marginLeft: 150
    },
    answer: {
        marginLeft: 20
    }
})

export default QuesAnsPair;