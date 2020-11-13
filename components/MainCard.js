import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MainCard = props => {
return <View style={{...styles.MainCard, ...props.style}}>{props.children}</View>
}

const styles = StyleSheet.create({
    MainCard:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: '#fff',
        elevation: 10,
        padding: 20,
        borderRadius: 10,
    }
});

export default MainCard;