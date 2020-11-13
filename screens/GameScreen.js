import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import NumberHolder from '../components/NumberContainer'
import Card from '../components/MainCard'
import CustomButton from '../components/CustomButton'

import FontFamily from '../constants/fontFamily'

const generateRandom = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNum = Math.floor(Math.random() * (max - min)) + min;
    if (randomNum === exclude) {
        return generateRandom(min, max, exclude);
    } else {
        return randomNum;
    }
};

const renderListGuess = (listLength, itemData) => (
    <View style={styles.guessList}>
        <Text style={FontFamily.os}>#{listLength - itemData.index}</Text>
        <Text style={FontFamily.os}>{itemData.item}</Text>
    </View>
);


const GameScreen = props => {
    const initGuess = generateRandom(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initGuess);
    const [PastGRounds, setPastGRounds] = useState([initGuess.toString()]);

    const curLow = useRef(1);
    const curHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(PastGRounds.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const GuessHandler = hint => {
        if (
            (hint === 'L' && currentGuess < props.userChoice) ||
            (hint === 'H' && currentGuess > props.userChoice)
        ) { Alert.alert('Don\'t Lie!', 'You know that is wrong .. X_X', [{ text: 'Say Sorry', style: 'cancel' }]); return; }

        if (hint === 'L') {
            curHigh.current = currentGuess;
        } else {
            curLow.current = currentGuess + 1;
        }
        const nextNum = generateRandom(curLow.current, curHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        // setRounds(curRound => curRound + 1);
        setPastGRounds(curPGR => [nextNum.toString(), ...curPGR]);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberHolder>{currentGuess}</NumberHolder>
            <Card style={styles.buttonContainer}>
                <CustomButton onClick={GuessHandler.bind(this, 'L')} >
                    <Ionicons name='md-remove' size={24} color='white' />
                </CustomButton>
                <CustomButton onClick={GuessHandler.bind(this, 'H')} >
                    <Ionicons name='md-add' size={24} color='white' />
                </CustomButton>
            </Card>

            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {PastGRounds.map((guess, index) => renderListGuess(guess, PastGRounds.length - index))}
                </ScrollView> */}
                <FlatList keyExtractor={(item) => item} data={PastGRounds} renderItem={renderListGuess.bind(this,PastGRounds.length)} contentContainerStyle={styles.list} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%',
    },
    listContainer: {
        width: '60%',
        flex: 1,
    },
    list: {
        flexGrow:1,
        justifyContent:'flex-end',
    },
    guessList: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});

export default GameScreen;