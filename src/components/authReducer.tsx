const initialState = {
    token: '',
  };
  
  const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, token: action.payload };
      default:
        return state;
    }
  };
  
export default authReducer;
  