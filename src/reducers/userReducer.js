import { bindActionCreators } from "redux";

const initialState = {
    userData : [],
    allChampionsData : [],
    deck : [],
    isPlayerOne : null
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

      case 'STORE_IS_PLAYER_ONE':
      return{
        ...state,
        isPlayerOne : action.isPlayerOne
      }
     default:
      return state
    }
   }
