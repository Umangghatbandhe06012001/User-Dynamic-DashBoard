







import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../redux/slices/userSlice';
import { RootState, AppDispatch } from '../redux/store';
import UserDetailCard from '../components/UserDetailCard';
import styles from '../../src/style/UserDashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

import '../style/App.css';



export const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  


  const [selectedUser, setSelectedUser] = useState(null);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const isLoggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn);
  const [hasAlerted, setHasAlerted] = useState(false); 


  const USERS_PER_PAGE = 5;

   useEffect(() => {
      if (!isLoggedIn && !hasAlerted) {
        alert('You need to log in to access website!');
        setHasAlerted(true); 
        navigate('/login');
      }
    }, [isLoggedIn, hasAlerted, navigate]);


  useEffect(() => {
    if(isLoggedIn){
      dispatch(fetchUsers());
    }
    
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? user.email.endsWith(filter) : true;
    return matchesSearch && matchesFilter;
  });

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  const closeDetails = () => {
    setSelectedUser(null); 
  };



  const handleViewDetails = (user: any) => {
    setSelectedUser(user); 
  };

  const handleDelete = (email: string) => {
    
    dispatch(deleteUser(email));
  };

  return (
    <>
    <Navbar />
    <div style={{ maxWidth: '100%', margin: '0 auto' ,padding:'1rem',position:"relative",backgroundColor:'#cdd5de73',minHeight:'700px'}}>
      
      <h2 className='DashboardTitle'>User DashBoard</h2>
      <div style={{ marginBottom: '20px',padding:'1rem' ,backgroundColor:'#8080805c',borderRadius:'15px'}}>
        <input
          type="text"
          placeholder="Search by email or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: '10px', padding: '10px', width: '50%' ,outline:'none',border:'none',borderRadius:"10px"}}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filterSelection}
          >
          <option value="">All Domains</option>
          <option value="@example.com">example.com</option>
          <option value="@gmail.com">gmail.com</option>
          <option value="@yahoo.com">yahoo.com</option>
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{overflow:'scroll'}}>
      <table border={0} style={{ width: '100%', textAlign: 'left', marginTop: '10px' }}>
        <thead>
          <tr>
            <th className={styles.HeadingTable}>Name</th>
            <th className={styles.HeadingTable}>Email</th>
            <th className={styles.HeadingTable}>Region</th>
            <th className={styles.HeadingTable}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={index}>
              <td className={styles.dataTable}>{user.name}</td>
              <td className={styles.dataTable}>{user.email}</td>
              <td className={styles.dataTable}>{user.region}</td>
              <td  className={styles.dataTable}>
                <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <button  className={styles.UserBtn} onClick={() => handleViewDetails(user)} >
                    View Details
                  </button>
                  <button className={styles.CloseBtn} onClick={() => handleDelete(user.email)} >
                    <FontAwesomeIcon icon={faTimes} />
                    
                  </button>
                </div>
              
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
      </div>
    
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}
          className={`${styles.paginationBtn} ${(currentPage === 1)?'disab':'' }`}      >
           &lt;
        </button>
        <span style={{fontSize:'1.1rem',fontWeight:'700',color:'#a8a2a2d4'}}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ marginLeft: '10px' }}
          className={`${styles.paginationBtn} ${(currentPage === totalPages)?'disab':'' }`} 
        >
         &gt;
        </button>
      </div>
      {selectedUser && (
        <UserDetailCard userInfo={selectedUser} closeDetails={closeDetails} />
      )}
      
    </div>
    </>
  );
};


