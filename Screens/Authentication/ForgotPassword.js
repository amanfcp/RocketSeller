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

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailPlaceHolder: 'johnsmith@gmail.com',
            emailChange: false,
        }
    }

    static navigationOptions = {
        headerShown: false
    }

    render() {
        return (
            <View
                style={styles.main}
            >
                <Icon
                    onPress={()=>this.props.navigation.goBack()}
                    iconStyle={{
                        alignSelf: 'flex-start',
                        marginBottom: 20,
                    }}
                    name='ios-arrow-back'
                    type='ionicon'
                    size={20}
                />
                <View>
                    <Text
                        style={styles.textHead}
                    >Forget Password?</Text>
                    <Text
                        style={styles.textDesc}
                    >Please enter the email address associated with your Rocket Seller Account, we will
                                send you an email with a link to reset your password.
                </Text>
                </View>
                <Input
                    keyboardType='email-address'
                    onChangeText={text => {
                        this.setState({
                            emailChange: true,
                            email: text,
                        })
                    }}
                    onFocus={() => this.setState({ emailPlaceHolder: '' })}
                    onBlur={() => {
                        if (this.state.emailChange === false || this.state.email === '') {
                            this.setState({
                                emailPlaceHolder: 'johnsmith@gmail.com'
                            })
                        }
                    }}
                    inputStyle={styles.inputFields}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={{ width: '100%' }}
                    // label='Email Address'
                    // labelStyle={styles.label}
                    placeholder={this.state.emailPlaceHolder}
                // leftIcon={
                //     <Icon
                //         type='font-awesome'
                //         name='envelope-o'
                //         color={colors.green}
                //     />
                // }
                // leftIconContainerStyle={styles.iconContainer}
                />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        style={styles.loginButton}
                        onPress={() => {
                            this.props.navigation.navigate('Home')
                        }}
                    >
                        <Text
                            style={{
                                color: colors.white,
                                fontSize: 22,
                                fontWeight: 'bold',
                            }}>
                            Reset Password</Text>
                    </Button>
                </View>
            </View>
        );
    }
};

const styles = {
    main: {
        flex: 1,
        margin: 20,
        // justifyContent:'center',
        // alignItems:'center',
    },
    textHead: {
        fontSize: 16,
        marginVertical: 6,
        fontWeight: 'bold',
    },
    textDesc: {
        fontSize: 16

    },
    inputContainer: {
        marginRight: 20,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 0,
        // width:'100%'
    },
    inputFields: {
        textAlign: 'center',
        padding: 0,
        fontSize: 16,
    },
    label: {
        fontWeight: '100',
        fontFamily: 'arial',
        fontSize: 14,
        marginLeft: 60,
        color: colors.green
    },
    iconContainer: {
        paddingRight: 10,
        paddingBottom: 30
    },
    loginButton: {
        borderRadius: 8,
        backgroundColor: colors.red,
        elevation: 0,
        height: 60,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
}