import React, { useContext } from 'react';
import { CompareContext } from '../../appService/compareService';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../../appService/Toast/Toast';


const RecentCard = ({ list }) => {
  const {compare, setCompare } = useContext(CompareContext);
  

  const addCompare = (val) => {
    if (compare[val.id]) {
      showToast('Item already exists in compare', 'error');
    } else {
      setCompare((prev) => ({
        ...prev,
        [val.id]: val,
      }));
      showToast('Item added to compare', 'success');
    }
  };

  return (
    <>
      <div className='content grid3 mtop recent'>
        {list.map((val, index) => {
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={val.cover} alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span
                    style={{
                      background: val.category === 'sale' ? '#25b5791a' : '#ff98001a',
                      color: val.category === 'sale' ? '#25b579' : '#ff9800',
                    }}>
                    For {val.category}
                  </span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{val.name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {val.address}, {val.city}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2' style={{ fontSize: '1rem' }}>
                    Ksh: {val.price}
                  </button>{' '}
                  <label htmlFor=''></label>
                </div>
                <span>{val.type}</span>
              </div>
              <div className='hover-icons'>
                <div onClick={() => addCompare(val)}>
                  <i className='fa fa-compress'></i>
                  <span className='helper-text'>Compare</span>
                </div>
                <div>
                  <i className='fa fa-camera'></i>
                  <span className='helper-text'>View Photos</span>
                </div>
                <div>
                  <i className='fa fa-star'></i>
                  <span className='helper-text'>Add to Favorites</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer  style={{ zIndex: 9999999999 }} /> {/* Add ToastContainer to render toasts */}
    </>
  );
};

export default RecentCard;
