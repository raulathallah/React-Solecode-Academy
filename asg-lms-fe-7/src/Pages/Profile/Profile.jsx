import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user) {
      setUserData(user.user);
    }
  }, [user]);
  return (
    <>
      <p>User Id: {userData?.userId}</p>
      <p>
        Name: {userData?.fName} {userData?.lName}
      </p>
    </>
  );
};

export default Profile;
