import React, { useState, useEffect } from "react";
import "../sass/_feedpage.css";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import postService from '../../services/postService';
import * as Icon from 'react-bootstrap-icons';



function Feed() {
    const { t, i18n } = useTranslation();
    const {
        user
    } = useAuth0();

    const [data, setData] = useState([{ authid: "google-oauth2|102242182228126567032", image:"https://individualproject.blob.core.windows.net/newcontainer/moestuinen.png?sp=r&st=2022-06-19T20:28:51Z&se=2022-06-20T04:28:51Z&spr=https&sv=2021-06-08&sr=b&sig=XFfamBY%2F60Elb8MrNGsJ9yPq6UDGBLyPIRrsWn63lG4%3D", sender: "Simone Geurtz", date: "26-04-2022", message: "This is a test post", comments: [{ authId: "google-oauth2|102242182228126567032", message: "Test comment", date: "26-04-2022", name: "Simone Geurtz" }] }, { userid: "23", sender: "Test Person", date: "25-04-2022", image:"https://individualproject.blob.core.windows.net/newcontainer/pompoen.jpg?sp=r&st=2022-06-19T20:30:09Z&se=2022-06-20T04:30:09Z&spr=https&sv=2021-06-08&sr=b&sig=JNxvxooUVWFzEkrmmBj%2FPvfNnW9muap6NC%2F58IqEDcA%3D", message: "This is my first post", comments: [] }]
    );

    const [newData, setNewData] = useState([]);
    const { getPosts } = postService();


    function addpost() {
        console.log("testing")
        data.push({ authId: "google-oauth2|102242182228126567032", sender: "Simone Geurtz", date: "30-05-2022", message: "TEST POST", comments: [] })
    }


    const getData = () => {
        console.log("getpost")
        getPosts()
            .then((response) => {
                setNewData(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getData();
        console.log("hello")
    }, []);



    return (
        <div className="fullPage">
            {data.map((item, index) => (
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <b className="card-title col-11">{item.sender}</b>
                                    {user.sub = item.authid && (
                                        <button className="btnedit col-1"><Icon.PenFill className="iconEdit" /></button>
                                    )}
                                </div>
                                <div className="card-text date">{item.date}</div>
                                <p className="card-text">{item.message}</p>
                                <hr />

                                <div className="cardPost row justify-content-between">
                                    <input className="col-7 PostInput" placeholder={t("dashboard.placecomment")}></input>
                                    <button className="btn btn-outline-primary col-4"><Icon.ChatLeft />  Opmerking plaatsen</button>
                                    {item.comments.map((item, index) => (
                                    <div className="cardComment card">
                                        <div className="row justify-content-between">
                                            <b className="col-6 titleComment">{item.name} - {item.date}</b>
                                            <div className="col-1">{user.sub = item.authId && (
                                                <button className="btneditComment"><Icon.PenFill className="iconEdit" /></button>
                                            )}</div>
                                        </div>
                                        <p className="textComment">{item.message}</p>
                                    </div>
                                ))}
                                </div>
                               
                            </div>
                        </div>
                    ))} 
        </div>
    );
}

export default Feed;
