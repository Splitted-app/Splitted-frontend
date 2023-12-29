import '../../css/SettingsPage/AvatarImage.css'

import UserAccountIcon from '../../assets/images/user_account.png'
import EditIcon from '../../assets/images/edit_icon.png'
import { useEffect, useRef, useState } from 'react';
import api from '../../services/api';

interface AvatarImageInterface
{
    editable:boolean,
    avatarImage:string;
}

function AvatarImage({editable, avatarImage}:AvatarImageInterface) {
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string>(avatarImage);

    useEffect(()=>{
        setImage(avatarImage);
    }, [avatarImage])

    function handleClick()
    {
        if (!editable)
            return;
        inputFile.current?.click();
    }

    function handleFileChanges(files : any)
    {
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => onFileRead(reader.result);
        reader.onerror = (error) => console.error(error);
    }

    function onFileRead(base64str: string | ArrayBuffer | null)
    {
        if (typeof base64str !== 'string')
            return;

        setImage(base64str);

        api.put(`/api/users/`, {
            avatarImage: base64str
        })
        .then((res)=>{

        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return (
      <div 
            className="avatar-image-container" 
            style={{cursor: `${editable ? "pointer" : "default"}`}}
            onClick={handleClick}
            >
        <input 
            type='file' 
            ref={inputFile} 
            style={{display: 'none'}} 
            multiple={false}
            onChange={(e)=>handleFileChanges(e.target.files)}
        />
        <div className="avatar-image">
            <img src={(image)?image:UserAccountIcon}></img>
            {editable && 
            <div className="avatar-image-edit-icon">
                <img src={EditIcon}></img>
            </div>
            }
        </div>
      </div>
    );
  }
  
  export default AvatarImage;