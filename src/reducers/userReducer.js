import { bindActionCreators } from "redux";

const initialState = {
    userData : [],
    allChampionsData : [],
    deck : []
}

export default (state = initialState, action) => {
    switch (action.type) {
     case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.data
      }

      case 'FETCH_ALL_CARDS':
      return{
        ...state,
        allChampionsData : action.allChampionsData
      }

      case 'STORE_DECK':
      return{
        ...state,
        deck : action.deck
      }
     default:
      return state
    }
   }
