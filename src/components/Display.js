import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

export default props =>
    <View style={StyleSheet.display}> 
        <Text style={StyleSheet.displayValue} numberOfLines={1}>
            {props.value}
        </Text>
    </View>