import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { storage } from './firebase';
import { ref, uploadBytes, listAll } from 'firebase/storage';
import { v4 } from 'uuid';

export default function UploadSectionImage() {
    const location = useLocation();
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);

    const uploadImage = () => {
        // Case if user does not select an image
        if(imageUpload == null) return;
        
        // Stores file name and adds random chars in case of duplicate names
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
        // Takes image name and actual image and uploads it to firebase
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image Uploaded");

        })

        useEffect(() => {

        }, [])


    }



    return(
        <div id='uploadSectionImage'>
            <AppBar position='static' color='#daebff'>
            
            </AppBar>
            
            <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>

            <div id='newUploadBox'>
                <Button
                    onClick={uploadImage}
                >
                    Upload Image
                </Button>
            </div>
        </div>
    );
}