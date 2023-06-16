import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { POKEMON_URL } from "../../../../constants/api.data.constant";

import ProfilePic from "../../../../assets/avatar/profile-pic.png";

import "../../../../style/pages/home/sidebar/middle/middle.css";

import Stories from "./stories/Stories";
import PostPopup from "../../../../components/PostPopup";
import Posts from "../../../../components/Posts";

const Middle = () => {
    const [popup, setPopup] = useState(false);
    const [avatar, setAvatar] = useState(null);

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

        try {
            const res = await axios.get(nextUrl);
            setNextUrl(res.data.next);

            const pokemonData = await Promise.all(
                res.data.results.map(async (pokemon) => {
                    const poke = await axios.get(pokemon.url);
                    return poke.data; // Return the fetched data
                })
            );

            setPokemons((prevPokemons) => [...prevPokemons, ...pokemonData]);
        } catch (error) {
            console.error("Failed to get pokemon data", error);
        }

        setLoading(false);
    };

    // CLEANUP URL WHEN CHANGE IMG
    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);

        return () => {
            data && URL.revokeObjectURL(data.preview);
        };
    }, []);

    // SAVE AVATAR USER TO LOCAL
    useEffect(() => {
        avatar && window.localStorage.setItem("avatar", avatar);
    }, [avatar]);

    // GET AVATAR USER FROM LOCAL
    useEffect(() => {
        const data = window.localStorage.getItem("avatar");
        setAvatar(data);
    }, [avatar]);

    const userID = useSelector((state) => {
        return state.auth.login.currentUser?.data._id;
    });

    const handlePopup = () => {
        setPopup((popup) => !popup);
    };

    const renderPostPopup = () => {
        return (
            popup && (
                <PostPopup
                    onPopup={handlePopup}
                    animateClass="animate__animated animate__fadeIn"
                />
            )
        );
    };

    const user = useSelector((state) => {
        return state.auth.login.currentUser?.data;
    });

    return (
        <>
            <div className="middle animate__animated animate__fadeIn">
                <Stories />

                {/* STATUS */}
                <div
                    action=""
                    className="create-post d-flex align-items-center"
                >
                    <div className="create-post-wrapper d-flex align-items-center">
                        <Link
                            to={user ? `/user/${userID}` : "/"}
                            className="profile-pic"
                            aria-label="Avatar user"
                        >
                            <img
                                loading="lazy"
                                role="presentation"
                                decoding="async"
                                src={user ? ProfilePic : avatar || ProfilePic}
                                alt="Avatar user"
                            />
                        </Link>

                        <div
                            className="border-0 ps-3 me-3 ms-3 caption fs-4"
                            name="caption"
                            onClick={handlePopup}
                            id="caption"
                        >
                            What's in your mind, {user.username}?
                        </div>
                    </div>
                    <div
                        className="submit d-flex align-items-center"
                        title="Đăng bài viết"
                    >
                        <button
                            onClick={handlePopup}
                            role="button"
                            type="submit"
                            className="btn btn-primary"
                        >
                            Post
                        </button>
                    </div>
                    {renderPostPopup()}
                </div>
                {/* END STATUS */}

                <div className="posts">
                    <Posts />
                </div>

                {/* <div className="w-100 my-5 d-flex justify-content-center">
                    <button
                        role="button"
                        className="p-3 rounded btn-loadmore"
                        onClick={loadMore}
                    >
                        {loading ? "loading..." : "Load more"}
                    </button>
                </div> */}
            </div>
        </>
    );
};

export default Middle;
