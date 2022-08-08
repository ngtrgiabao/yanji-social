import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db, storage } from "../../../firebase";
import { uid } from "uid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

import {
    UilBookmark,
    UilEllipsisH,
    UilHeart,
    UilCommentDots,
    UilShare,
    UilScenery,
    UilSmile,
    UilLocationPoint,
    UilLabelAlt,
    UilTrash,
    UilBell,
    UilTimesSquare,
    UilLinkAlt,
    UilUserTimes,
    UilExclamationTriangle,
} from "@iconscout/react-unicons";
import "./middle.css";
import { StoryData } from "../../data/StoryData";

const Middle = () => {
    const StoryItem = (props) => {
        return (
            <div className="story-item story">
                <div className="profile-pic">
                    <img src={props.avatar} alt="" />
                </div>
                <p className="name">{props.name}</p>
            </div>
        );
    };

    const useDate = () => {
        const locale = "en";
        const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

        useEffect(() => {
            const timer = setInterval(() => {
                // Creates an interval which will update the current data every minute
                // This will trigger a rerender every component that uses the useDate hook.
                setDate(new Date());
            }, 60 * 1000);
            return () => {
                clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
            };
        }, []);

        const day = today.toLocaleDateString(locale, { weekday: "long" });
        const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(
            locale,
            { month: "long" }
        )}\n\n`;

        const hour = today.getHours();
        const wish = `Good ${
            (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
        }, `;

        const time = today.toLocaleTimeString(locale, {
            hour: "numeric",
            hour12: true,
            minute: "numeric",
        });

        return {
            date,
            time,
            wish,
        };
    };

    // Write Data
    const [postData, setPostData] = useState({
        caption: "",
    });
    const [array, setArray] = useState([]);

    const handleInput = (e) => {
        let newInput = { [e.target.name]: e.target.value };

        setPostData({ ...postData, ...newInput });
    };

    const collectionRef = collection(db, "postData");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(collectionRef, {
            ...postData,
            id: uid(),
        }).catch((err) => {
            alert(err.message);
        });

        setPostData("");
    };

    // UPLOAD IMG
    const fileElem = document.getElementById("fileElem");
    const [file, setFile] = useState(null);

    const handleUploadImg = () => {
        if (file !== null) {
            const storageRef = ref(storage, `image/${file.name + uid()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    console.log(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            setPostData({ ...postData, img: downloadURL });
                            console.log(downloadURL);
                        })
                        .catch((err) => {
                            alert(err.message);
                        });
                }
            );
        }
    };

    // Get Data
    const getData = async () => {
        const data = await getDocs(collectionRef);

        setArray(
            data.docs.map((item) => {
                return {
                    ...item.data(),
                    avatar: "https://media-exp1.licdn.com/dms/image/C5603AQHahqdNdU7CCA/profile-displayphoto-shrink_400_400/0/1658923673703?e=1664409600&v=beta&t=Y_2otdi9rMFUOgjjgwfBTpwGo-w_ceowGQ6akNkiym0",
                    id: item.id,
                };
            })
        );
    };

    // Delete Data
    const deleteData = (id) => {
        let dataToDelete = doc(db, "postData", id);
        deleteDoc(dataToDelete)
            .then(() => {
                getData();
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const [active, setActive] = useState(false);

    const handleActive = () => {
        setActive((active) => !active);
    };

    return (
        <>
            <div className="middle">
                {/* STORIES */}

                <div className="stories d-flex justify-content-between">
                    {StoryData.map((item) => (
                        <StoryItem
                            key={item.id}
                            avatar={item.avatar}
                            name={item.name}
                        ></StoryItem>
                    ))}
                </div>

                {/* END OF STORIES */}

                {/* STATUS */}
                <form
                    action=""
                    className="create-post d-flex flex-column align-items-center"
                    onSubmit={(e) => {
                        handleSubmit(e);
                        handleUploadImg();
                        getData();
                    }}
                >
                    <div className="create-post-wrapper d-flex align-items-center">
                        <Link to="/user" className="profile-pic">
                            <img
                                src="https://media-exp1.licdn.com/dms/image/C5603AQHahqdNdU7CCA/profile-displayphoto-shrink_400_400/0/1658923673703?e=1664409600&v=beta&t=Y_2otdi9rMFUOgjjgwfBTpwGo-w_ceowGQ6akNkiym0"
                                alt=""
                            />
                        </Link>

                        <input
                            type="text"
                            placeholder="What's on your mind, Nguyen Tran Gia Bao?"
                            className="border-0 ps-3 me-3 ms-3"
                            name="caption"
                            onChange={handleInput}
                        />
                    </div>

                    <div className="d-flex justify-content-between create-post-action">
                        <div className="d-flex justify-items-around create-post-icons">
                            <input
                                type="file"
                                name="photo"
                                id="fileElem"
                                multiple
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />

                            <span>
                                <UilScenery
                                    className="sidebar-icon"
                                    id="fileSelect"
                                    onClick={() => {
                                        if (fileElem) {
                                            fileElem.click();
                                        }
                                    }}
                                />
                            </span>
                            <span>
                                <UilSmile className="sidebar-icon" />
                            </span>
                            <span>
                                <UilLocationPoint className="sidebar-icon" />
                            </span>
                            <span>
                                <UilLabelAlt className="sidebar-icon" />
                            </span>
                        </div>

                        <div className="submit d-flex align-items-center">
                            <button type="submit" className="btn btn-primary">
                                Post
                            </button>
                        </div>
                    </div>
                </form>
                {/* END STATUS */}

                {/* FEEDS */}
                <div className="feeds">
                    {array.map((item) => (
                        <div key={item.id}>
                            <div className="feed-item feed">
                                <div className="head">
                                    <div className="user">
                                        <Link to="/user" className="profile-pic">
                                            <img src={item.avatar} alt="" />
                                        </Link>
                                        <Link to="/user" className="info">
                                            <h3>Nguyen Tran Gia Bao</h3>
                                            <span>@yanji</span>
                                            {/* <span>{item.location},</span> */}
                                        </Link>
                                    </div>
                                    <span className="post-settings">
                                        <UilEllipsisH
                                            onClick={handleActive}
                                            className="dots"
                                        />

                                        <div
                                            className="edit-post"
                                            style={{
                                                display: `${
                                                    active === true
                                                        ? "block"
                                                        : ""
                                                }`,
                                            }}
                                        >
                                            <ul>
                                                <li
                                                    className="delete-post"
                                                    onClick={() =>
                                                        deleteData(item.id)
                                                    }
                                                >
                                                    <span>
                                                        <UilTrash />
                                                    </span>
                                                    Delete this post
                                                </li>
                                                <li>
                                                    <span>
                                                        <UilBell />
                                                    </span>
                                                    Notification for this post
                                                </li>
                                                <li>
                                                    <span>
                                                        <UilLinkAlt />
                                                    </span>
                                                    Copy link of this post
                                                </li>
                                                <li>
                                                    <span>
                                                        <UilTimesSquare />
                                                    </span>
                                                    Hide this post
                                                </li>
                                                <li>
                                                    <span>
                                                        <UilUserTimes />
                                                    </span>
                                                    Unfollow
                                                </li>
                                                <li>
                                                    <span>
                                                        <UilExclamationTriangle />
                                                    </span>
                                                    Report
                                                </li>
                                            </ul>
                                        </div>
                                    </span>
                                </div>
                                <div className="photo">
                                    <img src={item.img} alt="image" />
                                </div>
                                <div className="action-buttons">
                                    <div className="interaction-buttons d-flex gap-4">
                                        <span onClick={handleActive}>
                                            <UilHeart
                                                style={{
                                                    color: `${
                                                        active === true
                                                            ? "red"
                                                            : ""
                                                    }`,
                                                }}
                                                className="heart"
                                            />
                                        </span>
                                        <span>
                                            <UilCommentDots />
                                        </span>
                                        <span>
                                            <UilShare />
                                        </span>
                                    </div>
                                    <div className="bookmark">
                                        <span>
                                            <UilBookmark />
                                        </span>
                                    </div>
                                </div>
                                <div className="liked-by">
                                    <span>
                                        <img
                                            src="https:images.unsplash.com/photo-1656576413714-b3e5a3d2aab3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                            alt=""
                                        />
                                    </span>
                                    <span>
                                        <img
                                            src="https://images.unsplash.com/photo-1656437660370-4e8886a0e8ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                            alt=""
                                        />
                                    </span>
                                    <span>
                                        <img
                                            src="https://images.unsplash.com/photo-1656354798706-bc0c3b99f291?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNzd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                            alt=""
                                        />
                                    </span>
                                    <p>
                                        Liked by <b>Erest Achivers</b> and
                                        <b> {item.numsLiked} 2.245 others</b>
                                    </p>
                                </div>
                                <div className="caption">
                                    <p>{item.caption}</p>
                                </div>
                                <div className="comments text-muted">
                                    View all {item.numsCommented} comments
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* END OF FEEDS */}
            </div>
        </>
    );
};

export default Middle;
