import React, { Component } from 'react';

import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

import {
    Button, Form,
} from 'native-base';

import {
    Input,
    Icon
} from 'react-native-elements';
import colors from '../../colors/colors';

import CountryPicker from 'react-native-country-picker-modal'


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            countryName: '',
            email: '',
            emailPlaceHolder: 'johnsmith@gmail.com',
            emailChange: false,

            password: '',
            passwordPlaceHolder: '\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24',
            passwordChange: false,
            showPass: true,
        }
    }
    static navigationOptions = {
        headerShown: false
    }
    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow:1
                }}
            >
                <View
                    style={styles.mainScroller}
                >
                    <Text
                        style={styles.title}
                    >
                        Login
                </Text>

                    <Form
                        style={styles.form}
                    >

                        <View
                            style={styles.countryPickerContainer}
                        >
                            <View
                                style={styles.countryPickerText}
                            >
                                <Text style={styles.countryText}>Country</Text>
                                <Text style={styles.countryText}>{this.state.countryName}</Text>
                            </View>
                            <CountryPicker
                                onSelect={_country => {
                                    this.setState({
                                        country: _country,
                                        countryName: _country.name,
                                    })
                                }}
                                containerButtonStyle={styles.countryPicker}
                                subregion='Southern Asia'
                            />
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
                            inputContainerStyle={{ width: '90%' }}
                            label='Email Address'
                            labelStyle={styles.label}
                            placeholder={this.state.emailPlaceHolder}
                            leftIcon={
                                <Icon
                                    type='font-awesome'
                                    name='envelope-o'
                                    color={colors.green}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                        <Input
                            onChangeText={pass => {
                                this.setState({
                                    passwordChange: true,
                                    password: pass,
                                })
                            }}
                            onFocus={() => this.setState({ passwordPlaceHolder: '' })}
                            onBlur={() => {
                                if (this.state.passwordChange === false || this.state.password === '') {
                                    this.setState({
                                        passwordPlaceHolder: '\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24'
                                    })
                                }
                            }}
                            secureTextEntry={this.state.showPass}
                            inputStyle={styles.inputFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '90%' }}
                            label='Password'
                            labelStyle={styles.label}
                            placeholder={this.state.passwordPlaceHolder}
                            leftIcon={
                                <Icon
                                    type='material'
                                    name='lock'
                                    color={colors.green}
                                />}
                            leftIconContainerStyle={styles.iconContainer}
                            rightIcon={
                                this.state.showPass ?
                                    <Icon
                                        onPress={() => {
                                            this.setState({ showPass: false })
                                        }}
                                        type='feather'
                                        name='eye'
                                        color={colors.gray}
                                    />
                                    :
                                    <Icon
                                        onPress={() => {
                                            this.setState({ showPass: true })
                                        }}
                                        type='feather'
                                        name='eye-off'
                                        color={colors.gray}
                                    />
                            }
                            rightIconContainerStyle={styles.rightIconContainer}
                        />
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end',
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('ForgotPassword')
                            }}
                        >
                            <Text style={{
                                margin: 10,
                                marginBottom: 16,
                                color: colors.green,
                                marginRight: 30,
                            }}>
                                Forgot Password?</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                style={styles.loginButton}
                                onPress={() => {
                                    this.props.navigation.navigate('drawerNavigator')
                                }}
                            >
                                <Text
                                    style={{
                                        color: colors.white,
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                    }}>
                                    LOGIN</Text>
                            </Button>
                        </View>
                    </Form>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Signup')
                        }}
                    >
                        <Text style={{
                            marginTop: 40,
                            color: colors.green,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.green
                        }}>
                            Create an Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainScroller: {
        marginVertical:10,

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 50,
        fontWeight: 'bold',
        color: colors.red
    },
    countryPickerContainer: {
        alignSelf:'center',
        width:'90%',
        marginBottom: 15,
        paddingLeft: 12,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.red + '20',
    },
    countryPickerText: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    countryText: {
        marginHorizontal:10,
        color: '#00000095',
        fontSize: 16
    },
    countryPicker: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.red + '10',
        width:70,
        height: 50,
    },
    inputContainer: {
        marginRight: 20,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 0
    },
    inputFields: {
        padding: 0,
        paddingLeft: 10,
        fontSize: 14,
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
    rightIconContainer: {
        paddingRight: 10,
        paddingBottom: 15,
    },
    loginButton: {
        borderRadius: 8,
        backgroundColor: colors.red,
        elevation: 0,
        height: 60,
        width: '95%',
        justifyContent: "center",
        alignItems: "center",
    },
});