import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { adminLogout, reset, searchUser, getAllUsers } from '../../features/auth/adminAuth/adminAuthSlice';
import { FaSearch } from 'react-icons/fa';
import UserList from '../../components/userList';

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.adminAuth.admin);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login')
    }
    if(searchQuery){      
      dispatch(searchUser(searchQuery))
    }else{
      dispatch(getAllUsers())
    }
    return()=>{
      dispatch(reset())
    }
  }, [dispatch, admin, navigate, searchQuery]);

  //search
  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value);
  };
  if (!admin) {
    return null
  }

  //logout
  const handleLogout = () => {
    dispatch(adminLogout());
    dispatch(reset());
    navigate('/admin/login');
  };

  //new user
  const onAddUser=(e)=>{
    e.preventDefault()
    navigate('/admin/adduser')
    }

  if (!admin) {
    return null;
  }

  return (
    <div className='container-1'>
    <div className='nav'>
    <h3>Admin Dashboard</h3>

    <div style={{display:'flex'}}  className='form-group'>
        <input style={{height:'35px'}} className='form-control' placeholder='username/email'  type='text' value={searchQuery} onChange={handleSearchChange} />
        <button style={{height:'35px',marginLeft:'10px'}} className='btn-1'> <FaSearch/> Search</button>
    </div>
    </div>

  <div className='profile'>
    <div className='profile-image' >
    <img src={admin?.profileUrl ? admin.profileUrl :  "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt="profile" />  
    </div>
    <div className='profile-card'>
      <div className='profile-info'>
      <p>Name : {admin && admin.name}</p>
      <p>Email : {admin && admin.email}</p>
      </div>
      <div className='profile-buttons'>    
        <button onClick={onAddUser}className='btn-1'> Add User</button>
        <button onClick={handleLogout} className='btn'> logout</button>
      </div>
    </div>
  </div>

  <UserList/>
  
</div>
  );
}

export default AdminDashboard;
