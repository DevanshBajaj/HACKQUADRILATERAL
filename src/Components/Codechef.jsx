import { Card, Grid } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import moment from "moment";

const Codechef = ({ userHandle }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const profiles = JSON.parse(localStorage.getItem("profiles"));

  const getCodechefData = () => {
    setLoading(true);
    const apiUrl = `https://codechefscraper.herokuapp.com/user/${profiles.codechef}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((user) => {
        setUserInfo(user);
        console.log(user);
        setLoading(false);
      });
    setLoading(true);
  };

  useEffect(() => {
    getCodechefData();
  }, []);

  if (loading) return "Loading...";

  return (
    <div>
      {/* <input
        type="text"
        name="codechefUsername"
        id="codechefUsername"
        onChange={(e) => setusername(e.target.value)}
      />
      <button onClick={() => getCodechefData()}>Search</button> */}
      {console.log(loading)}
      {userInfo && (
        <Card>
          <p>{userInfo.data.name}</p>
          <p>{userInfo.data.stars}</p>
          <p>{userInfo.data?.global_rank}</p>
          <p>{userInfo.data?.country_rank}</p>
          <p>{userInfo.data?.rating}</p>
        </Card>
      )}
    </div>
  );
};

export default Codechef;
