const initialState = {
    userData : []
}

export default (state = initialState, action) => {
    switch (action.type) {
     case 'SET_USER_DATA':
      return {
        userData: action.data
      }
     default:
      return state
    }
   }