import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateMetrics, setSelectedRegion } from '../redux/slices/analyticsSlice';
import { RootState, AppDispatch } from '../redux/store';
import LineChartComponent from '../components/charts/LineChartComponent';
import PieChartComponent from '../components/charts/PieChartComponent';
import BarChartComponent from '../components/charts/BarChartComponent';
import Navbar from '../components/Navbar';
import AnalyticsStyle from '../style/AnalyticsDashboard.module.css';
import { useNavigate } from 'react-router-dom';

const AnalyticsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn);
  const {
    totalUsers = 0,
    activeUsers = 0,
    deletedUsers = 0,
    registrations = [],
    userDistribution = [],
    usersByRegion = [],
    selectedRegion = 'All Regions',
  } = useSelector((state: RootState) => state.analytics);

 
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  
  useEffect(() => {
    dispatch(calculateMetrics());
  }, [dispatch]);

  
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedRegion(event.target.value));
    dispatch(calculateMetrics()); 
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '100%', padding: '1.1rem', margin: '0 auto' }}>
        <h2 className="DashboardTitle">Analytics Dashboard</h2>

      
        <div className={AnalyticsStyle.regionSelectorWrapper}>
          <label htmlFor="region" className={AnalyticsStyle.RegionSelectorTag}>
            Select Region:
          </label>
          <select
            id="region"
            value={selectedRegion}
            className={AnalyticsStyle.RegionSelector}
            onChange={handleRegionChange}
          >
            <option value="All Regions">All Regions</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="South America">South America</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <div className={AnalyticsStyle.cardStyle}>
            <p className={AnalyticsStyle.cardTitle}>Total Users</p>
            <p className={AnalyticsStyle.cardValue}>{totalUsers}</p>
          </div>
          <div className={AnalyticsStyle.cardStyle}>
            <p className={AnalyticsStyle.cardTitle}>Active Users</p>
            <p className={AnalyticsStyle.cardValue}>{activeUsers}</p>
          </div>
          <div className={AnalyticsStyle.cardStyle}>
            <p className={AnalyticsStyle.cardTitle}>Deleted Users</p>
            <p className={AnalyticsStyle.cardValue}>{deletedUsers}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{ marginTop: '40px' }}>
          <h3 className={AnalyticsStyle.chartTitle}>User Registrations Over 6 Months</h3>
          <LineChartComponent data={registrations} />

          <h3 className={AnalyticsStyle.chartTitle}>User Distribution</h3>
          <PieChartComponent data={userDistribution} />

          <h3 className={AnalyticsStyle.chartTitle}>Users by Region</h3>
          <BarChartComponent data={usersByRegion} />
        </div>
      </div>
    </>
  );
};

export default AnalyticsDashboard;
