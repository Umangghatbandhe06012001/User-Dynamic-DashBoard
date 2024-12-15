// // src/redux/slices/analyticsSlice.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import mockData from '../../mockData.json';
// import { AppDispatch, RootState } from '../store';

// type AnalyticsState = {
//   totalUsers: number;
//   activeUsers: number;
//   deletedUsers: number;
//   registrations: { month: string; registrations: number }[];
//   userDistribution: { name: string; value: number }[];
//   usersByRegion: { region: string; users: number }[];
// };

// const initialState: AnalyticsState = {
//   totalUsers: 0,
//   activeUsers: 0,
//   deletedUsers: 0,
//   registrations: [],
//   userDistribution: [],
//   usersByRegion: [],
// };

// const analyticsSlice = createSlice({
//   name: 'analytics',
//   initialState,
//   reducers: {
//     setTotalUsers(state, action: PayloadAction<number>) {
//       state.totalUsers = action.payload;
//     },
//     setActiveUsers(state, action: PayloadAction<number>) {
//       state.activeUsers = action.payload;
//     },
//     setDeletedUsers(state, action: PayloadAction<number>) {
//       state.deletedUsers = action.payload;
//     },
//     setRegistrations(state, action: PayloadAction<{ month: string; registrations: number }[]>) {
//       state.registrations = action.payload;
//     },
//     setUserDistribution(state, action: PayloadAction<{ name: string; value: number }[]>) {
//       state.userDistribution = action.payload;
//     },
//     setUsersByRegion(state, action: PayloadAction<{ region: string; users: number }[]>) {
//       state.usersByRegion = action.payload;
//     },
//   },
// });

// export const {
//   setTotalUsers,
//   setActiveUsers,
//   setDeletedUsers,
//   setRegistrations,
//   setUserDistribution,
//   setUsersByRegion,
// } = analyticsSlice.actions;

// export const calculateMetrics =
//   () => (dispatch: AppDispatch, getState: () => RootState) => {
//     const users = getState().users.users;

//     // Mock calculations for active and deleted users
//     const totalUsers = users.length;
//     const activeUsers = users.filter((_, index) => index % 2 === 0).length; // Mock: Even-index users are active
//     const deletedUsers = totalUsers - activeUsers;

//     dispatch(setTotalUsers(totalUsers));
//     dispatch(setActiveUsers(activeUsers));
//     dispatch(setDeletedUsers(deletedUsers));

//     // Set chart data from mockData.json
//     const chartData = (mockData as any).charts;
//     if (chartData) {
//       dispatch(setRegistrations(chartData.registrations));
//       dispatch(setUserDistribution(chartData.userDistribution));
//       dispatch(setUsersByRegion(chartData.usersByRegion));
//     }
//   };

// export default analyticsSlice.reducer;








import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import mockData from '../../mockData.json';

interface Registration {
  month: string;
  registrations: number;
}

interface UserDistribution {
  name: string;
  value: number;
}

interface RegionAnalytics {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
}

interface RegionCharts {
  registrations: Registration[];
  userDistribution: UserDistribution[];
}

interface RegionData {
  analytics: RegionAnalytics;
  charts: RegionCharts;
}

interface Regions {
  [key: string]: RegionData; // Allow dynamic keys like "North America", "Asia", etc.
}

interface MockData {
  
  AuthUsers: { email: string; password: string }[];
  token: string;
  analytics: RegionAnalytics;
  charts: {
    registrations: Registration[];
    userDistribution: UserDistribution[];
    usersByRegion: { region: string; users: number }[];
  };
  Regions: Regions;
}

const mockDataTyped = mockData as MockData; // Type assertion

interface AnalyticsState {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
  registrations: Registration[];
  userDistribution: UserDistribution[];
  usersByRegion: { region: string; users: number }[];
  selectedRegion: string;
}

const initialState: AnalyticsState = {
  totalUsers: 0,
  activeUsers: 0,
  deletedUsers: 0,
  registrations: [],
  userDistribution: [],
  usersByRegion: [],
  selectedRegion: 'All Regions',
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setTotalUsers(state, action: PayloadAction<number>) {
      state.totalUsers = action.payload;
    },
    setActiveUsers(state, action: PayloadAction<number>) {
      state.activeUsers = action.payload;
    },
    setDeletedUsers(state, action: PayloadAction<number>) {
      state.deletedUsers = action.payload;
    },
    setRegistrations(state, action: PayloadAction<Registration[]>) {
      state.registrations = action.payload;
    },
    setUserDistribution(state, action: PayloadAction<UserDistribution[]>) {
      state.userDistribution = action.payload;
    },
    setUsersByRegion(state, action: PayloadAction<{ region: string; users: number }[]>) {
      state.usersByRegion = action.payload;
    },
    setSelectedRegion(state, action: PayloadAction<string>) {
      state.selectedRegion = action.payload;
    },
  },
});

export const {
  setTotalUsers,
  setActiveUsers,
  setDeletedUsers,
  setRegistrations,
  setUserDistribution,
  setUsersByRegion,
  setSelectedRegion,
} = analyticsSlice.actions;

export const calculateMetrics =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().analytics;
    const { selectedRegion } = state;

    const { analytics, charts, Regions } = mockDataTyped;

    let totalUsers = 0;
    let activeUsers = 0;
    let deletedUsers = 0;
    let registrations: Registration[] = [];
    let userDistribution: UserDistribution[] = [];
    let usersByRegion: { region: string; users: number }[] = [];

    if (selectedRegion === 'All Regions') {
      totalUsers = analytics.totalUsers;
      activeUsers = analytics.activeUsers;
      deletedUsers = analytics.deletedUsers;
      registrations = charts.registrations;
      userDistribution = charts.userDistribution;
      usersByRegion = charts.usersByRegion;
    } else {
      const regionData = Regions[selectedRegion];
      if (regionData) {
        totalUsers = regionData.analytics.totalUsers;
        activeUsers = regionData.analytics.activeUsers;
        deletedUsers = regionData.analytics.deletedUsers;
        registrations = regionData.charts.registrations;
        userDistribution = regionData.charts.userDistribution;
        usersByRegion = mockDataTyped.charts.usersByRegion; // Retaining the global usersByRegion
      }
    }

    dispatch(setTotalUsers(totalUsers));
    dispatch(setActiveUsers(activeUsers));
    dispatch(setDeletedUsers(deletedUsers));
    dispatch(setRegistrations(registrations));
    dispatch(setUserDistribution(userDistribution));
    dispatch(setUsersByRegion(usersByRegion));
  };

export default analyticsSlice.reducer;
