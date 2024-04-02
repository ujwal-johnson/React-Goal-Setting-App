import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {profileUpdate} from '../features/auth/authSlice'
import {toast} from 'react-toastify'

function Profile () {
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)


    // if user is there or not
    useEffect(() => {
        if (!user) {
          navigate("/login");
        }
      }, [user, navigate,dispatch]);

      const [image,setImage] =useState("")
    //to upload image
      const uploadImage = (e) => {
        e.preventDefault();
      
        if (!image) {
          toast.error("Please upload a file")          
          return;
        }
      
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "hiass6kd");
        data.append("cloud_name", "dcskmdnat");
        console.log("in profile");
      
        fetch("https://api.cloudinary.com/v1_1/dcskmdnat/image/upload", {
          method: "post",
          body: data,
          
        })
          .then((resp) => resp.json())
          .then((data) => {
            dispatch(profileUpdate(data.url));
          })
          .catch((err) => console.log(err));
      }; 



  return (
    <div>
    <div>
      <h3>User Dashboard</h3>
    </div>
    <div className="profile">
      <div className="profile-image">
      <img
            src={
              user?.profileUrl
                ? user.profileUrl
                : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
            }
            alt="profile"
          />
      </div>

      <div className="profile-card">
        <div className="profile-info">
          <p>Name : {user && user.name}</p>
          <p> Email : {user && user.email}</p>
        </div>

        <div className="profile-buttons">
                  
          <div className="upload-button">
            <div class="custom-file-upload">
              <label for="profile" class="custom-button">
                Choose File
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                name="profile"
                id="profile"
                class="hidden-input"
              />
            </div>

            <button className="btn" onClick={uploadImage}>
              Upload!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Profile