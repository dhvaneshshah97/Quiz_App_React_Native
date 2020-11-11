import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import {readScore} from '../assets/scoreStorage';

const UserFormScreen = (props) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [nickname, setNickName] = useState('');
    const [age, setAge] = useState('');

    // 0 for initial // 1 for valid // 2 for invalid
    const [isfirstnamevalid, setIsFirstNameValid] = useState(0);
    const [islastnamevalid, setIsLastNameValid] = useState(0);
    const [isnicknamevalid, setIsNickNameValid] = useState(0);
    const [isagevalid, setIsAgeValid] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);

    const [scoreString, setScoreString] = useState(null);

    // Storing User to Shared Preferences
    const savedUserToSF = async () => {
        try {
            await AsyncStorage.setItem('fname', firstname);
            await AsyncStorage.setItem('lname', lastname);
            await AsyncStorage.setItem('nname', nickname);
            await AsyncStorage.setItem('age', age);
        } catch (error) {
            console.log(error);
        }
    }

    // Retrieving User from Shared Preferences
    const getUserFromSF = async () => {
        try {
            const fname = await AsyncStorage.getItem('fname');
            const lname = await AsyncStorage.getItem('lname');
            const nname = await AsyncStorage.getItem('nname');
            const ageSF = await AsyncStorage.getItem('age');
            setFirstName(fname !== null ? fname : firstname);
            setLastName(lname !== null ? lname : lastname);
            setNickName(nname !== null ? nname : nickname);
            setAge(ageSF !== null ? ageSF : age);
            if (firstname !== null) setIsFormValid(true);
        } catch (error) {
            console.log(error);
        }
    }

    // Reading and setting score from file
    const getScoreFromFile = async () => {
        const scoreString = await readScore();
        setScoreString(scoreString);
    }

    useEffect(() => {
        getScoreFromFile();
        if (isfirstnamevalid === 1 && islastnamevalid === 1 && isnicknamevalid === 1 && isagevalid === 1) {
            setIsFormValid(true);
            savedUserToSF();
            showSubmitToast();
            console.log('valid details!');
        }
        getUserFromSF();
        
    }, [isfirstnamevalid, islastnamevalid, isnicknamevalid, isagevalid, props.route.params]) // props.route.params is used here because I want to run useEffect again when execution comes from Quiz page to this home page so getScoreFromFile method will run and will fetch and display the latest score from file. So, in Quiz app it will write score at the time of pressing 'end' and here it will again get score from file.   

    const handleSubmit = () => {
        if (firstname.trim().length > 0) {
            setIsFirstNameValid(1);
        } else {
            setIsFirstNameValid(2);

        }

        if (lastname.trim().length > 0) {
            setIsLastNameValid(1);
        } else {
            setIsLastNameValid(2);

        }

        if (nickname.trim().length > 0) {
            setIsNickNameValid(1);
        } else {
            setIsNickNameValid(2);

        }

        if (age.trim().length > 0 && parseInt(age) >= 21 && parseInt(age) <= 40) {
            setIsAgeValid(1);
        } else {
            setIsAgeValid(2);

        }
    }

    const goTOQuiz = () => {
        isFormValid ? props.navigation.navigate('Quiz') : showQuizToast();
    }

    const showSubmitToast = () => {
        ToastAndroid.show("Details saved", ToastAndroid.SHORT);
    };

    const showQuizToast = () => {
        ToastAndroid.show("Please Submit the form first", ToastAndroid.SHORT);
    };

    return (
        <KeyboardAvoidingView>
            <TouchableWithoutFeedback>
                <ScrollView>
                    <View style={styles.form}>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Firstname</Text>
                            <TextInput style={styles.input} value={firstname} onChangeText={text => { setFirstName(text); setIsFirstNameValid(0) }} />
                            {isfirstnamevalid === 2 ? <Text style={styles.validateMessage}>Please enter your Firstname</Text> : <Text></Text>}
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Lastname</Text>
                            <TextInput style={styles.input} value={lastname} onChangeText={text => { setLastName(text); setIsLastNameValid(0) }} />
                            {islastnamevalid === 2 ? <Text style={styles.validateMessage}>Please enter your Lastname</Text> : <Text></Text>}
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Nickname</Text>
                            <TextInput style={styles.input} value={nickname} onChangeText={text => { setNickName(text); setIsNickNameValid(0) }} />
                            {isnicknamevalid === 2 ? <Text style={styles.validateMessage}>Please enter your Nickname</Text> : <Text></Text>}
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Age</Text>
                            <TextInput style={styles.input} value={age} onChangeText={text => { setAge(text); setIsAgeValid(0) }} keyboardType="numeric" />
                            {isagevalid === 2 ? <Text style={styles.validateMessage}>Please enter a valid Age</Text> : (parseInt(age) >=21 && parseInt(age) <= 40 && age.trim().length > 0 ? null : <Text>Enter age between 21 and 40</Text>)}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View>
                            <Button title="Submit Details" onPress={handleSubmit} />
                        </View>
                        <View>
                            <Button title="Take Quiz" onPress={goTOQuiz} />
                        </View>
                    </View>
                    {
                        (scoreString!== 'noscore' && scoreString !== null) ? <View style={styles.scoreContainer}>
                            <Text style={styles.score}>Your Score: {scoreString}</Text>
                        </View> : null
                    }
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%'
    },
    label: {
        marginTop: 2,
        fontSize: 18,
    },
    input: {
        marginBottom: 5,
        paddingHorizontal: 2,
        paddingVertical: 3,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    score: {
        fontSize: 25,
        color: Colors.primary,
    },
    scoreContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    validateMessage: {
        color: 'red',
    }
});

export default UserFormScreen;