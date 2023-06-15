import React, { useState, useEffect } from "react";
import "../sass/_feedpage.css";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import * as Icon from 'react-bootstrap-icons';
import { Post } from "../classes/Post";
import { Comment } from "../classes/Comment";
import axios from 'axios';


function Feed() {
    const { t, i18n } = useTranslation();
    const {
        user
    } = useAuth0();
    const [newData, setNewData] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [commentsLoading, setCommentsLoading] = useState(true);

    async function postPost(event) {
        console.log("post placed")
        var message = event.target.inputMessage.value;
        var time = Date().toString().slice(4, 25)
        var id = (parseInt(newData[0].id) + 1).toString()
        var post = new Post("12", time, message, "niks", "0", id)
        try {
            return axios.post("http://35.195.223.207/api/Post/place/12", post, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (e) {
            throw e;
        }
    }

    async function postComment(event) {
        console.log("comment placed")
        var message = event.target.inputComment.value;
        var time = Date().toString().slice(4, 25);
        var postID = event.target.postid.placeholder;
        const strDescending = [...comments].sort((a, b) =>
                            parseInt(a.id) > parseInt(b.id) ? -1 : 1,
                        );
        var id = (parseInt(strDescending[0].id) + 1).toString()
        console.log(postID);
        var post = new Comment("12", postID, time, message, "niks", id)
        try {
            return axios.post("http://34.22.213.165/api/Comment/43", post, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (e) {
            throw e;
        }
    }

    async function deleteUserInfo(){
        try {
            return axios.delete("http://35.195.223.207/api/Post/deletepost/12", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (e) {
            throw e;
        }

        
    }
    async function deleteusercomments(){
        try {
            return axios.delete("http://34.22.213.165/api/Comment/deletecomment/12", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (e) {
            throw e;
        }
    }
    async function deletealluserdata(){
        deleteUserInfo();
        deleteusercomments();
        window.location.reload();
    }

    useEffect(() => {
        async function getPosts() {
            await fetch("http://35.195.223.207/api/post/3")
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
        async function getComments() {
            await fetch("http://34.22.213.165/api/comment/4")
                .then(async (res) => {
                    const response = await res.json();
                    if (res.ok) {
                        console.log(response)
                        setComments(response);
                        setCommentsLoading(false);
                    } else setComments([]);
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    console.log(comments);

                });
        }
        setLoading(true);
        getPosts();
        getComments();
    }, []);


    if (isLoading || commentsLoading) {
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
                <button onClick={deletealluserdata} className="btn btn-outline-primary col-4"><Icon.ChatLeft /> delete all my data</button>'
                <hr />
                {newData?.map((item) => (
                    <div className="card">

                        <div className="card-body">
                            <div className="row">

                                <b className="card-title col-11"></b>
                                {item.userID === "12" && (
                                    <button className="btnedit col-1"><Icon.PenFill className="iconEdit" /></button>
                                )}
                            </div>
                            <div className="card-text date">{item.time}</div>
                            <p className="card-text">{item.message}</p>
                            <p className="card-text date">amount of comments: {item.commentCount}</p>
                            <hr />

                            <div className="cardPost row justify-content-between">
                                <form onSubmit={postComment}>
                                    <input name="inputComment" className="col-7 CommentInput" placeholder="Insert comment"></input>
                                    <input placeholder={item.id} name="postid" hidden></input>
                                    <button type="submit" className="btn btn-outline-primary col-4"><Icon.ChatLeft />  Place comment</button>
                                </form>
                                {comments?.map((comment) => (
                                    <div className="">
                                        {item.id === comment.postID && (
                                            <div>
                                            {comment.userID === "12" && (
                                    <button className="btnedit col-1"><Icon.PenFill className="iconEdit" /></button>
                                )}<p className="card-text date">{comment.time}</p>
                                                <p className="card-text date">{comment.message}</p><hr/></div>
                                        )}
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
