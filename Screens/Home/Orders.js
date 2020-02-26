import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Easing,
  Image,
} from 'react-native';
import {
  Tab,
  Tabs,
  ScrollableTab
} from 'native-base';
import {
  Icon
} from 'react-native-elements'
import colors from '../../colors/colors'
import { Apis, header } from '../../Apis/api';
import { MaterialIndicator } from 'react-native-indicators';
import Axios from 'axios';
import { List, TouchableRipple } from 'react-native-paper';
function App() {
  const [openFilter, setOpenFilter] = useState(false)
  const [orderStatus, setOrderStatus] = useState('Pending')
  const [statusCode, setStatusCode] = useState('pending')
  const [page, setPage] = useState(1);
  const [pendingOrders, setPendingOrders] = useState([])
  const [pendingCount, setPendingCount] = useState(0)
  const [completeOrders, setCompleteOrders] = useState([])
  const [closedOrders, setClosedOrders] = useState([])
  const [canceledOrders, setCanceledOrders] = useState([])

  const [listLoader, setListLoader] = useState(false)


  const getOrders = async () => {
    setListLoader(true)
    await Axios.get(
      Apis.Orders +
      `?customer_id=${global.customer_id}&searchCriteria[pageSize]=${10}&searchCriteria[currentPage]=${page}&searchCriteria[filterGroups][0][filters][0][field]=status&searchCriteria[filterGroups][0][filters][0][value]=${statusCode}`,
      { headers: header }).then(res => {
        setCompleteOrders(res.data.items)
        setListLoader(false)
        console.log(res.data)
      }).catch(err => err.message)
  }

  useEffect(() => {
    getOrders()
  }, [page, statusCode]);

  App.navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {
      color: colors.white,
    },
    headerStyle: {
      backgroundColor: colors.blue
    },
    headerLeft: () =>
      <Icon
        iconStyle={{ padding: 10, color: '#fff' }}
        name='ios-arrow-back'
        type='ionicon'
        size={20}
        onPress={() => navigation.goBack()} />
    ,
    headerRight: () => null,
  })

  const loadMoreOrders = () => {
    // setListLoader(true)
    setTimeout(() => {
      setPage(page + 1)
      setListLoader(false)
    }, 1000);
  }
  const orderTypes = [
    {
      orderStatus: 'Processing',
      statusCode: 'processing'
    },
    {
      orderStatus: 'Suspected Fraud',
      statusCode: 'fraud'
    },
    {
      orderStatus: 'Pending Payment',
      statusCode: 'pending_payment'
    },
    {
      orderStatus: 'Payment Review',
      statusCode: 'payment_review'
    },
    {
      orderStatus: 'Payment Review',
      statusCode: 'payment_review'
    },
    {
      orderStatus: 'Pending',
      statusCode: 'pending'
    },
    {
      orderStatus: 'On Hold',
      statusCode: 'holded'
    },
    {
      orderStatus: 'Open',
      statusCode: 'STATE_OPEN'
    },
    {
      orderStatus: 'Complete',
      statusCode: 'complete'
    },
    {
      orderStatus: 'Closed',
      statusCode: 'closed'
    },
    {
      orderStatus: 'Canceled',
      statusCode: 'canceled'
    },
    {
      orderStatus: 'Paypal Canceled Reversal',
      statusCode: 'paypal_canceled_reversal'
    },
    {
      orderStatus: 'Pending Paypal',
      statusCode: 'pending_paypal'
    },
    {
      orderStatus: 'Paypal Reversed',
      statusCode: 'paypal_reversed'
    },
  ]

  return (
    <View
      style={styles.main}
    >
      <List.Accordion
        title={`Filter: ${orderStatus}`}
        expanded={openFilter}
        onPress={() => setOpenFilter(!openFilter)}
      >

        {orderTypes.map((item, index) =>
          <TouchableRipple
            onPress={() => {
              setOrderStatus(item.orderStatus)
              setStatusCode(item.statusCode)
              setOpenFilter(false)
              setListLoader(true)
            }}
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
              >{`${index + 1}. ${item.orderStatus}`}</Text>
            </View>
          </TouchableRipple>

        )}
      </List.Accordion>
      {listLoader ?
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
        :
        completeOrders.length > 1 ?
          <FlatList
            data={completeOrders}
            ListFooterComponent={
              listLoader ?
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
                </View> : null
            }
            onEndReached={loadMoreOrders}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: colors.white,
                  marginVertical: 2,
                  marginHorizontal: 5
                }}
              >
                <List.Accordion
                  left={props =>
                    <Image
                      source={{ uri: 'https://rocket.pk/media/catalog/product' + item.items[0].thumbnail }}
                      resizeMode='contain'
                      style={{
                        width: 50,
                        height: 50
                      }}
                    />}
                  title={item.customer_email}
                >
                  <List.Item
                    style={{
                    }}
                    left={props =>
                      <View
                        style={styles.accordionLeftMain}
                      >
                        <View
                          style={styles.accordionLeftFields}
                        >
                          <Text
                            style={styles.accordionLeftTextHead}
                          >ID: </Text>
                          <Text
                            style={styles.accordionLeftText}
                          >
                            {item.id}
                          </Text>
                        </View>
                        <View
                          style={styles.accordionLeftFields}
                        >
                          <Text
                            style={styles.accordionLeftTextHead}
                          >Name: </Text>
                          <Text
                            style={styles.accordionLeftText}
                          >
                            {item.name}
                          </Text>
                        </View>
                        <View
                          style={styles.accordionLeftFields}
                        >
                          <Text
                            style={styles.accordionLeftTextHead}
                          >SKU: </Text>
                          <Text
                            style={styles.accordionLeftText}
                          >
                            {item.sku}
                          </Text>
                        </View>
                        <View
                          style={styles.accordionLeftFields}
                        >
                          <Text
                            style={styles.accordionLeftTextHead}
                          >Price: </Text>
                          <Text
                            style={styles.accordionLeftText}
                          >
                            {item.price}
                          </Text>
                        </View>
                        <View
                          style={styles.accordionLeftFields}
                        >
                          <Text
                            style={styles.accordionLeftTextHead}
                          >Status: </Text>
                          <Text
                            style={styles.accordionLeftText}
                          >
                            {item.status}
                          </Text>
                        </View>
                        <View
                          style={styles.accordionLeftFields}
                        >
                          <Text
                            style={styles.accordionLeftTextHead}
                          >Is Featured From: </Text>
                          <Text
                            style={styles.accordionLeftText}
                          >
                            {item.created_at}
                          </Text>
                        </View>
                        <View
                          style={styles.accordionLeftFields}
                        >
                          <Text
                            style={styles.accordionLeftTextHead}
                          >Is Featured To: </Text>
                          <Text
                            style={styles.accordionLeftText}
                          >
                            {item.created_at}
                          </Text>
                        </View>
                      </View>
                    }
                  // right={props =>
                  //   <View
                  //     style={styles.accordionRight}
                  //   >
                  //     <Image
                  //       source={{ uri: "https://rocket.pk/media/catalog/product" + item.custom_attributes[1].value }}
                  //       resizeMode='contain'
                  //       style={{
                  //         width: '100%',
                  //         height: 200
                  //       }}
                  //     />
                  //   </View>
                  // }
                  />
                </List.Accordion>
              </View>
            )}
          />
          :
          <View
            style={{
              flex:1,
              justifyContent:'center',
              alignItems:'center',
            }}
          >
            <Text
              style={{
                fontSize:16
              }}
            >No Orders Found</Text>
          </View>

      }
    </View>

    // <Tabs
    //   tabBarUnderlineStyle={{
    //     height: 2,
    //     backgroundColor: colors.white
    //   }}
    //   locked={true}
    //   renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
    // >
    //   <Tab
    //     activeTextStyle={styles.activeTabText}
    //     textStyle={styles.tabText}
    //     tabStyle={styles.tabStyle}
    //     activeTabStyle={styles.activeTabStyle}
    //     heading="Forward Orders">

    //     <Tabs
    //       tabBarUnderlineStyle={{
    //         height: 2,
    //         backgroundColor: colors.white
    //       }}
    //       renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
    //     >
    //       <Tab
    //         activeTextStyle={styles.activeTabTextSub}
    //         textStyle={styles.tabTextSub}
    //         tabStyle={styles.tabStyleSub}
    //         activeTabStyle={styles.activeTabStyleSub}
    //         heading="Pending">
    //         <View
    //           style={styles.tabContent}
    //         >
    //           <FlatList
    //             data={completeOrders}
    //             ListFooterComponent={
    //               listLoader ?
    //                 <View
    //                   style={{
    //                     margin: 10,
    //                   }}
    //                 >
    //                   <MaterialIndicator
    //                     animationEasing={Easing.linear}
    //                     size={20}
    //                     color={colors.black}
    //                   />
    //                 </View> : null
    //             }
    //             onEndReached={loadMoreOrders}
    //             renderItem={({ item }) => (
    //               <View
    //                 style={{
    //                   backgroundColor: colors.white,
    //                   marginVertical: 2,
    //                   marginHorizontal: 5
    //                 }}
    //               >
    //                 <List.Accordion
    //                   left={props =>
    //                     <Image
    //                       source={{ uri: 'https://rocket.pk/media/catalog/product' + item.items[0].thumbnail }}
    //                       resizeMode='contain'
    //                       style={{
    //                         width: 50,
    //                         height: 50
    //                       }}
    //                     />}
    //                   title={item.customer_email}
    //                 >
    //                   <List.Item
    //                     style={{
    //                     }}
    //                     left={props =>
    //                       <View
    //                         style={styles.accordionLeftMain}
    //                       >
    //                         <View
    //                           style={styles.accordionLeftFields}
    //                         >
    //                           <Text
    //                             style={styles.accordionLeftTextHead}
    //                           >ID: </Text>
    //                           <Text
    //                             style={styles.accordionLeftText}
    //                           >
    //                             {item.id}
    //                           </Text>
    //                         </View>
    //                         <View
    //                           style={styles.accordionLeftFields}
    //                         >
    //                           <Text
    //                             style={styles.accordionLeftTextHead}
    //                           >Name: </Text>
    //                           <Text
    //                             style={styles.accordionLeftText}
    //                           >
    //                             {item.name}
    //                           </Text>
    //                         </View>
    //                         <View
    //                           style={styles.accordionLeftFields}
    //                         >
    //                           <Text
    //                             style={styles.accordionLeftTextHead}
    //                           >SKU: </Text>
    //                           <Text
    //                             style={styles.accordionLeftText}
    //                           >
    //                             {item.sku}
    //                           </Text>
    //                         </View>
    //                         <View
    //                           style={styles.accordionLeftFields}
    //                         >
    //                           <Text
    //                             style={styles.accordionLeftTextHead}
    //                           >Price: </Text>
    //                           <Text
    //                             style={styles.accordionLeftText}
    //                           >
    //                             {item.price}
    //                           </Text>
    //                         </View>
    //                         <View
    //                           style={styles.accordionLeftFields}
    //                         >
    //                           <Text
    //                             style={styles.accordionLeftTextHead}
    //                           >Status: </Text>
    //                           <Text
    //                             style={styles.accordionLeftText}
    //                           >
    //                             {item.status}
    //                           </Text>
    //                         </View>
    //                         <View
    //                           style={styles.accordionLeftFields}
    //                         >
    //                           <Text
    //                             style={styles.accordionLeftTextHead}
    //                           >Is Featured From: </Text>
    //                           <Text
    //                             style={styles.accordionLeftText}
    //                           >
    //                             {item.created_at}
    //                           </Text>
    //                         </View>
    //                         <View
    //                           style={styles.accordionLeftFields}
    //                         >
    //                           <Text
    //                             style={styles.accordionLeftTextHead}
    //                           >Is Featured To: </Text>
    //                           <Text
    //                             style={styles.accordionLeftText}
    //                           >
    //                             {item.created_at}
    //                           </Text>
    //                         </View>
    //                       </View>
    //                     }
    //                   // right={props =>
    //                   //   <View
    //                   //     style={styles.accordionRight}
    //                   //   >
    //                   //     <Image
    //                   //       source={{ uri: "https://rocket.pk/media/catalog/product" + item.custom_attributes[1].value }}
    //                   //       resizeMode='contain'
    //                   //       style={{
    //                   //         width: '100%',
    //                   //         height: 200
    //                   //       }}
    //                   //     />
    //                   //   </View>
    //                   // }
    //                   />
    //                 </List.Accordion>
    //               </View>
    //             )}
    //           />
    //         </View>
    //       </Tab>
    //       <Tab
    //         activeTextStyle={styles.activeTabTextSub}
    //         textStyle={styles.tabTextSub}
    //         tabStyle={styles.tabStyleSub}
    //         activeTabStyle={styles.activeTabStyleSub}
    //         heading="Ready to Ship">
    //         <View
    //           style={styles.tabContent}
    //         >
    //           <Text>No orders Found</Text>

    //         </View>
    //       </Tab>
    //       <Tab
    //         activeTextStyle={styles.activeTabTextSub}
    //         textStyle={styles.tabTextSub}
    //         tabStyle={styles.tabStyleSub}
    //         activeTabStyle={styles.activeTabStyleSub}
    //         heading="Shipped">
    //         <View
    //           style={styles.tabContent}
    //         >
    //           <Text>No orders Found</Text>

    //         </View>
    //       </Tab>
    //       <Tab
    //         activeTextStyle={styles.activeTabTextSub}
    //         textStyle={styles.tabTextSub}
    //         tabStyle={styles.tabStyleSub}
    //         activeTabStyle={styles.activeTabStyleSub}
    //         heading="Completed">
    //         <View
    //           style={styles.tabContent}
    //         >
    //           <Text>No orders Found</Text>

    //         </View>
    //       </Tab>
    //     </Tabs>
    //   </Tab>



    //   <Tab
    //     activeTextStyle={styles.activeTabText}
    //     textStyle={styles.tabText}
    //     tabStyle={styles.tabStyle}
    //     activeTabStyle={styles.activeTabStyle}
    //     heading="Return">
    //     <Tabs
    //       tabBarUnderlineStyle={{
    //         height: 2,
    //         backgroundColor: colors.white
    //       }}
    //       renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
    //     >
    //       <Tab
    //         activeTextStyle={styles.activeTabTextSub}
    //         textStyle={styles.tabTextSub}
    //         tabStyle={styles.tabStyleSub}
    //         activeTabStyle={styles.activeTabStyleSub}
    //         heading="Return Initiated">
    //         <View
    //           style={styles.tabContent}
    //         >
    //           <Text>No orders Found</Text>

    //         </View>
    //       </Tab>
    //       <Tab
    //         activeTextStyle={styles.activeTabTextSub}
    //         textStyle={styles.tabTextSub}
    //         tabStyle={styles.tabStyleSub}
    //         activeTabStyle={styles.activeTabStyleSub}
    //         heading="Return In Progress">
    //         <View
    //           style={styles.tabContent}
    //         >
    //           <Text>No orders Found</Text>

    //         </View>
    //       </Tab>
    //       <Tab
    //         activeTextStyle={styles.activeTabTextSub}
    //         textStyle={styles.tabTextSub}
    //         tabStyle={styles.tabStyleSub}
    //         activeTabStyle={styles.activeTabStyleSub}
    //         heading="Dispute In Progress">
    //         <View
    //           style={styles.tabContent}
    //         >
    //           <Text>No orders Found</Text>

    //         </View>
    //       </Tab>
    //       <Tab
    //         activeTextStyle={styles.activeTabTextSub}
    //         textStyle={styles.tabTextSub}
    //         tabStyle={styles.tabStyleSub}
    //         activeTabStyle={styles.activeTabStyleSub}
    //         heading="Refund Issued">
    //         <View
    //           style={styles.tabContent}
    //         >
    //           <Text>No orders Found</Text>

    //         </View>
    //       </Tab>
    //       <Tab
    //         activeTextStyle={styles.activeTabTextSub}
    //         textStyle={styles.tabTextSub}
    //         tabStyle={styles.tabStyleSub}
    //         activeTabStyle={styles.activeTabStyleSub}
    //         heading="Closed">
    //         <View
    //           style={styles.tabContent}
    //         >
    //           <Text>No orders Found</Text>

    //         </View>
    //       </Tab>
    //       <Tab
    //         activeTextStyle={styles.activeTabTextSub}
    //         textStyle={styles.tabTextSub}
    //         tabStyle={styles.tabStyleSub}
    //         activeTabStyle={styles.activeTabStyleSub}
    //         heading="Rejected">
    //         <View
    //           style={styles.tabContent}
    //         >
    //           <Text>No orders Found</Text>

    //         </View>
    //       </Tab>
    //     </Tabs>
    //   </Tab>
    // </Tabs>

  );
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  tabStyle: {
    backgroundColor: colors.white,
    flex: 1,
  },
  activeTabStyle: {
    backgroundColor: colors.lightBlue,
    flex: 1,
  },
  tabText: {
    color: colors.black
  },
  activeTabText: {
    color: colors.white,
  },
  tabContent: {
    flex: 1,
  },

  tabStyleSub: {
    backgroundColor: colors.white,
    borderWidth: 0.2,
    borderColor: colors.white
  },
  activeTabStyleSub: {
    backgroundColor: colors.lightBlue,
  },
  tabTextSub: {
    color: colors.black
  },
  activeTabTextSub: {
    color: colors.white,
  },
  accordionLeftMain: {
    width: '60%',
  },
  accordionLeftFields: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: 3,
  },
  accordionLeftTextHead: {
    color: colors.textGray,
    fontWeight: 'bold'
  },
  accordionLeftText: {
    color: colors.textGray
  },
  accordionRight: {
    width: '40%',
  },
});

export default App;




