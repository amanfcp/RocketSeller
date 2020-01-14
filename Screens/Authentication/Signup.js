import React, { Component } from 'react';

import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Alert
} from 'react-native'

import {
    Button, Form
} from 'native-base';

import {
    Input,
    Icon
} from 'react-native-elements';
import colors from '../../colors/colors';
import LangModal from '../../Components/LanguageModal'
import StoreTypeModal from '../../Components/StoreTypeModal'

import CountryPicker from 'react-native-country-picker-modal'


export default class Login extends React.Component {

    toggleLanguageModal = () => {
        this.setState({ isLanguageModal: !this.state.isLanguageModal })
    }
    setLanguage = _language => this.setState({ language: _language })

    toggleStoreTypeModal = () => {
        this.setState({ isStoreTypeModal: !this.state.isStoreTypeModal })
    }
    setStoreType = _storeType => this.setState({ storeType: _storeType })

    constructor(props) {
        super(props);
        this.state = {
            country: '',
            countryName: '',

            language: '',
            isLanguageModal: false,

            storeType: '',
            isStoreTypeModal: false,

            phNo: '',
            phNoPlaceHolder: '090078601',
            phNoChange: false,

            verifyCode: '',
            verifyCodePlaceHolder: '------',
            verifyChange: false,

            email: '',
            emailPlaceHolder: 'johnsmith@gmail.com',
            emailChange: false,

            password: '',
            passwordPlaceHolder: '\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24',
            passwordChange: false,
            showPass: true,

            confirmPassword: '',
            confirmPasswordPlaceHolder: '\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24',
            confirmPasswordChange: false,
            showConfirmPass: true,

            shopName: '',
            shopNamePlaceHolder: 'Abc Shop',
            shopNameChange: false,

            promoCode: '',
            promoCodePlaceHolder: 'HHHHH',
            promoCodeChange: false,
        }
    }
    static navigationOptions = {
        headerShown: false
    }
    render() {
        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Icon
                    onPress={()=>this.props.navigation.goBack()}
                    iconStyle={{
                        alignSelf: 'flex-start',
                        // position:'absolute',
                        margin: 20,
                    }}
                    name='ios-arrow-back'
                    type='ionicon'
                    size={20}
                />
                <View
                    style={styles.mainScroller}
                >
                    <Text
                        style={styles.title}
                    >
                        Signup
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
                        <View
                            style={styles.countryPickerContainer}
                        >
                            <View
                                style={styles.languagePickerText}
                            >
                                <Text style={styles.countryText}>Language</Text>
                                <Text style={styles.countryText}>{this.state.language}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.languagePicker}
                                onPress={() => {
                                    this.toggleLanguageModal()
                                }}
                            >
                                <Text>{'\u25bc'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            visible={this.state.isLanguageModal}
                            transparent={true}
                            presentationStyle='overFullScreen'
                            animationType='slide'
                            onRequestClose={
                                () => {
                                    this.setState({
                                        isLanguageModal: false
                                    })
                                }
                            }
                        >
                            <LangModal
                                closeModal={this.toggleLanguageModal}
                                setLang={this.setLanguage} />
                        </Modal>
                        <View
                            style={styles.countryPickerContainer}
                        >
                            <View
                                style={styles.languagePickerText}
                            >
                                <Text style={styles.countryText}>Store Type</Text>
                                <Text style={styles.countryText}>{this.state.storeType}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.languagePicker}
                                onPress={() => {
                                    this.toggleStoreTypeModal()
                                }}
                            >
                                <Text>{'\u25bc'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            visible={this.state.isStoreTypeModal}
                            transparent={true}
                            presentationStyle='overFullScreen'
                            animationType='slide'
                            onRequestClose={
                                () => {
                                    this.setState({
                                        isStoreTypeModal: false
                                    })
                                }
                            }
                        >
                            <StoreTypeModal
                                closeModal={this.toggleStoreTypeModal}
                                setStoreType={this.setStoreType} />
                        </Modal>
                        <Input
                            keyboardType='phone-pad'
                            onChangeText={text => {
                                this.setState({
                                    phNoChange: true,
                                    phNo: text,
                                })
                            }}
                            onFocus={() => this.setState({ phNoPlaceHolder: '' })}
                            onBlur={() => {
                                if (this.state.phNoChange === false || this.state.phNo === '') {
                                    this.setState({
                                        phNoPlaceHolder: '090078601'
                                    })
                                }
                            }}
                            inputStyle={styles.inputFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '90%' }}
                            label='Phone Number'
                            labelStyle={styles.label}
                            placeholder={this.state.phNoPlaceHolder}
                            leftIcon={
                                <Icon
                                    type='font-awesome'
                                    name='phone'
                                    color={colors.green}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                        <Input
                            onChangeText={_verify => {
                                this.setState({
                                    verifyChange: true,
                                    verifyCode: _verify,
                                })
                            }}
                            onFocus={() => this.setState({ verifyCodePlaceHolder: '' })}
                            onBlur={() => {
                                if (this.state.verifyChange === false || this.state.verifyCode === '') {
                                    this.setState({
                                        passwordPlaceHolder: '------'
                                    })
                                }
                            }}
                            inputStyle={styles.inputFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '90%' }}
                            label='Verify Code'
                            labelStyle={styles.label}
                            placeholder={this.state.verifyCodePlaceHolder}
                            leftIcon={
                                <Icon
                                    type='material'
                                    name='sms'
                                    color={colors.green}
                                />}
                            leftIconContainerStyle={styles.iconContainer}
                            rightIcon={

                                <Button
                                    onPress={() => {
                                        Alert.alert('GOT CODE')
                                    }}
                                    small={true}
                                    style={{
                                        backgroundColor: colors.white,
                                        padding: 3
                                    }}
                                >
                                    <Text
                                        style={{
                                        }}
                                    >Get Code</Text>
                                </Button>
                            }
                            rightIconContainerStyle={styles.rightIconContainer}
                        />
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
                                    type='material-community'
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
                        <Input
                            onChangeText={confPass => {
                                this.setState({
                                    confirmPasswordChange: true,
                                    confirmPassword: confPass,
                                })
                            }}
                            onFocus={() => this.setState({ confirmPasswordPlaceHolder: '' })}
                            onBlur={() => {
                                if (this.state.confirmPasswordChange === false || this.state.confirmPassword === '') {
                                    this.setState({
                                        confirmPasswordPlaceHolder: '\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24\u2B24'
                                    })
                                }
                            }}
                            secureTextEntry={this.state.showConfirmPass}
                            inputStyle={styles.inputFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '90%' }}
                            label='Confirm Password'
                            labelStyle={styles.label}
                            placeholder={this.state.confirmPasswordPlaceHolder}
                            leftIcon={
                                <Icon
                                    type='material-community'
                                    name='lock-alert'
                                    color={colors.green}
                                />}
                            leftIconContainerStyle={styles.iconContainer}
                            rightIcon={
                                this.state.showConfirmPass ?
                                    <Icon
                                        onPress={() => {
                                            this.setState({ showConfirmPass: false })
                                        }}
                                        type='feather'
                                        name='eye'
                                        color={colors.gray}
                                    />
                                    :
                                    <Icon
                                        onPress={() => {
                                            this.setState({ showConfirmPass: true })
                                        }}
                                        type='feather'
                                        name='eye-off'
                                        color={colors.gray}
                                    />
                            }
                            rightIconContainerStyle={styles.rightIconContainer}
                        />
                        <Input
                            keyboardType='default'
                            onChangeText={text => {
                                this.setState({
                                    shopNameChange: true,
                                    shopName: text,
                                })
                            }}
                            onFocus={() => this.setState({ shopNamePlaceHolder: '' })}
                            onBlur={() => {
                                if (this.state.shopNameChange === false || this.state.shopName === '') {
                                    this.setState({
                                        shopNamePlaceHolder: 'Abc Shop'
                                    })
                                }
                            }}
                            inputStyle={styles.inputFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '90%' }}
                            label='Shop Name'
                            labelStyle={styles.label}
                            placeholder={this.state.shopNamePlaceHolder}
                            leftIcon={
                                <Icon
                                    type='entypo'
                                    name='shop'
                                    color={colors.green}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                        <Input
                            keyboardType='default'
                            onChangeText={text => {
                                this.setState({
                                    promoCodeChange: true,
                                    promoCode: text,
                                })
                            }}
                            onFocus={() => this.setState({ promoCodePlaceHolder: '' })}
                            onBlur={() => {
                                if (this.state.promoCodeChange === false || this.state.promoCode === '') {
                                    this.setState({
                                        promoCodePlaceHolder: 'HHHHHH'
                                    })
                                }
                            }}
                            inputStyle={styles.inputFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '90%' }}
                            label='Promo Code'
                            labelStyle={styles.label}
                            placeholder={this.state.promoCodePlaceHolder}
                            leftIcon={
                                <Icon
                                    type='material-community'
                                    name='ticket'
                                    color={colors.green}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
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
                                    SIGNUP</Text>
                            </Button>
                        </View>
                    </Form>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainScroller: {
        marginVertical: 40,
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
        alignSelf: 'center',
        width: '90%',
        marginBottom: 15,
        paddingLeft: 12,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.red + '20',
    },
    countryPickerText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    countryText: {
        marginHorizontal: 10,
        color: '#00000095',
        fontSize: 16
    },
    countryPicker: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.red + '10',
        width: 70,
        height: 50,
    },
    languagePickerText: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    languagePicker: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.red + '10',
        width: '20%',
        height: 50,
    },
    inputContainer: {
        marginRight: 20,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20,
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
        width: '90%',
        justifyContent: "center",
        alignItems: "center",
    },
});