import {useState} from "react";
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import './routes.css';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
import logo1 from '../images/PtBPLogo.png';
import Image from 'react-bootstrap/Image';
import axios from '../api/axios';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

function UploadSectionMedia() {
    const [mediaUrl, setMediaUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [mediaUrls, setImageUrls ] = useState([]);
    const location = useLocation();
    const date = new Date();
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const file = e.target[0]?.files[0]
      if (!file) return;
      const storageRef = ref(storage, `media_uploads/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      //var isoDate = new Date(`${activity.date}T00:00:00`)

      const storeURL = async (url) => {
          try {
              /*const reponse = await axios.put(`/${userId}/data`, JSON.stringify({
                date: isoDate.toISOString(),
              }));*/
          }
          catch (error) {
            console.log("URL was not able to be stored on Mongo");
            return;
          }
      }
  
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMediaUrl(downloadURL);
            setImageUrls((prev) => [...prev, downloadURL]);
            storeURL(downloadURL)
          });
        }
      );
    }

    const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: 'cover',
      height: '400px'
    }

    return (
        <div className="UploadSectionMedia">
            <AppBar sx={{ bgcolor: "#006FD6" }} position="sticky">
              <Toolbar>
                <Link className='homeButton' to='/home' state={location.state}><Image src={logo1} className='icon-shadow' alt='logo' height='50px' /></Link>
              </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit} className='form'>
                <div className="SubmitButton">
                  <h1> Section Cutter </h1>
                  <br></br>
                  <input type='file' />
                  <br></br>
                  <button type='submit'> Upload Media </button>
                </div>
                
            </form>
            <br></br>
            <progress id="file" max="100" value={progresspercent}>  </progress>
            <br></br>
            {
                mediaUrl &&
                  <div>
                    <Slide>
                      {mediaUrls.map((slideImage)=> (
                        <div>
                          <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage})` }}>
                          </div>
                        </div>
                      ))} 
                    </Slide>
                  </div>
            }
      </div>
    );
}

export default UploadSectionMedia;