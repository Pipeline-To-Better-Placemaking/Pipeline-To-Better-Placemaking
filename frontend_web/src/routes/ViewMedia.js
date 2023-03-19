import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'; 
import './routes.css';
import { storage } from "./firebase_config";
import { ref, getDownloadURL, listAll, list } from "firebase/storage";
import axios from '../api/axios';
import { Button, TextField, Box, InputLabel, MenuItem, FormControl, RadioGroup, Radio, FormControlLabel, FormLabel, DialogTitle, Dialog } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


function ViewMedia() {
    const [ mediaUrls, setMediaUrls ] = useState([]);
    const [ edit, setEdit ] = useState(false);
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const [ newTitle, setNewTitle ] = useState("");
    const [ selectedSlide, setSelectedSlide ] = useState("");
    const [ newSelectedTags, setNewSelectedTags ] = useState([]);

    const loc = useLocation();
    const options = ["Sidewalk", "Transit Shelter", "Bus Lane", "Turn Lane", "Planter", "Drive Lane", "Bike Lane", "Parking Lane", "Street Lighting", "Stairs/Ramps", "Outdoor Seating Area", "Outdoor Restaurant Seating Area", "Canopy", "Building Structure", "Loggia", "Breezeway", "Drainage Field/Ditch", "Tree Canopy", "Lake/River Water", "Monument/Fountain", "Leisure Area"];
    const storageRefList = ref(storage, `media_uploads/${loc.state.section._id}`);

    // Opens link on new tab to allow media to be downloaded
    const handleOpen = () => {
      console.log(selectedSlide);
      window.open(selectedSlide, '_blank');
    }

    // Lets front end know which slide it is on for future api calls
    const handleSlide = (index) => {
      setSelectedSlide(mediaUrls[index]);
      setSelectedIndex(index);
      console.log(selectedSlide);
    }
    
    // Updates the tags that the user is currently selecting
    const handleNewTags = (event) => {
        setNewSelectedTags(event.target.value);
    }

    // Opens edit dialog box
    const handleEdit = async () => {
      try {
        const map = await axios.get(`/section_maps/${loc.state.section._id}/data/${loc.state.section.data[selectedIndex + 1]._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${loc.state.userToken.token}`
          },
          withCredentials: true
        });
        
        //console.log("Map: ", map)
        setNewSelectedTags(map.data.tags)
        setNewTitle(map.data.title)
        setEdit(true);
      }
      catch (error) {
        console.log("Could not get image from mongo");
        return;
      }
    }

    // Saves dialog box changes and closes it
    const handleSave = () => {
        setEdit(false);
        console.log(selectedIndex);
        const update = async () => {
          try {
              await axios.put(`/section_maps/${loc.state.section._id}/data/${loc.state.section.data[selectedIndex + 1]._id}`, JSON.stringify({
                  title: newTitle,
                  tags: newSelectedTags,
                }), {
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${loc.state.userToken.token}`
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

    const handleCancel = () => {
      setEdit(false);
    }

    const handleDownload = () => {
      const uuidPattern = /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/i;
      const fileExtension = selectedSlide.split('.').pop().split('?')[0];
    
      console.log("🚀 ~ file: ViewMedia.js:102 ~ handleDownload ~ fileExtension:", fileExtension);
    
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${newTitle}.${fileExtension}`;
        link.type = 'application/octet-stream';

        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('type', 'application/octet-stream');
        link.setAttribute('content-disposition', 'attachment');
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
        };
        xhr.open('GET', selectedSlide);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${loc.state.userToken.token}`);
        xhr.withCredentials = true;
        xhr.send();
    };
    
    
    // Updates list of images for specific project
    useEffect(() => {
      listAll(storageRefList).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((downloadURL) => {
            console.log(downloadURL);
            setMediaUrls((prev) => [...prev, downloadURL]);
            if(selectedSlide == "")
            {
              setSelectedSlide(downloadURL);
            }  
          }); 
        });
      });
      console.log(`After: ${selectedSlide}`);
      }, []);


    console.log(loc)

    return (
    <div className="ViewMedia">
          <Button className='backBtn' style={{ margin: '10px' }} component={Link} size='lg' variant="contained" startIcon={<KeyboardReturnIcon />} to='../map'
            state={{ team: loc.state.team, owner: loc.state.owner, project: loc.state.project, userToken: loc.state.userToken }} >
            Return to map view
          </Button>
        <h1>View Media</h1>
        <br></br>
        <div className="slide-container">
          <Carousel showArrows={true} showThumbs={false} useKeyboardArrows={true} onChange={handleSlide}>
            {mediaUrls.map((slideImage, index)=> (
              <div key={index}>
                <img src={slideImage} width="40vw"/>
              </div>
            ))} 
          </Carousel>
        </div>
        <div style={{flex: 1, flexDirection: 'row', margin: "1vh"}}>
          <Button download={"SectionImage.png"} onClick={handleDownload}>Download Image</Button>
          <Button onClick={handleEdit}>Open Edit Info</Button>
        </div>
            <Dialog open={edit} fullWidth maxWidth="md" PaperProps={{ style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}} >  
                <DialogTitle>Edit Info</DialogTitle>
                <TextField label="New Title"style={{width: "10vw", margin: "1vw"}} value={newTitle} onChange={text => {setNewTitle(text.target.value)}}></TextField>
                <Box sx={{ minWidth: 120}}>
                    <FormControl fullWidth sx={{ flexDirection: 'row' }}>
                    <InputLabel id="demo-simple-select-label"> Tags </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={newSelectedTags}
                        label="Tags"
                        onChange={handleNewTags}
                        multiple
                        style={{minWidth: 120}}
                    >
                    {options.map((option, index) => (
                        <MenuItem value={option}>{option}</MenuItem>
                    ))}
                    </Select>
                    </FormControl>
                </Box>
                <br/>
                <div style={{flex: 1, flexDirection: 'row', margin: "1vh"}}>
                  <Button onClick={handleSave}>Save</Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </div>
            </Dialog>
    </div>
    );
}

export default ViewMedia;