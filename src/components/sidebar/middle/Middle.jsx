import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";

import avatarIMG from "../../../images/profile-pic.png";

import {
    UilScenery,
    UilSmile,
    UilLocationPoint,
    UilLabelAlt,
} from "@iconscout/react-unicons";
import "./middle.css";

import Stories from "./stories/Stories";
import PokemonsCollection from "./Pokemons/PokemonsCollection";

const Middle = () => {
    // Write Data post
    const [postData, setPostData] = useState({
        caption: "",
    });

    const handleInput = (e) => {
        let newInput = { [e.target.name]: e.target.value };

        setPostData({ ...postData, ...newInput });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
    };
    // UPLOAD IMG
    const fileInput = useRef(null);

    const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

    // Get Data
    const [pokemons, setPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPokemon = async () => {
            const res = await axios.get(API_URL);
            setNextUrl(res.data.next);
            res.data.results.forEach(async (pokemon) => {
                const poke = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                );
                setPokemons((p) => [...p, poke.data]);
                setLoading(false);
            });
        };

        return getPokemon;
    }, []);

    const loadMore = async () => {
        setLoading(true);

        let res = await axios.get(nextUrl);

        setNextUrl(res.data.next);

        res.data.results.forEach(async (pokemon) => {
            const poke = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            setPokemons((p) => [...p, poke.data]);
            setLoading(false);
        });
    };

    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);
    }, [avatar]);

    return (
        <>
            <div className="middle animate__animated animate__fadeIn">
                <Stories />

                {/* STATUS */}
                <form
                    action=""
                    className="create-post d-flex flex-column align-items-center"
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div className="create-post-wrapper d-flex align-items-center">
                        <Link to="/user" className="profile-pic">
                            <img src={avatar} alt="" />
                        </Link>

                        <Form.Control
                            type="text"
                            placeholder="What's on your mind, Nguyen Tran Gia Bao?"
                            className="border-0 ps-3 me-3 ms-3"
                            name="caption"
                            onChange={handleInput}
                            id="caption"
                        />
                    </div>

                    <div className="d-flex justify-content-between create-post-action">
                        <div className="d-flex justify-items-around create-post-icons">
                            <Form.Control
                                type="file"
                                name="photo"
                                ref={fileInput}
                                multiple
                                accept="image/*"
                                style={{ display: "none" }}
                            />
                            <span>
                                <UilScenery
                                    className="sidebar-icon"
                                    id="fileSelect"
                                    onClick={() => {
                                        fileInput.current.click();
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

                <PokemonsCollection pokemons={pokemons} />

                <div className="w-100 my-5 d-flex justify-content-center">
                    <button
                        className="p-3 rounded btn-loadmore"
                        onClick={loadMore}
                    >
                        {loading ? "loading..." : "Load more"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Middle;
