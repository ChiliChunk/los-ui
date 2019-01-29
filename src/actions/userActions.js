const SERV_URL = 'localhost:3001/'

export function setUserData (data) {
return {
    type: 'SET_USER_DATA',
    data
}
}
