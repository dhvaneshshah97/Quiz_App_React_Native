import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import questions from '../assets/questions.json';
import QuesAnsPair from '../components/QuesAnsPair';

const Quiz = (props) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [showNext, setShowNext] = useState(false);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState({})

    const handleQuizTraversal = () => {
        if (questionIndex === questions['questions'].length - 1) {
            props.navigation.navigate('Home', {score: score, totalQuestions: questions['questions'].length});
            return
        }
        setQuestionIndex((questionIndex) => questionIndex + 1);
        setShowNext(false);
    }

    const is_next = () => {
        setShowNext(true);
    }

    const get_Score = (score) => {
        setScore(score);
    }

    const getSelected = (selected) => {
        setSelected(selected);
    }

    return (
        // <ScrollView>
        <View style={styles.screen}>
            <QuesAnsPair
                question={questions['questions'][questionIndex]['questionText']}
                index={questionIndex}
                answers={questions['questions'][questionIndex]['answers']}
                is_next={is_next}
                getScore={get_Score}
                length={questions['questions'].length}    
                get_selected={getSelected}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.backButton}>
                        {
                            showNext && questionIndex > 0 ? <Button title="Back " onPress={() => setQuestionIndex((index) => index - 1)} /> : null
                        }
                    </View>
                {
                    showNext || selected[questionIndex]!==undefined ? <View>
                        <Button title={questionIndex === questions['questions'].length - 1 ? 'end ' : 'next'} onPress={handleQuizTraversal} />
                    </View> : null
                }
            </View>
        </View>
        // </ScrollView>
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