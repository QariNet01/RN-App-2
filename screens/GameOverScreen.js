import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';

import FontFamily from '../constants/fontFamily';
import Color from '../constants/colors';

import CustomButton from '../components/CustomButton'


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={FontFamily.title}>The Game is Over</Text>
            <View style={styles.imgContainer}>
                <Image
                    // source={require('../assets/Image/success.png')} --> local image
                    // the other with link
                    source={{ uri: 'https://ak.picdn.net/shutterstock/videos/1015733875/thumb/10.jpg' }} fadeDuration={1000}
                    style={styles.image} resizeMode='cover' />
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                    This Time Your Phone Take
                <Text style={styles.highlight}> {props.RoundNum} </Text>
                Rounds to Guess The Entered Number
                <Text style={styles.highlight}> {props.userNum}</Text>.
                </Text>
            </View>
            <CustomButton onClick={props.onAgain} >Play Again</CustomButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        // to show perfect shaip in android must W = H and the bR = 1/2 of W or H

        borderWidth: 3,
        borderColor: Color.orryGreen,
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        // width:'80%',
        marginHorizontal: 30,
        marginVertical:15,
    },
    resultText:{
        textAlign:'center',
        fontSize:18,
    },
    highlight: {
        color: Color.pink,
        fontFamily: 'open-sans-bold',
        fontSize: 20,
    }
});

export default GameOverScreen;