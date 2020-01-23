const URL = "https://rocket.pk/rest/all/V1";
const Apis = {
    Login: URL + '/login',
    GetCategories: URL + '/categories'
}
const header = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Bearer ' + 'cdnsfzc3f34vpkdn9up7ix8eau1zwzso',
}
export { Apis, header };