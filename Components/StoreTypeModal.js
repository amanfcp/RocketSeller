import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import colors from '../colors/colors';

export default class StoreTypeModal extends React.Component {
    render() {
        return (
            < View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'white' }}>
                <View
                    style={{
                        width: '100%',
                        alignItems: 'flex-start'
                    }}
                >
                    <Icon
                        name='cross'
                        type='entypo'
                        color='#00000090'
                        size={40}
                        iconStyle={{
                            margin: 12
                        }}
                        onPress={() => {
                            this.props.closeModal()
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.gray + '20',
                        width: '100%',
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomColor: colors.gray + '80',
                        borderBottomWidth: 1,
                    }}
                    onPress={() => {
                        this.props.setStoreType('Personal')
                        this.props.closeModal()
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >Personal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.gray + '20',
                        width: '100%',
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomColor: colors.gray + '80',
                        borderBottomWidth: 1,
                    }}
                    onPress={() => {
                        this.props.setStoreType('Business')
                        this.props.closeModal()
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >Business</Text>
                </TouchableOpacity>
            </View >

        );
    }
}