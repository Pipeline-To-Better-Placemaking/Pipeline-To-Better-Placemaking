import { useState, useEffect } from "react";
 import { storage } from "./firebase_config";
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
import TextField from '@mui/material/TextField';

function UploadSectionMedia() {
    const [mediaUrl, setMediaUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [mediaUrls, setMediaUrls ] = useState([]);
    const [title, setTitle ] = useState("");
    const [titles, setTitles] = useState([]);
    const [ image, setImage ] = useState("");
    const [ uploaded, setUploaded ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const location = useLocation();
    const date = new Date();
    const storageRefList = ref(storage, `media_uploads/${location.state.section._id}`);


    const handleSubmit = (e) => {
      e.preventDefault()
      const file = e.target[0]?.files[0]
      if (!file) return;
      const storageRef = ref(storage, `media_uploads/${location.state.section._id}/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const storeURL = async (url) => {
          try {
              await axios.post(`/section_maps/${location.state.section._id}/data`, JSON.stringify({
                  url_link: url,
                  title: title,
                }), {
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${location.state.userToken.token}`
                  },
                  withCredentials: true
                });
          }
          catch (error) {
            console.log("Data was not able to be stored on Mongo");
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

    const handleImageLoad = () => {
      setLoading(false);
    }

    const handleUpload = async (e) => {
      setImage(URL.createObjectURL(e.target.files[0]));
      setUploaded(true);
      setLoading(true);

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
                  <input type='file' onChange={handleUpload} />
                  <br></br>
                  <button type='submit'> Upload Media </button>
                  <br></br>
                  <progress id="file" max="100" value={progresspercent}>  </progress>
                </div>
                
            </form>
            <br></br>
            {
              image ? 
              <div className="ImgPreview">
                <br></br> 
                <img style={{height: "20vh", width : "30vw"}} onLoad={handleImageLoad} src={image} />
                <br></br>
                <br></br>
                <TextField label="Title"style={{width: "10vw", height: "15vh"}}onChange={text => {setTitle(text.target.value)}} value={title}></TextField>
              </div>: null
            }
            <Button className='continueButton' component={Link} size='lg' variant='filledTonal' color='success' to='../' 
              state={{...location.state}}>
              Accept and Continue
            </Button>
            <br></br>
            {mediaUrls.map((url, index) => {
              return (
                <div className="MediaList">
                  <img src={url} height="200px" width="300px" class="center"/>
                </div>
              );
            })}
      </div>
    );
}

export default UploadSectionMedia;