import '../../css/SettingsPage/Friend.css'


interface FriendInterface
{
    email:string,
    username:string,
    avatarimage:string
}


function Friend({email,username,avatarimage}:FriendInterface) {
    return (
      <div className="friend">
      </div>
    );
  }
  
  export default Friend;