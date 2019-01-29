import { bindActionCreators } from "redux";

const initialState = {
    userData : [],
    allChampionsData : []
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

     default:
      return state
    }
   }