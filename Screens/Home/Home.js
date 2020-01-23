import React, { Component } from 'react';

import {
    View,
    Text,
} from 'react-native'

import {
    Button,
} from 'native-base';

import {
    Input,
    Icon
} from 'react-native-elements';
import colors from '../../colors/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static navigationOptions = {
        title: 'Home',
        drawerIcon: () => <Icon name='ios-menu' type='ionicon' />
    }

    render() {
        return (
            <View
                style={styles.main}
            >
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Products')}
                    style={styles.mainButtons}
                >
                    <Icon
                        name='dropbox'
                        type='antdesign'
                        size={30}
                        iconStyle={styles.mainButtons._iconStyle}
                    />
                    <Text
                        style={styles.mainButtons._textStyle}
                    >
                        Products
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Orders')}
                    style={styles.mainButtons}
                >
                    <Icon
                        name='clipboard-pencil'
                        type='foundation'
                        size={30}
                        iconStyle={styles.mainButtons._iconStyle}
                    />
                    <Text
                        style={styles.mainButtons._textStyle}
                    >
                        Orders
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate({ routeName: 'AddProduct', transitionStyle: 'inverted'})}
                    style={styles.mainButtons}
                >
                    <Icon
                        name='add-box'
                        type='material'
                        size={30}
                        iconStyle={styles.mainButtons._iconStyle}
                    />
                    <Text
                        style={styles.mainButtons._textStyle}
                    >
                        Add Product
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = {
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainButtons: {
        _iconStyle: {
            color: colors.white,
            margin: 5,
        },
        _textStyle: {
            color: colors.white
        },
        marginVertical: 5,
        width: 120,
        height: 120,
        backgroundColor: colors.green,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
}