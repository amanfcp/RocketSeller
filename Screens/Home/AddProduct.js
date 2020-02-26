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
    CheckBox
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
    Divider,
    Menu,
    Button,
    TouchableRipple,
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
            checked: [],
            selectedCategory: [],

            attributes: [],
            attributeMenuVisible: false,
            attributeSet: '',
            attributeSetId: '',

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
        headerTitle: 'Add Product',
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
            Axios.get(Apis.AttributeSet + '?searchCriteria[pageSize]=84', { headers: header }).then(res => {
                console.log('component did mount', res.data.items)
                this.setState({ attributes: [...res.data.items] })
            }).catch(err => console.log(err))
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

    isItemChecked(nodeName) {
        return this.state.checked.indexOf(nodeName) > -1
    }

    manageToggle = (evt, nodeName) => {
        if (this.isItemChecked(nodeName)) {
            this.setState({
                checked: this.state.checked.filter(i => i !== nodeName),
            })
            this.state.selectedCategory.splice(this.state.selectedCategory.indexOf(nodeName), 1)
        } else {
            this.setState({
                checked: [...this.state.checked, nodeName],
                selectedCategory: [...this.state.selectedCategory, nodeName]
            })
        }
    }

    toggleAttributeMenu = () => {
        this.setState({ attributeMenuVisible: !this.state.attributeMenuVisible })
    }

    render() {
        const {
            checked,
            loading,
            productName, productNameChange, productNamePlaceHolder,
            category, selectedCategory, finalNode,
            attributeMenuVisible, attributeSet, attributes,
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
                        color={colors.black}
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
                                    color={productNameChange ? colors.green : colors.lightBlue}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                        <NestedListView
                            data={category}
                            getChildrenName={(node) => 'children_data'}
                            onNodePressed={(node) =>
                                node.children_data.length > 0 ? null :
                                    !selectedCategory.includes(node.name) ?
                                        this.setState({
                                            checked: [...checked, node.name],
                                            selectedCategory: [...selectedCategory, node.name]
                                        }, console.warn(selectedCategory))
                                        :
                                        this.setState({
                                            finalNode: true,
                                        })
                            }
                            renderNode={(node, level) => (
                                <NestedRow
                                    children={node.children_data}
                                    paddingLeftIncrement={level * 2.5}
                                    level={level}
                                >
                                    <View
                                        style={styles.categoryItem}
                                    >
                                        <CheckBox
                                            style={{ marginRight: 20 }}
                                            checked={this.isItemChecked(node.name)}
                                            onPress={evt => { this.manageToggle(evt, node.name) }}
                                        />
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: colors.textGray
                                                }}
                                            >{level == 1 ? 'Category' : node.name}</Text>
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
                        <View
                            style={styles.selectedCategories}
                        >
                            {
                                selectedCategory.map(item => (
                                    <TouchableOpacity
                                        style={styles.selectedCategoryItem}
                                    >
                                        <Text
                                            ref={(text) => { this.textInput = text }}
                                            style={styles.selectedCategoryItemText}
                                        >{item}</Text>
                                        <Icon
                                            onPress={() => {
                                                if (this.isItemChecked(item)) {
                                                    this.setState({
                                                        checked: checked.filter(i => i !== item),
                                                    })
                                                    selectedCategory.splice(selectedCategory.indexOf(item), 1)
                                                }
                                            }}
                                            hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                                            size={16}
                                            underlayColor='transparent'
                                            iconStyle={styles.selectedCategoryItemIcon}
                                            name='cross'
                                            type='entypo'
                                            color={colors.white}
                                        />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <Menu
                            contentStyle={{
                                padding: 0,
                                margin: 0,
                                height: 250,
                            }}
                            visible={attributeMenuVisible}
                            onDismiss={this.toggleAttributeMenu}
                            anchor={
                                <TouchableRipple
                                    onPress={this.toggleAttributeMenu}
                                >
                                    <View
                                        style={styles.categoryItem}
                                    >
                                        <Text
                                            style={{
                                                color: colors.textGray
                                            }}
                                        >Attribute Set</Text>
                                        <Text
                                            style={{
                                                color: colors.textGray
                                            }}
                                        >
                                            {attributeSet}
                                        </Text>
                                    </View>
                                </TouchableRipple>
                            }
                            children=
                            {<ScrollView>
                                {attributes.map((item, index) => {
                                    return (
                                        item.attribute_set_name === 'Default' ? null :
                                            <Menu.Item
                                                onPress={() => {
                                                    this.toggleAttributeMenu()
                                                    this.setState({
                                                        attributeSet: item.attribute_set_name,
                                                        attributeSetId: item.attribute_set_id,
                                                    })
                                                }}
                                                title={`${index + 1}. ${item.attribute_set_name}`} />
                                    )
                                }
                                )}
                            </ScrollView>}
                        />
                        {/* <Input
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
                                    color={brandNameChange ? colors.green : colors.lightBlue}
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
                        </Portal> */}

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
                                    color={modelNameChange ? colors.green : colors.lightBlue}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                        {/* <Input
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
                                    color={highlightsChange ? colors.green : colors.lightBlue}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                         */}

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
                                    color={prodDescChange ? colors.green : colors.lightBlue}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        />
                        {/* <Input
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
                                    color={videoUrlChange ? colors.green : colors.lightBlue}
                                />
                            }
                            leftIconContainerStyle={styles.iconContainer}
                        /> */}

                        {/* <TouchableOpacity
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
                        </TouchableOpacity> */}

                        {/* // : null */}
                        {/* } */}
                    </ScrollView >
                </Provider >
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
        color: colors.lightBlue,
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
        backgroundColor: colors.lightBlue + '55',
        borderBottomWidth: 0.5,
        borderColor: colors.white,
    },
    selectedCategories: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        margin: 10,
        borderBottomColor: colors.textGray,
        borderBottomWidth: 0.8
    },
    selectedCategoryItem: {
        margin: 3,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderWidth: 0.8,
        borderColor: colors.dashboardYellow,
        borderRadius: 20,
    },
    selectedCategoryItemText: {
        paddingLeft: 4,
        textAlign: 'center',
        color: colors.white
    },
    selectedCategoryItemIcon: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        padding: 3,
        margin: 0,
        backgroundColor: colors.blue,
    },
});