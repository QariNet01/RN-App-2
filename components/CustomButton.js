import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Color from '../constants/colors'

const CustomButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onClick}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Color.pink,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    btnText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 17
    },
});

export default CustomButton;