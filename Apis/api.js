const URL = "https://rocket.pk/rest/all/V1";
const Apis = {
    Login: URL + '/login',
    Dashboard: URL + '/vendors/dashboard',
    GetCategories: URL + '/categories',
    Products: URL + '/vendors/product',
    Orders: URL + '/vendors/order',
    Notifications : URL + '/vendors/notifications',
    Profile : URL + '/vendors/me',
    AttributeSet : URL + '/eav/attribute-sets/list'
}
const header = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Bearer ' + 'cdnsfzc3f34vpkdn9up7ix8eau1zwzso',
}
export { Apis, header };