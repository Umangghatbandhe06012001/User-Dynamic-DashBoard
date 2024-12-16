import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mockData from '../../mockData.json';

type User = {
  name: string;
  age: number;
  region: string;
  registeredToWebsite: {
    day: number;
    month: number;
    year: number;
  };
  email: string;
};



type AuthUser = {
  email: string;
  password: string;
};

type UserState = {
  AuthUser: AuthUser[];
  users:User[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  AuthUser: [],
  users: [],
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunk for login validation
export const validateLogin = createAsyncThunk(
  'users/validateLogin',
  async ({ email, password }: { email: string; password: string }) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = mockData.AuthUsers.find(
          (authUser: AuthUser) => authUser.email === email && authUser.password === password
        );
        if (user) {
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  }
);

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return new Promise<User[]>((resolve, reject) => {
    setTimeout(() => {
      if (mockData.users) {
        resolve(mockData.users);
      } else {
        reject('Failed to fetch users');
      }
    }, 1000);
  });
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: { deleteUser: (state, action) => {
    const userIdToDelete = action.payload;  // Get user ID (email or other unique identifier)
    state.users = state.users.filter((user) => user.email !== userIdToDelete);
  }},
  extraReducers: (builder) => {
    builder
      .addCase(validateLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateLogin.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(validateLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});




export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;
