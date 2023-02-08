import {useState} from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import './routes.css';

function UploadSectionMedia() {
    const [mediaUrl, setMediaUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [mediaUrls, setImageUrls ] = useState([]);
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const file = e.target[0]?.files[0]
      if (!file) return;
      const storageRef = ref(storage, `media_uploads/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
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
            setMediaUrl(downloadURL)
          });
        }
      );
    }

    return (
        <div className="UploadSectionMedia">
            <h1> Section Cutter </h1>
            <br></br>
            <form onSubmit={handleSubmit} className='form'>
                <input type='file' />
                <br></br>
                <br></br>
                <button type='submit'> Upload Media </button>
            </form>
            {
                !mediaUrl &&
                <div className='outerbar'>
                    <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                </div>
            }
            <br></br>
            {
                mediaUrl &&
                (<video width="320" height="240" controls>
                    <source src={mediaUrl} type="video/mp4"></source>
                    <source src={mediaUrl} type="video/ogg"></source>
                </video> ||
                <img src={mediaUrl} alt='uploaded file' height={200} /> )
            }
        </div>
    );
}

export default UploadSectionMedia;