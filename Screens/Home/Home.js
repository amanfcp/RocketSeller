import React, { Component, useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Easing,
    FlatList,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native'
import {
    BarIndicator,
    MaterialIndicator
} from 'react-native-indicators'
import {
    Icon,
} from 'react-native-elements';
import {
    Tabs,
    Tab,
    ScrollableTab,
} from 'native-base'
import Modal from 'react-native-modal'
import colors from '../../colors/colors';
import {  TouchableRipple, Badge} from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import Axios from 'axios';
import { Apis, header } from '../../Apis/api';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationCount: '',
            notifications: [],
            intitialNotifications: [],
            page: 1,
            listLoader: false,
            showNotifications: false,

            loading: true,

            dashboard: '',

            order_time: [],
            order_noOforder: [],

            amount_time: [],
            amount_noOforder: [],

            credit_time: [],
            credit_noOforder: [],

            recentProducts: ''
        }
    }
    hideNotifications = () => {
        this.setState({
            showNotifications: false
        })
    }

    showNotifications = () => {
        this.setState({ showNotifications: true })
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: () =>
            <TouchableRipple
                onPress={() => {
                    navigation.state.params.handleShowNotification()
                }}
            >
                <View>
                    <Icon
                        name='ios-notifications-outline'
                        type='ionicon'
                        size={26}
                        color={colors.white}
                        iconStyle={{
                            padding: 8,
                            paddingRight: 12
                        }}
                    />
                    <Badge
                        style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                        }}

                        size={16}
                    >{navigation.getParam('handleNotificationCount')}
                    </Badge>
                </View>
            </TouchableRipple>

        ,
    })

    apiCalls = async () => {
        await Axios.get(Apis.Dashboard + `?customer_id=${global.customer_id}`, { headers: header }).then(res => {
            this.setState({
                dashboard: res.data
            })
            res.data.order_chart_data.map((val) => {
                this.setState(state => ({
                    order_time: [...state.order_time, val.time]
                }))
            })
            res.data.order_chart_data.map((val) => {
                this.setState(state => ({
                    order_noOforder: [...state.order_noOforder, val.number_of_order]
                }))
            })

            res.data.order_chart_data.map((val) => {
                this.setState(state => ({
                    amount_time: [...state.amount_time, val.time]
                }))
            })
            res.data.order_chart_data.map((val) => {
                this.setState(state => ({
                    amount_noOforder: [...state.amount_noOforder, val.number_of_order]
                }))
            })

            res.data.order_chart_data.map((val) => {
                this.setState(state => ({
                    credit_time: [...state.credit_time, val.time]
                }))
            })
            res.data.order_chart_data.map((val) => {
                this.setState(state => ({
                    credit_noOforder: [...state.credit_noOforder, val.number_of_order]
                }))
            })
            Axios.get(Apis.Notifications + `/unreadCount?customer_id=${global.customer_id}`, { headers: header }).then(res => {
                this.setState(state => ({
                    notificationCount: state.notificationCount = res.data,
                }), () => { })
                console.log('Notification Count', this.state.notificationCount)
                this.props.navigation.setParams({
                    handleNotificationCount: this.state.notificationCount,
                })
            }).catch(err => console.warn(err.message))
            Axios.get(Apis.Notifications + `?customer_id=${global.customer_id}&searchCriteria[sortOrders][0][field]=is_read`, { headers: header }).then(res => {
                console.log(res.data.items)
                res.data.items.map(item => {
                    item.is_read == false ?
                        this.setState(state => ({
                            notifications: [...state.notifications, item]
                        })) : null
                })
                this.setState({ intitialNotifications: this.state.notifications.slice(0, 5) })
            }).catch(err => console.warn('No noti', err.message))
            Axios.get(Apis.Products + `?customer_id=${global.customer_id}&searchCriteria[sortOrders][0][field]=updated_at&searchCriteria[pageSize]=3`, { headers: header }).then(res => {
                this.setState({
                    loading: false,
                    recentProducts: res.data.items
                })
            }).catch(err => console.warn(err.message))
        }).catch(err => {
            console.warn(err.message)
            this.setState({ loading: false })
        })
    }

    async componentDidMount() {
        await this.apiCalls()
        this.props.navigation.setParams({
            handleShowNotification: this.showNotifications,
        })
        console.log('saved notification count', this.state.notificationCount)
    }
    loadMoreNotifications = () => {
        this.setState({
            listLoader: true
        })
        setTimeout(() => {
            const start = this.state.page * 5;
            const end = (this.state.page + 1) * 5;
            this.setState({ page: this.state.page + 1 })
            const newData = this.state.notifications.slice(start, end); // here, we will receive next batch of the items
            this.setState({
                intitialNotifications: [...this.state.intitialNotifications, ...newData]
            })
        }, 1500);
    }

    render() {
        return (
            this.state.loading ?
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <BarIndicator
                        animationEasing={Easing.linear}
                        count={4}
                        color={colors.black}
                    />
                </View >
                :
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View
                        style={styles.container}
                    >

                        <View
                            style={styles.dashboard}
                        >
                            <Text
                                style={styles.heading}
                            >Dashboard</Text>
                            <View
                                style={styles.dashboardButtonView}
                            >
                                <TouchableRipple
                                    style={[styles.dashboardButton, { backgroundColor: colors.dashboardRed }]}
                                >
                                    <View>
                                        <Text
                                            style={[styles.dashboardTextHead, { fontSize: this.state.dashboard ? this.state.dashboard.credit_amount.length > 12 ? 20 : 25 : 25 }]}
                                        >
                                            {this.state.dashboard.credit_amount}
                                        </Text>
                                        <Text
                                            style={styles.dashboardText}
                                        >Credit Amount</Text>
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple
                                    style={[styles.dashboardButton, { backgroundColor: colors.dashboardYellow }]}
                                >
                                    <View>
                                        <Text
                                            style={[styles.dashboardTextHead, { fontSize: this.state.dashboard ? this.state.dashboard.lifetime_sales.length > 12 ? 20 : 25 : 25 }]}
                                        >{this.state.dashboard.lifetime_sales}</Text>
                                        <Text
                                            style={styles.dashboardText}
                                        >Lifetime Sales</Text>
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple
                                    style={[styles.dashboardButton, { backgroundColor: colors.dashboardGreen }]}
                                >
                                    <View>
                                        <Text
                                            style={[styles.dashboardTextHead, { fontSize: this.state.dashboard ? this.state.dashboard.average_orders.length > 12 ? 20 : 25 : 25 }]}
                                        >{this.state.dashboard.average_orders}</Text>
                                        <Text
                                            style={styles.dashboardText}
                                        >Average Orders</Text>
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple
                                    style={[styles.dashboardButton, { backgroundColor: colors.dashbboardPurple }]}
                                >
                                    <View>
                                        <Text
                                            style={[styles.dashboardTextHead, { fontSize: this.state.dashboard ? this.state.dashboard.total_products.length > 12 ? 20 : 25 : 25 }]}
                                        >{this.state.dashboard.total_products}</Text>
                                        <Text
                                            style={styles.dashboardText}
                                        >Total Products</Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                        </View>

                        <View
                            style={styles.chartView}
                        >
                            <Tabs
                                tabBarUnderlineStyle={{
                                    height: 2,
                                    backgroundColor: colors.white
                                }}
                                renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
                            >
                                <Tab
                                    activeTextStyle={styles.activeTabTextSub}
                                    textStyle={styles.tabTextSub}
                                    tabStyle={styles.tabStyleSub}
                                    activeTabStyle={styles.activeTabStyleSub}
                                    heading="Orders">
                                    <LineChart
                                        data={{
                                            labels: this.state.order_time.slice(this.state.order_time.length - 5, this.state.order_time.length),

                                            datasets: [
                                                {
                                                    data: this.state.order_noOforder.slice(0, 5)
                                                    // data: [1, 4, 3, 2.5, 6]

                                                }
                                            ]
                                        }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: colors.blue,
                                            backgroundGradientFrom: colors.white,
                                            backgroundGradientTo: colors.dashboardGreen,
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => colors.dashbboardPurple,
                                            labelColor: (opacity = 1) => colors.dashbboardPurple,
                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: colors.blue
                                            }
                                        }}
                                        bezier
                                    />
                                </Tab>
                                <Tab
                                    activeTextStyle={styles.activeTabTextSub}
                                    textStyle={styles.tabTextSub}
                                    tabStyle={styles.tabStyleSub}
                                    activeTabStyle={styles.activeTabStyleSub}
                                    heading="Amounts">
                                    <LineChart
                                        data={{
                                            labels: this.state.amount_time.slice(this.state.amount_time.length - 5, this.state.amount_time.length),

                                            datasets: [
                                                {
                                                    data: this.state.amount_noOforder.slice(0, 5)
                                                    // data: [5, 3, 3, 2.5, 10]

                                                }
                                            ]
                                        }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: colors.blue,
                                            backgroundGradientFrom: colors.white,
                                            backgroundGradientTo: colors.dashboardGreen,
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => colors.dashbboardPurple,
                                            labelColor: (opacity = 1) => colors.dashbboardPurple,
                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: colors.blue
                                            }
                                        }}
                                        bezier
                                    />
                                </Tab>
                                <Tab
                                    activeTextStyle={styles.activeTabTextSub}
                                    textStyle={styles.tabTextSub}
                                    tabStyle={styles.tabStyleSub}
                                    activeTabStyle={styles.activeTabStyleSub}
                                    heading="Credits">
                                    <LineChart
                                        data={{
                                            labels: this.state.credit_time.slice(this.state.credit_time.length - 5, this.state.credit_time.length),
                                            datasets: [
                                                {
                                                    data: this.state.credit_noOforder.slice(0, 5)
                                                    // data: [9, 4, 0, 2.5, 6]
                                                }
                                            ]
                                        }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: colors.blue,
                                            backgroundGradientFrom: colors.white,
                                            backgroundGradientTo: colors.dashboardGreen,
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => colors.dashbboardPurple,
                                            labelColor: (opacity = 1) => colors.dashbboardPurple,

                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: colors.blue
                                            }
                                        }}
                                        bezier
                                    />
                                </Tab>
                            </Tabs>
                        </View>

                        <View
                            style={styles.recentProductsContainer}
                        >
                            <Text
                                style={styles.heading}
                            >Recently Added Products</Text>
                            <View>
                                <FlatList
                                    data={this.state.recentProducts}
                                    renderItem={({ item }) => (
                                        <View
                                            style={styles.recentProducts}
                                        >
                                            <Text
                                                style={{ flex: 2 }}
                                            >{`${item.name}\nRs. ${item.price}`}</Text>
                                            <Image
                                                source={{ uri: item.thumbnail_url }}
                                                resizeMode='contain'
                                                style={{
                                                    flex: 1,
                                                    width: 100,
                                                    height: 100
                                                }}
                                            />
                                        </View>
                                    )}
                                />
                            </View>
                            <TouchableRipple
                                rippleColor={colors.white}
                                underlayColor={colors.white}
                                style={styles.viewAllProducts}
                                onPress={() => this.props.navigation.navigate('Products')}
                            >
                                <Text
                                    style={{ color: colors.white }}
                                >View All Products</Text>
                            </TouchableRipple>
                        </View>
                        <View
                            style={styles.storeManagementContainer}
                        >
                            <Text
                                style={styles.heading}
                            >Store Management</Text>
                            <View
                                style={styles.storeMngmtButton}
                            >
                                <TouchableRipple
                                    style={styles.mainButtons}
                                    rippleColor={colors.white}
                                    underlayColor={colors.white}
                                    onPress={() => this.props.navigation.navigate({ routeName: 'AddProduct', transitionStyle: 'inverted' })}
                                >
                                    <View>
                                        <Icon
                                            name='ios-add-circle-outline'
                                            type='ionicon'
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
                                    onPress={() => this.props.navigation.navigate('Products')}
                                >
                                    <View>
                                        <Icon
                                            name='handbag'
                                            type='simple-line-icon'
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
                                    onPress={() => this.props.navigation.navigate('Testing')}
                                >
                                    <View>
                                        <Icon
                                            name='handbag'
                                            type='simple-line-icon'
                                            size={30}
                                            iconStyle={styles._iconStyle}
                                        />
                                        <Text
                                            style={styles._textStyle}
                                        >
                                            Testing
                                    </Text>
                                    </View>
                                </TouchableRipple>
                            </View >
                        </View>
                    </View>
                    <Modal
                        isVisible={this.state.showNotifications}
                        backdropColor='transparent'
                        onBackdropPress={this.hideNotifications}
                        animationIn='slideInRight'
                        animationOut='slideOutRight'
                    // onDismiss={hideNotifications}
                    >

                        <View
                            style={styles.notificationView}
                        >
                            <Text
                                style={styles.notificationTitle}
                            >
                                Notifications
                        </Text>
                            {!this.state.notificationCount ?
                                <Text
                                    style={{
                                        marginTop: 10,
                                        textAlign: 'center'
                                    }}
                                >No unread notifications</Text>
                                :
                                <FlatList
                                    ListFooterComponent={() => {
                                        return (
                                            this.state.listLoader && this.state.intitialNotifications.length !== this.state.notificationCount ?
                                                <View
                                                    style={{
                                                        margin: 10,
                                                    }}
                                                >
                                                    <MaterialIndicator
                                                        animationEasing={Easing.linear}
                                                        size={20}
                                                        color={colors.black}
                                                    />
                                                </View>
                                                : null
                                        )
                                    }}
                                    data={this.state.intitialNotifications}
                                    onEndReached={this.loadMoreNotifications}
                                    ItemSeparatorComponent={() => {
                                        return (
                                            <View style={styles.itemSeparator} />
                                        )
                                    }}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            style={styles.itemContainer}
                                        >
                                            <Text style={styles.itemText}>{index + 1}</Text>
                                            <Text
                                                style={styles.itemText}
                                            >{item.message}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                        </View>
                    </Modal>
                </ScrollView >
        );
    }
}

// function App(props) {
//     const [notificationCount, setNotificationCount] = useState('')
//     const [notifications, setNotifications] = useState([])
//     const [intitialNotifications, setInititalNotifications] = useState([])
//     const [page, setPage] = useState(1)
//     const [listLoader, setListLoader] = useState(false)


//     const [showNotifications, setShowNotification] = useState(false)

//     const [loading, setLoading] = useState(true)

//     const [dashboard, updateDashboard] = useState('')

//     const [order_time, setOrder_Time] = useState([]);
//     const [order_noOforder, setOrder_NoOfOrder] = useState([]);

//     const [amount_time, setAmount_Time] = useState([]);
//     const [amount_noOforder, setAmount_NoOfOrder] = useState([]);

//     const [credit_time, setCredit_Time] = useState([]);
//     const [credit_noOforder, setCredit_NoOfOrder] = useState([]);

//     const [recentProducts, setRecentProducts] = useState()

//     const hideNotifications = () => {
//         setShowNotification(false)
//         console.log(showNotifications)
//     }

//     App.navigationOptions = ({ navigation }) => ({
//         headerRight: () =>
//             <TouchableRipple
//                 onPress={() => {
//                     setShowNotification(true)
//                 }}
//             >
//                 <View>
//                     <Icon
//                         name='ios-notifications-outline'
//                         type='ionicon'
//                         size={26}
//                         color={colors.white}
//                         iconStyle={{
//                             padding: 8,
//                             paddingRight: 12
//                         }}
//                     />
//                     <Badge
//                         style={{
//                             position: 'absolute',
//                             top: 5,
//                             right: 5,
//                         }}
//                         size={16}
//                     >
//                         {
//                             notificationCount ? notificationCount : 0
//                         }
//                     </Badge>
//                 </View>
//             </TouchableRipple>

//         ,
//     })

//     useEffect(() => {
//         Axios.get(Apis.Dashboard + `?customer_id=${13}`, { headers: header }).then(res => {
//             updateDashboard(res.data)
//             res.data.order_chart_data.map((val) => {
//                 order_time.push(val.time)
//             })
//             res.data.order_chart_data.map((val) => {
//                 order_noOforder.push(parseInt(val.number_of_order))
//             })

//             res.data.order_chart_data.map((val) => {
//                 amount_time.push(val.time)
//             })
//             res.data.order_chart_data.map((val) => {
//                 amount_noOforder.push(parseInt(val.number_of_order))
//             })

//             res.data.order_chart_data.map((val) => {
//                 credit_time.push(val.time)
//             })
//             res.data.order_chart_data.map((val) => {
//                 credit_noOforder.push(parseInt(val.number_of_order))
//             })
//             Axios.get(Apis.Notifications + `/unreadCount?customer_id=${13}`, { headers: header }).then(res => {
//                 setNotificationCount(res.data)
//             }).catch(err => console.warn(err.message))
//             Axios.get(Apis.Notifications + `?customer_id=${13}&searchCriteria[sortOrders][0][field]=is_read`, { headers: header }).then(res => {
//                 console.log(res.data.items)
//                 res.data.items.map(item => {
//                     item.is_read == false ? notifications.push(item) : null
//                     console.log('ek item', item)
//                 })
//                 console.log('saved notifications', notifications)
//                 setInititalNotifications(notifications.slice(0, 5))
//             }).catch(err => console.warn('No noti', err.message))
//             Axios.get(Apis.Products + `?customer_id=${13}&searchCriteria[sortOrders][0][field]=updated_at&searchCriteria[pageSize]=3`, { headers: header }).then(res => {
//                 setLoading(false)
//                 setRecentProducts(res.data.items)
//             }).catch(err => console.warn(err.message))
//         }).catch(err => {
//             console.warn(err.message)
//             setLoading(false)
//         })



//     }, [])


//     const loadMoreNotifications = () => {
//         setListLoader(true)
//         setTimeout(() => {
//             const start = page * 5;
//             const end = (page + 1) * 5;
//             setPage(page + 1)
//             const newData = notifications.slice(start, end); // here, we will receive next batch of the items
//             setInititalNotifications([...intitialNotifications, ...newData])
//         }, 1500);
//     }

//     return (
//         loading ?
//             <View
//                 style={{
//                     flex: 1,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                 }}
//             >
//                 <BarIndicator
//                     animationEasing={Easing.linear}
//                     count={4}
//                     color={colors.black}
//                 />
//             </View>
//             :
//             <ScrollView contentContainerStyle={styles.scrollView}>
//                 <View
//                     style={styles.container}
//                 >

//                     <View
//                         style={styles.dashboard}
//                     >
//                         <Text
//                             style={styles.heading}
//                         >Dashboard</Text>
//                         <View
//                             style={styles.dashboardButtonView}
//                         >
//                             <TouchableRipple
//                                 style={[styles.dashboardButton, { backgroundColor: colors.dashboardRed }]}
//                             >
//                                 <View>
//                                     <Text
//                                         style={[styles.dashboardTextHead, { fontSize: dashboard ? dashboard.credit_amount.length > 12 ? 20 : 25 : 25 }]}
//                                     >
//                                         {dashboard.credit_amount}
//                                     </Text>
//                                     <Text
//                                         style={styles.dashboardText}
//                                     >Credit Amount</Text>
//                                 </View>
//                             </TouchableRipple>
//                             <TouchableRipple
//                                 style={[styles.dashboardButton, { backgroundColor: colors.dashboardYellow }]}
//                             >
//                                 <View>
//                                     <Text
//                                         style={[styles.dashboardTextHead, { fontSize: dashboard ? dashboard.lifetime_sales.length > 12 ? 20 : 25 : 25 }]}
//                                     >{dashboard.lifetime_sales}</Text>
//                                     <Text
//                                         style={styles.dashboardText}
//                                     >Lifetime Sales</Text>
//                                 </View>
//                             </TouchableRipple>
//                             <TouchableRipple
//                                 style={[styles.dashboardButton, { backgroundColor: colors.dashboardGreen }]}
//                             >
//                                 <View>
//                                     <Text
//                                         style={[styles.dashboardTextHead, { fontSize: dashboard ? dashboard.average_orders.length > 12 ? 20 : 25 : 25 }]}
//                                     >{dashboard.average_orders}</Text>
//                                     <Text
//                                         style={styles.dashboardText}
//                                     >Average Orders</Text>
//                                 </View>
//                             </TouchableRipple>
//                             <TouchableRipple
//                                 style={[styles.dashboardButton, { backgroundColor: colors.dashbboardPurple }]}
//                             >
//                                 <View>
//                                     <Text
//                                         style={[styles.dashboardTextHead, { fontSize: dashboard ? dashboard.total_products.length > 12 ? 20 : 25 : 25 }]}
//                                     >{dashboard.total_products}</Text>
//                                     <Text
//                                         style={styles.dashboardText}
//                                     >Total Products</Text>
//                                 </View>
//                             </TouchableRipple>
//                         </View>
//                     </View>

//                     <View
//                         style={styles.chartView}
//                     >
//                         <Tabs
//                             tabBarUnderlineStyle={{
//                                 height: 2,
//                                 backgroundColor: colors.white
//                             }}
//                             renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
//                         >
//                             <Tab
//                                 activeTextStyle={styles.activeTabTextSub}
//                                 textStyle={styles.tabTextSub}
//                                 tabStyle={styles.tabStyleSub}
//                                 activeTabStyle={styles.activeTabStyleSub}
//                                 heading="Orders">
//                                 <LineChart
//                                     data={{
//                                         labels: order_time.slice(order_time.length - 5, order_time.length),

//                                         datasets: [
//                                             {
//                                                 data: order_noOforder.slice(0, 5)
//                                                 // data: [1, 4, 3, 2.5, 6]

//                                             }
//                                         ]
//                                     }}
//                                     width={Dimensions.get("window").width} // from react-native
//                                     height={220}
//                                     chartConfig={{
//                                         backgroundColor: colors.blue,
//                                         backgroundGradientFrom: colors.white,
//                                         backgroundGradientTo: colors.dashboardGreen,
//                                         decimalPlaces: 2, // optional, defaults to 2dp
//                                         color: (opacity = 1) => colors.dashbboardPurple,
//                                         labelColor: (opacity = 1) => colors.dashbboardPurple,
//                                         style: {
//                                             borderRadius: 16
//                                         },
//                                         propsForDots: {
//                                             r: "6",
//                                             strokeWidth: "2",
//                                             stroke: colors.blue
//                                         }
//                                     }}
//                                     bezier
//                                 />
//                             </Tab>
//                             <Tab
//                                 activeTextStyle={styles.activeTabTextSub}
//                                 textStyle={styles.tabTextSub}
//                                 tabStyle={styles.tabStyleSub}
//                                 activeTabStyle={styles.activeTabStyleSub}
//                                 heading="Amounts">
//                                 <LineChart
//                                     data={{
//                                         labels: amount_time.slice(amount_time.length - 5, amount_time.length),

//                                         datasets: [
//                                             {
//                                                 data: amount_noOforder.slice(0, 5)
//                                                 // data: [5, 3, 3, 2.5, 10]

//                                             }
//                                         ]
//                                     }}
//                                     width={Dimensions.get("window").width} // from react-native
//                                     height={220}
//                                     chartConfig={{
//                                         backgroundColor: colors.blue,
//                                         backgroundGradientFrom: colors.white,
//                                         backgroundGradientTo: colors.dashboardGreen,
//                                         decimalPlaces: 2, // optional, defaults to 2dp
//                                         color: (opacity = 1) => colors.dashbboardPurple,
//                                         labelColor: (opacity = 1) => colors.dashbboardPurple,
//                                         style: {
//                                             borderRadius: 16
//                                         },
//                                         propsForDots: {
//                                             r: "6",
//                                             strokeWidth: "2",
//                                             stroke: colors.blue
//                                         }
//                                     }}
//                                     bezier
//                                 />
//                             </Tab>
//                             <Tab
//                                 activeTextStyle={styles.activeTabTextSub}
//                                 textStyle={styles.tabTextSub}
//                                 tabStyle={styles.tabStyleSub}
//                                 activeTabStyle={styles.activeTabStyleSub}
//                                 heading="Credits">
//                                 <LineChart
//                                     data={{
//                                         labels: credit_time.slice(credit_time.length - 5, credit_time.length),
//                                         datasets: [
//                                             {
//                                                 data: credit_noOforder.slice(0, 5)
//                                                 // data: [9, 4, 0, 2.5, 6]
//                                             }
//                                         ]
//                                     }}
//                                     width={Dimensions.get("window").width} // from react-native
//                                     height={220}
//                                     chartConfig={{
//                                         backgroundColor: colors.blue,
//                                         backgroundGradientFrom: colors.white,
//                                         backgroundGradientTo: colors.dashboardGreen,
//                                         decimalPlaces: 2, // optional, defaults to 2dp
//                                         color: (opacity = 1) => colors.dashbboardPurple,
//                                         labelColor: (opacity = 1) => colors.dashbboardPurple,

//                                         style: {
//                                             borderRadius: 16
//                                         },
//                                         propsForDots: {
//                                             r: "6",
//                                             strokeWidth: "2",
//                                             stroke: colors.blue
//                                         }
//                                     }}
//                                     bezier
//                                 />
//                             </Tab>
//                         </Tabs>
//                     </View>

//                     <View
//                         style={styles.recentProductsContainer}
//                     >
//                         <Text
//                             style={styles.heading}
//                         >Recently Added Products</Text>
//                         <View>
//                             <FlatList
//                                 data={recentProducts}
//                                 renderItem={({ item }) => (
//                                     <View
//                                         style={styles.recentProducts}
//                                     >
//                                         <Text
//                                             style={{ flex: 2 }}
//                                         >{item.name}</Text>
//                                         <Image
//                                             source={{ uri: item.thumbnail_url }}
//                                             resizeMode='contain'
//                                             style={{
//                                                 flex: 1,
//                                                 width: 100,
//                                                 height: 100
//                                             }}
//                                         />
//                                     </View>
//                                 )}
//                             />
//                         </View>
//                         <TouchableRipple
//                             rippleColor={colors.white}
//                             underlayColor={colors.white}
//                             style={styles.viewAllProducts}
//                             onPress={() => props.navigation.navigate('Products')}
//                         >
//                             <Text
//                                 style={{ color: colors.white }}
//                             >View All Products</Text>
//                         </TouchableRipple>
//                     </View>
//                     <View
//                         style={styles.storeManagementContainer}
//                     >
//                         <Text
//                             style={styles.heading}
//                         >Store Management</Text>
//                         <View
//                             style={styles.storeMngmtButton}
//                         >
//                             <TouchableRipple
//                                 style={styles.mainButtons}
//                                 rippleColor={colors.white}
//                                 underlayColor={colors.white}
//                                 onPress={() => props.navigation.navigate({ routeName: 'AddProduct', transitionStyle: 'inverted' })}
//                             >
//                                 <View>
//                                     <Icon
//                                         name='ios-add-circle-outline'
//                                         type='ionicon'
//                                         size={30}
//                                         iconStyle={styles._iconStyle}
//                                     />
//                                     <Text
//                                         style={styles._textStyle}
//                                     >
//                                         Add Product
//                                     </Text>
//                                 </View>
//                             </TouchableRipple>

//                             <TouchableRipple
//                                 style={styles.mainButtons}
//                                 rippleColor={colors.white}
//                                 underlayColor={colors.white}
//                                 onPress={() => props.navigation.navigate('Orders')}
//                             >
//                                 <View>
//                                     <Icon
//                                         name='clipboard-pencil'
//                                         type='foundation'
//                                         size={30}
//                                         iconStyle={styles._iconStyle}
//                                     />
//                                     <Text
//                                         style={styles._textStyle}
//                                     >
//                                         Orders
//                                     </Text>
//                                 </View>
//                             </TouchableRipple>
//                             <TouchableRipple
//                                 style={styles.mainButtons}
//                                 rippleColor={colors.white}
//                                 underlayColor={colors.white}
//                                 onPress={() => props.navigation.navigate('Products')}
//                             >
//                                 <View>
//                                     <Icon
//                                         name='handbag'
//                                         type='simple-line-icon'
//                                         size={30}
//                                         iconStyle={styles._iconStyle}
//                                     />
//                                     <Text
//                                         style={styles._textStyle}
//                                     >
//                                         Products
//                                     </Text>
//                                 </View>
//                             </TouchableRipple>
//                         </View >
//                     </View>
//                 </View>
//                 <Modal
//                     isVisible={showNotifications}
//                     backdropColor='transparent'
//                     onBackdropPress={hideNotifications}
//                     animationIn='slideInRight'
//                     animationOut='slideOutRight'
//                 // onDismiss={hideNotifications}
//                 >

//                     <View
//                         style={styles.notificationView}
//                     >
//                         <Text
//                             style={styles.notificationTitle}
//                         >
//                             Notifications
//                         </Text>
//                         {!notificationCount ?
//                             <Text
//                                 style={{
//                                     marginTop: 10,
//                                     textAlign: 'center'
//                                 }}
//                             >No unread notifications</Text>
//                             :
//                             <FlatList
//                                 ListFooterComponent={() => {
//                                     return (
//                                         listLoader && intitialNotifications.length !== notificationCount  ?
//                                             <View
//                                                 style={{
//                                                     margin:10,
//                                                 }}
//                                             >
//                                                 <MaterialIndicator
//                                                     animationEasing={Easing.linear}
//                                                     size={20}
//                                                     color={colors.black}
//                                                 />
//                                             </View>
//                                             : null
//                                     )
//                                 }}
//                                 data={intitialNotifications}
//                                 onEndReached={loadMoreNotifications}
//                                 ItemSeparatorComponent={() => {
//                                     return (
//                                         <View style={styles.itemSeparator} />
//                                     )
//                                 }}
//                                 renderItem={({ item, index }) => (
//                                     <TouchableOpacity
//                                         style={styles.itemContainer}
//                                     >
//                                         <Text style={styles.itemText}>{index + 1}</Text>
//                                         <Text
//                                             style={styles.itemText}
//                                         >{item.message}</Text>
//                                     </TouchableOpacity>
//                                 )}
//                             />
//                         }
//                     </View>
//                 </Modal>
//             </ScrollView >

//     )
// }

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
        width: '100%'
    },
    notificationView: {
        position: 'absolute',
        top: 35,
        right: 0,
        backgroundColor: colors.white,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderWidth: 3,
        borderLeftWidth: 1.5,
        borderRightWidth: 1.5,
        borderColor: colors.blue,
        paddingTop: 12,
        width: '90%',
        minHeight: 100,
        maxHeight: 400,
        elevation: 10,
    },
    notificationTitle: {
        fontSize: 20,
        color: colors.black,
        fontWeight: 'bold',
        padding: 8,
        paddingTop: 0,
        paddingLeft: 8,
        borderBottomWidth: 2,
        borderBottomColor: colors.blue
    },
    itemSeparator: {
        width: "80%",
        alignSelf: 'center',
        height: 10,
        backgroundColor: colors.white,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    itemContainer: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: colors.lightBlue + '11'
    },
    itemText: {
        padding: 6,
        color: colors.black,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    dashboard: {
        width: '100%',
        backgroundColor: colors.backgroundGray,
        marginBottom: 10
    },
    heading: {
        color: '#2c2c2fdd',
        margin: 12,
        marginBottom: 0,
        alignSelf: 'flex-start',
        fontSize: 20,
        fontWeight: 'bold'
    },
    dashboardButtonView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'space-around',
        height: 180,
        marginBottom: 10,
    },
    dashboardButton: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '45%',
        height: 80,
    },
    dashboardTextHead: {
        marginLeft: 8,
        height: '60%',
        color: colors.white,
        fontWeight: 'bold',
    },
    dashboardText: {
        marginLeft: 8,
        height: '40%',
        color: colors.white,
        fontSize: 16,
    },
    chartView: {
        width: '100%',
        backgroundColor: colors.backgroundGray,
        paddingBottom: 10,
        marginBottom: 10
    },
    tabStyleSub: {
        width: '33%',
        backgroundColor: colors.backgroundGray,
    },
    activeTabStyleSub: {
        backgroundColor: colors.white,
        width: '34%',
    },
    tabTextSub: {
        color: colors.black
    },
    activeTabTextSub: {
        color: colors.blue,
        fontSize: 25,
        fontWeight: 'bold',
    },
    recentProductsContainer: {
        width: '100%',
        backgroundColor: colors.backgroundGray,
        marginBottom: 10,
    },
    recentProducts: {
        backgroundColor: colors.white,
        margin: 8,
        marginBottom: 0,
        padding: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewAllProducts: {
        backgroundColor: colors.lightBlue,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    storeManagementContainer: {
        width: '100%',
        backgroundColor: colors.backgroundGray
    },
    storeMngmtButton: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginBottom: 8,
    },
    mainButtons: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    _iconStyle: {
        color: colors.lightBlue,
        margin: 5,
    },
    _textStyle: {
        color: colors.lightBlue
    },
});

export default App;