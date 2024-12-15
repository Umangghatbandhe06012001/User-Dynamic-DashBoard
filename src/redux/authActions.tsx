import { mockLoginApi } from "../utils/mockApi";
import { AppDispatch } from './store';

export const loginUser = (email: string,password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await mockLoginApi(email, password);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.token});
    }catch (error: any) {
        throw new Error(error.message || 'Login failed');
    }
}