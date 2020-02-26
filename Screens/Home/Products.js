import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Easing,
} from 'react-native';
import {
  Icon
} from 'react-native-elements'
import colors from '../../colors/colors'
import Modal from 'react-native-modal'
import { List, TouchableRipple } from 'react-native-paper'
import Axios from 'axios';
import { Apis, header } from '../../Apis/api'
import { MaterialIndicator } from 'react-native-indicators';

function App() {

  const [sortOpen, setSortOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState('New-Old')
  const [newOld, setNewOld] = useState(true)
  const [oldNew, setOldNew] = useState(false)
  const [closestExpire, setClosestExpire] = useState(false)
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [listLoader, setListLoader] = useState(false)
  const [openBottomDrawer, setOpenBottomDrawer] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const getProducts = async () => {
    setListLoader(true)
    await Axios.get(Apis.Products + `?customer_id=${global.customer_id}&searchCriteria[pageSize]=${20}&searchCriteria[currentPage]=${page}`, { headers: header }).then(res => {
    
      setProducts([...products, ...res.data.items]);
      setTotalProducts(res.data.total_count)
      setRefreshing(false)
    })
  }

  useEffect(() => {
    getProducts()
  }, [page]);

  // const handleSortAccordion = () => {
  //   setSortOpen(!sortOpen)
  // }

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

  const loadMoreProducts = () => {
    if (totalProducts < products.length) {
      setListLoader(true)
      setTimeout(() => {
        setPage(page + 1)
        setListLoader(false)
      }, 1000);
    }
    else {
      setListLoader(false)
    }
  }

  const onRefresh = ()=>{
    
    setRefreshing(true)
    setProducts([])
    getProducts()
  }

  return (
    <View
      style={styles.main}
    >

      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={products}
        onEndReached={loadMoreProducts}
        ListFooterComponent={
          listLoader && products.length <= totalProducts ?
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
        renderItem={({ item }) => (
          <TouchableRipple
            onPress={() => setOpenBottomDrawer(true)}
            style={{
              backgroundColor: colors.white,
              marginVertical: 3,
              marginHorizontal: 6,
              // borderWidth: 0.7,
              // borderColor: colors.textGray,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Image
                source={{ uri: "https://rocket.pk/media/catalog/product" + item.custom_attributes[1].value }}
                resizeMode='contain'
                style={{
                  width: 100,
                  height: 100
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <Text>{item.name}</Text>
                <Text>{item.sku}</Text>
                <Text>{item.price}</Text>
                <Text>{item.qty}</Text>
              </View>
            </View>
          </TouchableRipple>
        )}
      />
      <Modal
        isVisible={openBottomDrawer}
        backdropColor='transparent'
        onBackdropPress={() => setOpenBottomDrawer(false)}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}
      >
        <View style={styles.panel}>
          <TouchableRipple
            onPress={() => this.props.navigation.navigate('Products')}
          >
            <View
              style={styles.panelButton}
            >
              <Text style={styles.panelButtonTitle}>Edit</Text>
              <Icon
                name='file-document-edit'
                type='material-community'
              />
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => this.props.navigation.navigate('Products')}
          >
            <View
              style={styles.panelButton}
            >
              <Text style={styles.panelButtonTitle}>Deactivate</Text>
              <Icon
                name='cancel'
                type='material-community'
              />
            </View>
          </TouchableRipple><TouchableRipple
            onPress={() => this.props.navigation.navigate('Products')}
          >
            <View
              style={styles.panelButton}
            >
              <Text style={styles.panelButtonTitle}>Delete</Text>
              <Icon
                name='delete'
                type='antdesign'
              />
            </View>
          </TouchableRipple>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.backgroundGray,
    flex: 1,
    width: '100%'
  },
  panel: {
    height: 220,
    padding: 10,
    backgroundColor: '#2c2c2fAA',
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  panelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#292929',
    backgroundColor: '#eee',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
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