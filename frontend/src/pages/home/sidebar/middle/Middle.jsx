import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import Form from "react-bootstrap/Form";

import { POKEMON_URL } from "../../../../constants/api.data.constant";

import ProfilePic from "../../../../assets/avatar/profile-pic.png";

import {
    UilScenery,
    UilSmile,
    UilLocationPoint,
    UilLabelAlt,
} from "@iconscout/react-unicons";

import "../../../../style/pages/home/sidebar/middle/middle.css";

import Stories from "./stories/Stories";
import PokemonsCollection from "./pokemons/PokemonsCollection";
import { useSelector } from "react-redux";

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

    // Get Data
    const [pokemons, setPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPokemon = async () => {
            try {
                const res = await axios.get(POKEMON_URL);
                setNextUrl(res.data.next);

                const pokemonData = await Promise.all(
                    res.data.results.map(async (pokemon) => {
                        const poke = await axios.get(
                            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                        );
                        return poke.data; // Return the fetched data
                    })
                );

                setPokemons((prevPokemons) => [
                    ...prevPokemons,
                    ...pokemonData,
                ]);
                setLoading(false);
            } catch (error) {
                console.error("Failed to get pokemon data", error);
            }
        };

        getPokemon();
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

    const [avatar, setAvatar] = useState(null);

    // CLEANUP URL WHEN CHANGE IMG
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    // SAVE AVATAR USER TO LOCAL
    useEffect(() => {
        avatar && window.localStorage.setItem("avatar", avatar);
    }, [avatar]);

    // GET AVATAR USER FROM LOCAL
    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);
    }, [avatar]);

    const user = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    const userID = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

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
                        <Link
                            to={user ? `/user/${userID}` : "/"}
                            className="profile-pic"
                        >
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={user ? ProfilePic : avatar || ProfilePic}
                                alt="Avatar user"
                            />
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
                            <button
                                role="button"
                                type="submit"
                                className="btn btn-primary"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </form>
                {/* END STATUS */}

                <PokemonsCollection pokemons={pokemons} />

                <div className="w-100 my-5 d-flex justify-content-center">
                    <button
                        role="button"
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
