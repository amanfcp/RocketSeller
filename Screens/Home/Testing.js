import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Text,
    Animated,
    Easing,
    Dimensions
} from 'react-native'
import { List, TouchableRipple, } from 'react-native-paper'
import colors from '../../colors/colors'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0)
    }

    orderStatus = [
        'Processing',
        'Suspected Fraud',
        'Pending Payment',
        'Payment Review',
        'Pending',
        'On Hold',
        'Open',
        'Complete',
        'Closed',
        'Cancelled',
        'Paypal Canceled Reversal',
        'Pending Paypal',
        'Paypal Reversed'
    ]

    // componentDidMount() {
    //     this.animate()
    // }
    // animate() {
    //     this.animatedValue.setValue(0)
    //     Animated.timing(
    //         this.animatedValue,
    //         {
    //             toValue: 1,
    //             duration: 2000,
    //             easing: Easing.linear
    //         }
    //     ).start(() => this.animate())
    // }

    render() {
        // const movingMargin = this.animatedValue.interpolate({
        //     inputRange: [0, 0.5, 1],
        //     outputRange: [0, Dimensions.get('window').height, 0]
        // })
        return (
            <View style={styles.container}>
                <List.Accordion
                    title='Filter'
                >

                    {this.orderStatus.map((item, index) =>
                        <TouchableRipple
                            onPress={() => console.log('heyy')}
                            style={{
                                backgroundColor: colors.white,
                                width: '100%',
                                height: 40,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    marginLeft: 30,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                    }}
                                >{`${index+1}. ${item}`}</Text>
                            </View>
                        </TouchableRipple>

                    )}
                </List.Accordion>
                {/* <Animated.View
                    style={{
                        marginTop: movingMargin,
                        height: 2,
                        width: '100%',
                        backgroundColor: 'orange'
                    }} /> */}

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


// <Provider>
//                     <Portal
//                         theme={theme}
//                     >
//                         <Dialog
//                             style={{

//                                 height: 300,
//                                 // width:'100%'
//                                 // alignSelf:'flex-end'
//                             }}

//                             visible={showNotifications}
//                             onDismiss={hideNotifications}
//                         >
//                             <Dialog.Title>Notifications</Dialog.Title>
//                             <Dialog.Content>
//                                 {
//                                     notifications.map((item)=>(
//                                         <TouchableOpacity>
//                                         <Text>{item.message}</Text>
//                                     </TouchableOpacity>
//                                     ))
//                                 }
//                             {/* <FlatList

//                                 data={notifications}
//                                 maxToRenderPerBatch={3}
//                                 renderItem={({ item }) => (
//                                     <TouchableOpacity>
//                                         <Text>{item.message}</Text>
//                                     </TouchableOpacity>
//                                 )}
//                             /> */}

//                             </Dialog.Content>
//                         </Dialog>
//                     </Portal>
//                 </Provider >