import '../../static/css/components/Friends.css'
import UserService from '../../services/users.service';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading'
function Friends(props)
{
    const [friends, setFriends] = useState("");
    const [isLoading, setLoading] = useState(true);
    useEffect(() =>
    {
        handleGetFriends();
    }, [friends]);

    const handleGetFriends = async () =>
    {
        try
        {
            const response = await UserService.getUserFriends(props.message.user.id);
            setFriends(response);
            setLoading(false);
        }
        catch (error)
        {
            // console.log(error);
        }
    }
    console.log(friends);
    return (

        <div className="friends-container">
            {isLoading ? (
                <Loading />
            ) : friends && friends.length > 0 ? (
                friends.map((friend) => (
                    <Link to={`/profile/${friend.friendId}`} key={friend.id}>
                        <div className="friend">
                            <div className="friend-img">
                                <img src={friend.profileImage ? require(`../../static/${friend.profileImage.split('static/')[1]}`) : require('../../static/imgs/users_profile/no-profile.png')} alt="Friend" />
                            </div>
                            <div className="friend-name">
                                <p>{friend.fname} {friend.lname}</p>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <h2>Nu există prieteni</h2>
            )}
        </div>
    );
}
export default Friends;