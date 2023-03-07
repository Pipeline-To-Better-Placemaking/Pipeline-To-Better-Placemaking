import { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL, listAll, list } from "firebase/storage";
import { v4 } from "uuid";
import './routes.css';
import { Link, useLocation } from 'react-router-dom';
import logo1 from '../images/PtBPLogo.png';
import Image from 'react-bootstrap/Image';
import axios from '../api/axios';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Button from '@mui/material/Button';

function UploadSectionMedia() {
    const [mediaUrl, setMediaUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [mediaUrls, setMediaUrls ] = useState([]);
    const location = useLocation();
    const date = new Date();
    const storageRefList = ref(storage, `media_uploads/`);

    const handleSubmit = (e) => {
      e.preventDefault()
      const file = e.target[0]?.files[0]
      if (!file) return;
      const storageRef = ref(storage, `media_uploads/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      //var isoDate = new Date(`${activity.date}T00:00:00`)
      const storeURL = async (url) => {
          try {
              console.log(url);
              console.log(location.state.userToken);
              const reponse = await axios.put(`/section_maps/${location.state.section._id}/data/${location.state.section.data[0]._id}`, JSON.stringify({
                //date: isoDate.toISOString(),
                url_link: url,
              }));
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
            setMediaUrls((prev) => [...prev, downloadURL]);
            storeURL(downloadURL)
          });
        }
      );
    }

    useEffect(() => {
      listAll(storageRefList).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((downloadURL) => {
            setMediaUrls((prev) => [...prev, downloadURL]);
          });
        });
      });
      }, []);

    const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: 'cover',
      height: '400px'
    }

    return (
        <div className="UploadSectionMedia">
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
            <Button className='continueButton' component={Link} size='lg' variant='filledTonal' color='success' to='../' 
              state={{...location.state}}>
              Accept and Continue
            </Button>
            <br></br>
            {
                  <div className="slide-container">
                    <Slide>
                      {mediaUrls.map((image, index)=> (
                        <div key={index}>
                          <div style={{ ...divStyle, 'backgroundImage': `url(${image})` }}>
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