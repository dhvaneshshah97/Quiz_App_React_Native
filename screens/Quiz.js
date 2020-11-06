import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, BackHandler } from 'react-native';
import questions from '../assets/questions.json';
import QuesAnsPair from '../components/QuesAnsPair';

const Quiz = (props) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [test, setTest] = useState(-1);
    const handleQuizTraversal = () => {
        if (questionIndex === questions['questions'].length - 1) {
            props.navigation.navigate('Home');
            return
        }
        setTest(-1);
        setQuestionIndex((questionIndex) => questionIndex + 1);
        
    }

    return (
        <View style={styles.screen}>
            <QuesAnsPair 
                question={questions['questions'][questionIndex]['questionText']} 
                index={questionIndex}
                answers={questions['questions'][questionIndex]['answers']}
                initialState={test} 
            />
            
            <View style={styles.buttonContainer}>
                <View style={styles.backButton}>
                    {
                        questionIndex > 0 ? <Button title="Back " onPress={() => setQuestionIndex((index) => index - 1)} /> : null
                    }
                </View>
                <View>
                    <Button title={questionIndex === questions['questions'].length - 1 ? 'end ' : 'next'} onPress={handleQuizTraversal} />
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    backButton: {
        marginRight: 10,
    }
});

export default Quiz;