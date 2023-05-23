import React from "react";
import "../sass/_feedpage.css";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import postService from '../../services/postService';


function feed() {
    const { t, i18n } = useTranslation();
    const {
        user
    } = useAuth0();

    const { getPosts } = postService();
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
            <p>Empty feed</p>   
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
                                <img
                                    src={item.image}
                                    alt="new"
                                    className="images"
                                />
                                <hr />

                                <div className="cardPost row justify-content-between">
                                    <input className="col-7 PostInput" placeholder={t("dashboard.placecomment")}></input>
                                    <button className="btn btn-outline-primary col-4"><Icon.ChatLeft />  Opmerking plaatsen</button>
                                </div>
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
                    ))} 
        </div>
    );
}

export default feed;
