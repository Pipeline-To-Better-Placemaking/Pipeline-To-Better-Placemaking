import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'; 
import './routes.css';
import { storage } from "./firebase_config";
import { ref, uploadBytesResumable, getDownloadURL, listAll, list } from "firebase/storage";
import { v4 } from "uuid";
import axios from '../api/axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'

function UploadSectionMedia() {
    const [mediaUrl, setMediaUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [mediaUrls, setMediaUrls ] = useState([]);
    const [ image, setImage ] = useState("");
    const [title, setTitle ] = useState("");
    const [ uploaded, setUploaded ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [selectedTag, setSelectedTag] = useState('');
    const [ tags, setTags ] = useState([]);

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

    const handleTags = (event) => {
      setSelectedTag(event.target.value);
    }

    const handleTagSubmit = (event) => {
      event.preventDefault();
      setTags([...tags, selectedTag]);
      setSelectedTag('');
    };

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
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"> Tags </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTag}
                    label="Tags"
                    onChange={handleTags}
                  >
                  <MenuItem value={"House"}>House</MenuItem>
                  <MenuItem value={"Bridge"}>Bridge</MenuItem>
                  <MenuItem value={"Road"}>Road</MenuItem>
                  </Select>
                  <Button onClick={handleTagSubmit}>Accept Tag</Button>
                  </FormControl>
                  <ul>
                    {tags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                </Box>
              </div>: null
            }
            <Button className='continueButton' component={Link} size='lg' variant='filledTonal' color='success' to='../' 
              state={{...location.state}}>
              Accept and Continue
            </Button>
            <br></br>
            <div className="slide-container">
              <Carousel>
                {mediaUrls.map((slideImage, index)=> (
                  <div key={index}>
                    <img src={slideImage} height="15vh" width="10vw"/>
                  </div>
                ))} 
              </Carousel>
            </div>
        </div>
    );
}

export default UploadSectionMedia;