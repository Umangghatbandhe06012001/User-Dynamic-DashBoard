import React ,{useEffect}from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from '../../src/style/UserDetailCard.module.css';


interface UserDetailCardProps {
  userInfo: {
    name: string;
    email: string;
    age:number;
    region: string;
    // Add any other fields your `userInfo` object may have
  };
  closeDetails: () => void;
}

const UserDetailCard: React.FC<UserDetailCardProps> = ({ userInfo, closeDetails }) => {


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);
  return (
    <div id={styles.UserDetailContainer}>
      <div id={styles.UserDetailWrapper}>
      <div className="UserDetailInnerWrapper">
        <div style={{borderRadius:'15px', display: 'flex', justifyContent: 'space-between',backgroundColor:'#ffffff' ,textAlign:'center',padding:'.5rem .8rem'}}>
          <p className={styles.UserIconWrapper}><FontAwesomeIcon icon={faUser} /></p>
          <span
            style={{
              display:"flex",
              justifyContent:'center',
              alignItems:'center',
              textAlign: 'center',
              width: '.4rem',
              height: '.4rem',
              padding: '1rem',
              margin:'auto 0',
              borderRadius: '50%',
              backgroundColor: 'red',
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={closeDetails} // Use the passed `closeDetails` function
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div style={{width:'100%',display:'flex',flexDirection:'column',gap:'1rem',marginTop:'1rem'}}>
          <p className={styles.detail}><span className={styles.detailTitle}>Name </span>: {userInfo.name}</p>
          <p className={styles.detail}><span className={styles.detailTitle}>Email </span>: {userInfo.email}</p>
          <p className={styles.detail}><span className={styles.detailTitle}>Age </span>: {userInfo.age}</p>
          <p className={styles.detail}><span className={styles.detailTitle}>Region </span>: {userInfo.region}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDetailCard;
