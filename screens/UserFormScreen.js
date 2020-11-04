import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

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

        if (isfirstnamevalid == 2 || islastnamevalid == 2 || isnicknamevalid == 2 || isagevalid == 2) return
        
        console.log('valid details!');

    }
    
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Firstname</Text>
                    <TextInput style={styles.input} value={firstname} onChangeText={text => {setFirstName(text);setIsFirstNameValid(0)}} />
                    {isfirstnamevalid === 2 ? <Text>Please enter your Firstname</Text>: <Text></Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Lastname</Text>
                    <TextInput style={styles.input} value={lastname} onChangeText={text => {setLastName(text);setIsLastNameValid(0)}} />
                    {islastnamevalid === 2 ? <Text>Please enter your Lastname</Text>: <Text></Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Nickname</Text>
                    <TextInput style={styles.input} value={nickname} onChangeText={text => {setNickName(text);setIsNickNameValid(0)}} />
                    {isnicknamevalid === 2 ? <Text>Please enter your Nickname</Text>: <Text></Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput style={styles.input} value={age} onChangeText={text => {setAge(text);setIsAgeValid(0)}} keyboardType="numeric"/>
                    {isagevalid === 2 ? <Text>Please enter a valid Age</Text>: <Text>Enter age between 21 and 40</Text>}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <Button title="Submit Details" onPress={handleSubmit} />
                </View>
                <View>
                    <Button title="Take Quiz" />
                </View>
            </View>
        </ScrollView>

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
});

export default UserFormScreen;