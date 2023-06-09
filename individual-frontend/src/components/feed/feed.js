import React, { useState, useEffect } from "react";
import "../sass/_feedpage.css";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import * as Icon from 'react-bootstrap-icons';
import { Post } from "../classes/Post";
import axios from 'axios';


function Feed() {
    const { t, i18n } = useTranslation();
    const {
        user
    } = useAuth0();
    const [newData, setNewData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function postPost(event) {
        console.log("post placed")
        var message = event.target.inputMessage.value;
        var time = Date().toString().slice(4, 25)
        var id = (parseInt(newData[0].id) + 1).toString()
        var post = new Post("32", time, message, "niks", "0", id)
        try {
            return axios.post("https://localhost:7122/api/Post/place/32", post, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (e) {
            throw e;
        }
    }

    async function postComment(postid) {
        console.log("comment placed")
        console.log(postid)
    }

    useEffect(() => {
        async function getPosts() {
            await fetch("https://localhost:7122/api/Post/554")
                .then(async (res) => {
                    const response = await res.json();
                    if (res.ok) {
                        console.log(response)
                        const strDescending = [...response].sort((a, b) =>
                            parseInt(a.id) > parseInt(b.id) ? -1 : 1,
                        );
                        setNewData(strDescending);
                        setLoading(false);
                    } else setNewData([]);
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    console.log(newData);

                });
        }

        setLoading(true);
        getPosts();
    }, []);


    if (isLoading) {
        return <div>Loading... please wait</div>;
    } else {
        return (
            <div className="fullPage">
                <br />
                <hr></hr>
                <p>Place new post</p>
                <form onSubmit={postPost}>
                    <input name="inputMessage" className="col-7 PostInput" placeholder="Insert message"></input>
                    <button type="submit" className="btn btn-outline-primary col-4"><Icon.ChatLeft />  Place post</button>
                </form>
                <hr />
                {newData?.map((item, index) => (
                    <div className="card">

                        <div className="card-body">
                            <div className="row">

                                <b className="card-title col-11"></b>
                                {user.sub = item.userID && (
                                    <button className="btnedit col-1"><Icon.PenFill className="iconEdit" /></button>
                                )}
                            </div>
                            <div className="card-text date">{item.time}</div>
                            <p className="card-text">{item.message}</p>
                            <p className="card-text date">amount of comments: {item.commentCount}</p>
                            <hr />

                            <div className="cardPost row justify-content-between">
                                <input className="col-7 PostInput" placeholder={t("dashboard.placecomment")}></input>
                                <button className="btn btn-outline-primary col-4" onClick={postComment}><Icon.ChatLeft /> Place comment</button>
                                {item.comments?.map((item, index) => (
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
                <></>
            </div>
        );
    }
}

export default Feed;
