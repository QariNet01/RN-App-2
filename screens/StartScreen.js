import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import MainCard from '../components/MainCard';
import Input from '../components/Input';
import NumberHolder from '../components/NumberContainer'

import Colors from '../constants/colors';
import FontFamily from '../constants/fontFamily';

const StartScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();


    const numberInputHandler = inputTxt => {
        setEnteredValue(inputTxt.replace(/[^0-9]/g, ''));
    }

    const confirmInputHandler = () => {
        const chosenNum = parseInt(enteredValue);
        if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
            Alert.alert(
                'Invalid Number',
                'Number has to be between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: () => { setEnteredValue(''); setConfirmed(false) } }]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNum);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let conOut;
    if (confirmed) {
        conOut =
            <MainCard style={styles.summaryContainer}>
                <Text>You Select</Text>
                <NumberHolder>{selectedNumber}</NumberHolder>
                <Button title='START GAME' color={Colors.darkGreen} onPress={() => props.onStart(selectedNumber)} />
            </MainCard>
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <MainCard style={styles.inputContainer}>
                    <Text style={FontFamily.os}>Select a Number</Text>

                    <Input
                        style={styles.inputField}
                        keyboardType='number-pad'
                        placeholder='0-99'
                        maxLength={2}
                        blurOnSubmit
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />

                    <View style={styles.buttonContainer}>
                        <View style={styles.Button}><Button color={Colors.orryGreen} title='Confirm' onPress={confirmInputHandler}></Button></View>
                        <View style={styles.Button}><Button color={Colors.pinkRed} title='Rest' onPress={() => { setEnteredValue(''); setConfirmed(false) }}></Button></View>
                    </View>
                </MainCard>
                {conOut}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily:'open-sans-bold',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        // fontFamily: 'open-sans',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
    },
    Button: {
        width: 100,
    },
    inputField: {
        width: '20%',
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
        width:'77%'
    }
});

export default StartScreen;