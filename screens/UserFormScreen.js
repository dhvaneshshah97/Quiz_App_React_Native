import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

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

    const getUserFromSF = async () => {
        try {
            const firstname = await AsyncStorage.getItem('fname');
            const lastname = await AsyncStorage.getItem('lname');
            const nickname = await AsyncStorage.getItem('nname');
            const age = await AsyncStorage.getItem('age');
            setFirstName(firstname !== null ? firstname : '');
            setLastName(lastname !== null ? lastname : '');
            setNickName(nickname !== null ? nickname : '');
            setAge(age !== null ? age : '');
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (isfirstnamevalid === 1 && islastnamevalid === 1 && isnicknamevalid === 1 && isagevalid === 1) {
            setIsFormValid(true);
            savedUserToSF();
            showSubmitToast();
            console.log('valid details!');
        }
        getUserFromSF();
    }, [isfirstnamevalid, islastnamevalid, isnicknamevalid, isagevalid])

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
        isFormValid ? props.navigation.navigate('Quiz', { name: 'Question 1' }) : showQuizToast();
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
                            {isfirstnamevalid === 2 ? <Text>Please enter your Firstname</Text> : <Text></Text>}
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Lastname</Text>
                            <TextInput style={styles.input} value={lastname} onChangeText={text => { setLastName(text); setIsLastNameValid(0) }} />
                            {islastnamevalid === 2 ? <Text>Please enter your Lastname</Text> : <Text></Text>}
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Nickname</Text>
                            <TextInput style={styles.input} value={nickname} onChangeText={text => { setNickName(text); setIsNickNameValid(0) }} />
                            {isnicknamevalid === 2 ? <Text>Please enter your Nickname</Text> : <Text></Text>}
                        </View>
                        <View style={styles.formControl}>
                            <Text style={styles.label}>Age</Text>
                            <TextInput style={styles.input} value={age} onChangeText={text => { setAge(text); setIsAgeValid(0) }} keyboardType="numeric" />
                            {isagevalid === 2 ? <Text>Please enter a valid Age</Text> : <Text>Enter age between 21 and 40</Text>}
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
                        props.route.params ? <View style={styles.scoreContainer}>
                            <Text style={styles.score}>Your Score: {props.route.params.score} out of {props.route.params.totalQuestions}</Text>
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
    }
});

export default UserFormScreen;