import React from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Easing,
} from 'react-native';
import {
    Text,
    Button
} from 'native-base';
import {
    Input,
    Icon
} from 'react-native-elements'
import colors from '../../colors/colors';
import NestedListView, { NestedRow } from 'react-native-nested-listview';
import Axios from 'axios';
import {
    Portal,
    Dialog,
    Provider,
    RadioButton,
} from 'react-native-paper'
import {
    BarIndicator
} from 'react-native-indicators'

import { Apis, header } from '../../Apis/api';



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,

            productName: '',
            productNameChange: false,
            productNamePlaceHolder: 'Abc Product',


            finalNode: false,
            category: [],
            selectedCategory: '',

            brandName: '',
            brandNameChange: false,
            brandNamePlaceHolder: 'Nike',
            brandsDialogVisible: false,

            modelName: '',
            modelNameChange: false,
            modelNamePlaceHolder: 'E6430',

            highlights: '',
            highlightsChange: false,
            highlightsPlaceHolder: 'Enter a minimum of three short highlights of the product to make the purchase decision easier for the customer. Please format as a bulleted list',

            prodDesc: '',
            prodDescChange: false,
            prodDescPlaceHolder: 'The product description should give the customer useful information about the product to ensure a purchase',

            videoUrl: '',
            videoUrlChange: false,
            videoUrlPlaceHolder: 'rocket.com/video'
        }
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitleStyle: {
            color: colors.white,
        },
        headerStyle: {
            backgroundColor: colors.red
        },
        headerLeft: () =>
            <Icon
                iconStyle={{ padding: 10, color: '#fff' }}
                name='ios-arrow-back'
                type='ionicon'
                size={20}
                hitSlop={{
                    top: 20,
                    bottom: 20,
                    right: 20,
                    left: 20,
                }}
                onPress={() => navigation.goBack()} />
        ,
        headerRight: () => null,
    })

    getChildrenName = node => {
        if (node.hasSubCategory) {
            return 'subCategory'
        }
        else {
            return null
        }
    }
    showBrandsDialog = () => {
        this.setState({ brandsDialogVisible: true })
    }
    hideBrandsDialog = () => {
        this.setState({ brandsDialogVisible: false })
    }

    componentDidMount() {
        Axios.get(Apis.GetCategories, { headers: header }).then(res => {
            this.setState({
                category: [res.data.children_data[0]],
                loading: false
            })
        }).catch(err => {
            console.warn(err.message);
            this.setState({
                loading: false,
            })
        })
    }
    render() {
        const {
            loading,
            productName, productNameChange, productNamePlaceHolder,
            category, selectedCategory, finalNode,
            brandName, brandNameChange, brandNamePlaceHolder, brandsDialogVisible,
            modelName, modelNameChange, modelNamePlaceHolder,
            highlights, highlightsChange, highlightsPlaceHolder,
            prodDesc, prodDescChange, prodDescPlaceHolder,
            videoUrl, videoUrlChange, videoUrlPlaceHolder,
        } = this.state

        return (
            loading ?
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
                        color={colors.red}
                    />
                </View>
                :
                <Provider>
                    <ScrollView
                        style={styles.main}
                    >
                        <Input
                            keyboardType='default'
                            onChangeText={text => {
                                this.setState({
                                    productNameChange: true,
                                    productName: text,
                                })
                            }}
                            onFocus={() => this.setState({ productNamePlaceHolder: '' })}
                            onBlur={() => {
                                if (productNameChange === false || productName === '') {
                                    this.setState({
                                        productNamePlaceHolder: 'Abc Product',
                                        productNameChange: false
                                    })
                                }
                            }}
                            inputStyle={styles.inputFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '100%' }}
                            label='Product Name'
                            labelStyle={productNameChange ? styles.label : styles.labelFilled}
                            placeholder={productNamePlaceHolder}
                            leftIcon={
                                <Icon
                                    type='antdesign'
                                    name='dropbox'
                                    color={productNameChange ? colors.green : colors.red}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                        <NestedListView
                            data={category}
                            getChildrenName={(node) => 'children_data'}
                            onNodePressed={(node) => node.children_data.length > 0 ? null : this.setState({ finalNode: true, selectedCategory: node.name }, console.log(node))}

                            renderNode={(node, level) => (
                                <NestedRow
                                    children={node.children_data}
                                    paddingLeftIncrement={level * 2.5}
                                    level={level}
                                >
                                    <View
                                        style={finalNode && level == 1 ? styles.categoryFinal : styles.categoryItem}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Text>{level == 1 ? 'Category' : node.name}</Text>
                                            <Text>{level == 1 ? selectedCategory : null}</Text>
                                        </View>
                                        {
                                            node.children_data.length > 0 ?
                                                <Icon
                                                    name='right'
                                                    type='antdesign'
                                                    size={15}
                                                    iconStyle={{
                                                        marginLeft: 10,
                                                    }}
                                                /> : null
                                        }
                                    </View>
                                </NestedRow>
                            )}
                        />

                        {/* { */}
                        {/* // selectedCategory ? */}
                        <Input
                            value={brandName}
                            keyboardType='default'
                            onChangeText={text => {
                                this.setState({
                                    brandNameChange: true,
                                    brandName: text,
                                })
                            }}
                            onFocus={() => this.setState({ brandNamePlaceHolder: '' })}
                            onBlur={() => {
                                if (brandNameChange === false || brandName === '') {
                                    this.setState({
                                        brandNamePlaceHolder: 'Nike',
                                        brandNameChange: false
                                    })
                                }
                            }}
                            inputStyle={styles.inputFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '100%' }}
                            label='Brand'
                            labelStyle={brandNameChange ? styles.label : styles.labelFilled}
                            placeholder={brandNamePlaceHolder}
                            leftIcon={
                                <Icon
                                    type='zocial'
                                    name='blogger'
                                    color={brandNameChange ? colors.green : colors.red}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                            rightIcon={
                                <Icon
                                    type='antdesign'
                                    name='right'
                                    size={16}
                                    onPress={this.showBrandsDialog}
                                    hitSlop={{
                                        top: 20,
                                        bottom: 20,
                                        right: 20,
                                        left: 20,
                                    }}
                                />
                            }
                            rightIconContainerStyle={styles.rightIconContainer}
                        />
                        <Portal>
                            <Dialog
                                visible={brandsDialogVisible}
                                onDismiss={this.hideBrandsDialog}
                            >
                                <Dialog.Title>Dialog Box</Dialog.Title>
                                <Dialog.Content>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ brandName: 'Nikon', brandNameChange: true })
                                            this.hideBrandsDialog()
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <RadioButton
                                            value='Nikon'
                                            status={brandName === 'Nikon' ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({ brandName: 'Nikon', brandNameChange: true })}
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 15,
                                            }}
                                        >
                                            Nikon
                                    </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ brandName: 'Cannon', brandNameChange: true })
                                            this.hideBrandsDialog()
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <RadioButton
                                            value='Cannon'
                                            status={brandName === 'Cannon' ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({ brandName: 'Cannon', brandNameChange: true })}
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 15,
                                            }}
                                        >
                                            Cannon
                                    </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ brandName: 'Sony', brandNameChange: true })
                                            this.hideBrandsDialog()
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <RadioButton
                                            value='Sony'
                                            status={brandName === 'Sony' ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({ brandName: 'Sony', brandNameChange: true })}
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 15,
                                            }}
                                        >
                                            Sony
                                    </Text>
                                    </TouchableOpacity>
                                </Dialog.Content>
                            </Dialog>
                        </Portal>

                        <Input
                            value={modelName}
                            keyboardType='default'
                            onChangeText={text => {
                                this.setState({
                                    modelNameChange: true,
                                    modelName: text,
                                })
                            }}
                            onFocus={() => this.setState({ modelNamePlaceHolder: '' })}
                            onBlur={() => {
                                if (modelNameChange === false || modelName === '') {
                                    this.setState({
                                        modelNamePlaceHolder: 'E6430',
                                        modelNameChange: false
                                    })
                                }
                            }}
                            inputStyle={styles.inputFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '100%' }}
                            label='Model'
                            labelStyle={modelNameChange ? styles.label : styles.labelFilled}
                            placeholder={modelNamePlaceHolder}
                            leftIcon={
                                <Icon
                                    type='antdesign'
                                    name='creditcard'
                                    color={modelNameChange ? colors.green : colors.red}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                        <Input
                            multiline={true}
                            textAlignVertical={'top'}
                            value={highlights}
                            keyboardType='default'
                            onChangeText={text => {
                                this.setState({
                                    highlightsChange: true,
                                    highlights: text,
                                })
                            }}
                            onFocus={() => this.setState({ highlightsPlaceHolder: '' })}
                            onBlur={() => {
                                if (highlightsChange === false || highlights === '') {
                                    this.setState({
                                        highlightsPlaceHolder: 'Enter a minimum of three short highlights of the product to make the purchase decision easier for the customer.Please format as a bulleted list',
                                        highlightsChange: false
                                    })
                                }
                            }}
                            inputStyle={styles.multilineFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '100%' }}
                            label='Highlights'
                            labelStyle={highlightsChange ? styles.label : styles.labelFilled}
                            placeholder={highlightsPlaceHolder}
                            leftIcon={
                                <Icon
                                    type='material-community'
                                    name='format-color-highlight'
                                    color={highlightsChange ? colors.green : colors.red}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                        <Input
                            multiline={true}
                            textAlignVertical={'top'}
                            value={prodDesc}
                            keyboardType='default'
                            onChangeText={text => {
                                this.setState({
                                    prodDescChange: true,
                                    prodDesc: text,
                                })
                            }}
                            onFocus={() => this.setState({ prodDescPlaceHolder: '' })}
                            onBlur={() => {
                                if (prodDescChange === false || prodDesc === '') {
                                    this.setState({
                                        prodDescPlaceHolder: 'The product description should give the customer useful information about the product to ensure a purchase',
                                        prodDescChange: false
                                    })
                                }
                            }}
                            inputStyle={styles.multilineFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '100%' }}
                            label='Product Description'
                            labelStyle={prodDescChange ? styles.label : styles.labelFilled}
                            placeholder={prodDescPlaceHolder}
                            leftIcon={
                                <Icon
                                    type='material'
                                    name='description'
                                    color={prodDescChange ? colors.green : colors.red}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                        <Input
                            keyboardType='default'
                            onChangeText={text => {
                                this.setState({
                                    videoUrlChange: true,
                                    videoUrl: text,
                                })
                            }}
                            onFocus={() => this.setState({ videoUrlPlaceHolder: '' })}
                            onBlur={() => {
                                if (videoUrlChange === false || videoUrl === '') {
                                    this.setState({
                                        videoUrlPlaceHolder: 'rocket.com/video',
                                        videoUrlChange: false
                                    })
                                }
                            }}
                            inputStyle={styles.inputFields}
                            containerStyle={styles.inputContainer}
                            inputContainerStyle={{ width: '100%' }}
                            label='Video URL'
                            labelStyle={videoUrlChange ? styles.label : styles.labelFilled}
                            placeholder={videoUrlPlaceHolder}
                            leftIcon={
                                <Icon
                                    type='ionicon'
                                    name='ios-videocam'
                                    color={videoUrlChange ? colors.green : colors.red}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />

                        <TouchableOpacity
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            <View
                                style={styles.categoryItem}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Text>More Product Details</Text>
                                </View>
                                <Icon
                                    name='right'
                                    type='antdesign'
                                    size={15}
                                    iconStyle={{
                                        marginLeft: 10,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                        {/* // : null */}
                        {/* } */}
                    </ScrollView>
                </Provider>
        );
    }
};

const styles = StyleSheet.create({
    main: {
        flexGrow: 1,
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
    multilineFields: {
        padding: 6,
        fontSize: 14,
    },

    label: {
        fontWeight: '100',
        fontFamily: 'arial',
        fontSize: 14,
        marginLeft: 60,
        color: colors.green,
    },
    labelFilled: {
        fontWeight: '100',
        fontFamily: 'arial',
        fontSize: 14,
        marginLeft: 60,
        color: colors.red,
    },
    iconContainer: {
        paddingRight: 10,
        paddingBottom: 30
    },
    rightIconContainer: {
        paddingRight: 10,
        paddingBottom: 15,
    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 50,
        marginTop: 1.5,
        marginHorizontal: 10,
        backgroundColor: colors.tabGray,
        borderBottomWidth: 0.5,
        borderColor: colors.white,
    },
    categoryFinal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 50,
        marginTop: 1.5,
        marginHorizontal: 10,
        backgroundColor: colors.green + '80',
        borderBottomWidth: 0.5,
        borderColor: colors.white,
    },
});