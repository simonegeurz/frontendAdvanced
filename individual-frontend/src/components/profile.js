import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
// import postService from "../services/postService";
import "./sass/_profile.css";
import Table from 'react-bootstrap/Table';


function Profile() {

    const { user, logout } = useAuth0();
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState([]);

    // const getPosts = () => {
    //     postService.getPosts()
    //         .then((response) => {
    //             setPosts(response.data);
    //             console.log("response" + response.data);
    //         })
    //         .catch((e) => {
    //             console.log(e.message);
    //         });
    // };

    // useEffect(() => {
    //     getPosts()
    // }, []);



    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-5 card align-items-center" >
                {/* <img
                        src={user.picture}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0 mt-2"
                    />
                <p>{user.name}</p> */}
                </div>
                <div className="col-sm-5 card ">
                    <h3>Your messages</h3>
                    <div >
                        {posts.map((item, index) => (

                            <div>
                                <hr />
                                <div className="row">
                                <p className="name col">Simone Geurtz</p>
                                <p className="time col">{posts[index].time}</p>
                                </div>
                                <p className="message"> {posts[index].message}</p>
                            </div>
                        ))}</div>
                </div>
            </div>

        </div>
    )
}

export default Profile