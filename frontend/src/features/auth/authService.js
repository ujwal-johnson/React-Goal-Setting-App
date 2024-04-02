import axios from 'axios'

const API_URL ='http://localhost:5000/api/users/'

//register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

//login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}

// Profile Uplaod
const profileUpload = async(token, url) => {
    console.log("service");
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const liveUser = JSON.parse(localStorage.getItem('user'))
    const response = await axios.post(API_URL + 'profile/upload',{url, liveUser}, config)
  
  const userString = localStorage.getItem('user');
  
  if (userString) {
    const user = JSON.parse(userString);
    user.profileUrl = response.data.profileUrl;
    localStorage.setItem('user', JSON.stringify(user));
  }
  
    return response.data
  }

const authService = {
    register,
    logout,
    login,
    profileUpload    
  }

export default authService