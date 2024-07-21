
import PropTypes from 'prop-types';
import './adminpage.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useData } from '../../../appService/data/DataProvider';

const StyledTable = ({ data }) => { 
  return (
    !Array.isArray(data) || data.length === 0 ? (
      <div className="bordered-table no-data">
        <p>No properties to Compare.</p>
        <Link to='/listings'>
          <button>Browse All Properties</button>
        </Link>
      </div>
    ) : (
      <table className="bordered-table table table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cover</th>
            <th>Name</th>
            <th>Location</th>
            <th>Category</th>
            <th>Price</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td><img src={item.property_images.images[0]} alt={item.property_name} style={{ width: 100, height: 100 }} /></td>
              <td>{item.property_name}</td>
              <td>{item.property_address} {item.city}</td>
              <td>{item.property_tenure}</td>
              <td>{item.property_price}</td>
              <td>{item.property_type}</td>
              <td>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

StyledTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const AdminPage = () => {
  const { data, loading } = useData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="compare-section">
      <StyledTable data={data} />
      <ToastContainer style={{ zIndex: 999999999 }} />
    </section>
  );
};

AdminPage.propTypes = {
  compare: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default AdminPage;
