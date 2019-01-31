const SERV_URL = 'localhost:3001/'

export function setUserData (data) {
return {
    type: 'SET_USER_DATA',
    data
}
}

export function storeDeck (deck){
    return{
        type : 'STORE_DECK',
        deck
    }
}
