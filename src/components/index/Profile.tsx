import styled from "styled-components";

const Profile = () => {
  return (
    <ProfileArea>
      <ProfileImg src={"/boris01.webp"} alt="profile" />
      <ProfileTitle>Hi! I'm Boris the Cat😻</ProfileTitle>
    </ProfileArea>
  );
};

const ProfileTitle = styled.h1`
  font-family: "PermanentMarker";
  font-weight: bold;
  font-size: 1.5rem;
`;

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ProfileImg = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 2px 1px 5px #00000090;
`;

export default Profile;
