import "../../style/pages/personal/personalRandomFriendsCollection.css";

const PersonalRandomFriendsCollection = ({ avatars }) => {
    const renderAvatars = () => {
        return avatars.map((avatar, index) => {
            return (
                <img
                    loading="lazy"
                    role="presentation"
                    decoding="async"
                    src={avatar}
                    alt="Avatar user"
                    key={index}
                />
            );
        });
    };

    return <div className="friends-grid">{renderAvatars()}</div>;
};

export default PersonalRandomFriendsCollection;
