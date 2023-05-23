import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Feed from "./feed"
import NotLoggedIn from "./notLoggedIn";

export const Decider = () => {
  const { user } = useAuth0();

  function getContent() {
    if(user){
        return <Feed />
    }
    else{
        return <NotLoggedIn />
    }
  }

  return (
    <div >
      {getContent()}
    </div>
  );


};

export default Decider;
