import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import {
    Icon
} from 'react-native-elements';
import colors from '../../colors/colors';
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import { TouchableRipple } from 'react-native-paper';
import Video from 'react-native-video';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
        };
    }

    renderInner = () => (
        <View style={styles.panel}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Products')}
                style={styles.panelButton}
            >
                <Text style={styles.panelButtonTitle}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Orders')}
                style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddProduct')}
                style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Add Products</Text>
            </TouchableOpacity>
        </View>
    )

    renderHeader = () => <View style={styles.header} />

    fall = new Animated.Value(1)

    render() {
        return (
            <View style={styles.container}>
                <BottomSheet
                    snapPoints={[380, 50]}
                    renderContent={this.renderInner}
                    renderHeader={this.renderHeader}
                    initialSnap={1}
                    callbackNode={this.fall}
                    enabledInnerScrolling={false}
                    enabledContentTapInteraction={false}
                />
                <Animated.View
                    style={{
                        alignItems: 'center',
                        opacity: Animated.add(0.1, Animated.multiply(this.fall, 0.9)),
                    }}
                >
                    <View
                        style={styles.main}
                    >
                        <TouchableRipple
                            style={styles.mainButtons}
                            rippleColor={colors.white}
                            underlayColor={colors.white}
                            onPress={() => this.props.navigation.navigate('Products')}
                        >
                            <View>
                                <Icon
                                    name='dropbox'
                                    type='antdesign'
                                    size={30}
                                    iconStyle={styles._iconStyle}
                                />
                                <Text
                                    style={styles._textStyle}
                                >
                                    Products
                        </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={styles.mainButtons}
                            rippleColor={colors.white}
                            underlayColor={colors.white}
                            onPress={() => this.props.navigation.navigate('Orders')}
                        >
                            <View>
                                <Icon
                                    name='clipboard-pencil'
                                    type='foundation'
                                    size={30}
                                    iconStyle={styles._iconStyle}
                                />
                                <Text
                                    style={styles._textStyle}
                                >
                                    Orders
                        </Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple
                            style={styles.mainButtons}
                            rippleColor={colors.white}
                            underlayColor={colors.white}
                            onPress={() => this.props.navigation.navigate({ routeName: 'AddProduct', transitionStyle: 'inverted' })}
                        >
                            <View>
                                <Icon
                                    name='add-box'
                                    type='material'
                                    size={30}
                                    iconStyle={styles._iconStyle}
                                />
                                <Text
                                    style={styles._textStyle}
                                >
                                    Add Product
                        </Text>
                            </View>
                        </TouchableRipple>
                    </View >
                </Animated.View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    panel: {
        height: 600,
        padding: 20,
        backgroundColor: '#2c2c2fAA',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    header: {
        width: '100%',
        height: 100,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#292929',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginVertical: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
    },
    mainButtons: {
        marginVertical: 5,
        marginHorizontal: 5,
        width: 120,
        height: 120,
        backgroundColor: colors.green,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        flexDirection: 'row',
    },
    _iconStyle: {
        color: colors.white,
        margin: 5,
    },
    _textStyle: {
        color: colors.white
    },
});