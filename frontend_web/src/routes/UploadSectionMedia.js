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
import { MultipleSelect } from 'react-select-material-ui';

function UploadSectionMedia() {
    const [ mediaUrl, setMediaUrl] = useState(null);
    const [ progresspercent, setProgresspercent] = useState(0);
    const [ mediaUrls, setMediaUrls ] = useState([]);
    const [ preview, setPreview ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ newTitle, setNewTitle ] = useState("");
    const [ selectedTag, setSelectedTag ] = useState('');
    const [ newSelectedTag, setNewSelectedTag ] = useState('');
    const [ tags, setTags ] = useState([]);
    const [ newTags, setNewTags ] = useState([]);
    const [ selectedSlide, setSelectedSlide ] = useState('');
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ edit, setEdit ] = useState(false);


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
                  tags: tags,
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
    }

    const handleNewTags = (event) => {
      setNewSelectedTag(event.target.value);
    }

    const handleNewTagSubmit = (event) => {
      event.preventDefault();
      setNewTags([...newTags, newSelectedTag]);
      setNewSelectedTag('');
    }

    const handlePreview = async (e) => {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleSlide = (index) => {
      setSelectedSlide(mediaUrls[index]);
      setSelectedIndex(index);
    }

    const handleEdit = () => {
      setEdit(true);
    }

    const handleSave = () => {
      setEdit(false);
      console.log(selectedIndex);
      const update = async () => {
        try {
            await axios.put(`/section_maps/${location.state.section._id}/data/${location.state.section.data[selectedIndex + 1]._id}`, JSON.stringify({
                title: newTitle,
                tags: newTags,
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
          console.log("Data was not able to be updated on Mongo");
          return;
        }
      }
      update();
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

	const options = ["Sidewalk", "Transit Shelter", "Bus Lane", "Turn Lane", "Planter", "Drive Lane", "Bike Lane", "Parking Lane", "Street Lighting", "Stairs/Ramps", "Outdoor Seating Area", "Outdoor Restaurant Seating Area", "Canopy", "Building Structure", "Loggia", "Breezeway", "Drainage Field/Ditch", "Tree Canopy", "Lake/River Water", "Monument/Fountain", "Leisure Area"];


    return (
        <div className="UploadSectionMedia">
            <form onSubmit={handleSubmit} className='form'>
                <div className="SubmitButton">
                  <h1> Section Cutter </h1>
                  <br></br>
                  <input type='file' onChange={handlePreview} />
                  <br></br>
                  <button type='submit'> Upload Media </button>
                  <br></br>
                  <progress id="file" max="100" value={progresspercent}>  </progress>
                </div>
                
            </form>
            <br></br>
            {
              preview ? 
              <div className="ImgPreview">
                <br></br> 
                <img style={{height: "20vh", width : "30vw"}} src={preview} />
                <br></br>
                <br></br>
                <TextField label="Title"style={{width: "10vw", height: "15vh"}} onChange={text => {setTitle(text.target.value)}} value={title}></TextField>
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
                  {options.map((option, index) => (
                      <MenuItem value={option}>{option}</MenuItem>
                  ))}
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
            <br></br>
            <div className="slide-container">
              <h3>Current Images</h3>
              <Carousel showArrows={true} showThumbs={false} useKeyboardArrows={true} onChange={handleSlide}>
                {mediaUrls.map((slideImage, index)=> (
                  <div key={index}>
                    <img src={slideImage} height="300px" width="200px"/>
                  </div>
                ))} 
              </Carousel>
            </div>
            <Button onClick={handleEdit}>Open Edit Info</Button>
            {
              edit ?
              <div className="Edit">
                <TextField label="New Title"style={{width: "10vw", height: "15vh"}} value={newTitle} onChange={text => {setNewTitle(text.target.value)}}></TextField>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"> Tags </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newSelectedTag}
                    label="Tags"
                    onChange={handleNewTags}
                  >
                  {options.map((option, index) => (
                      <MenuItem value={option}>{option}</MenuItem>
                  ))}
                  </Select>
                  <Button onClick={handleNewTagSubmit}>Accept Tag</Button>
                  </FormControl>
                  <ul>
                    {newTags.map((newTag, index) => (
                      <li key={index}>{newTag}</li>
                    ))}
                  </ul>
                </Box>
                
                <Button onClick={handleSave}>Save</Button>
              </div> : null
            }
            <br></br>
            <Button className='continueButton' component={Link} size='lg' variant='filledTonal' color='success' to='../' 
              state={{...location.state}}>
              Accept and Continue
            </Button>
        </div>
    );
}

export default UploadSectionMedia;