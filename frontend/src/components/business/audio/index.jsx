import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WaveSurfer from "wavesurfer.js";
import isEqual from "react-fast-compare";

import "../../style/animations/spin.css";

import { getUserByID } from "../../../redux/request/userRequest";

const Audio = ({ audioUrl, cover, author, name }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [authorInfo, setAuthorInfo] = useState({});
  const audioRef = useRef(null);
  const waveformRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserByID(author, dispatch).then((data) => {
      setAuthorInfo(data.user);
    });
  }, [author, dispatch]);

  const handlePlay = () => {
    // Pause the currently playing audio (if any)

    // Toggle play/pause for the current audio
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const createWave = useCallback(() => {
    if (waveformRef.current && audioRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "white",
        progressColor: "#383351",
        barWidth: 5,
        barRadius: 3,
        barGap: 2,
        barMinHeight: 1,
        cursorWidth: 2,
        backend: "WebAudio",
        height: 80,
        responsive: true,
        cursorColor: "red",
        interact: true,
        hideScrollbar: true,
        autoScroll: true,
        normalize: true,
      });

      wavesurfer.load(audioRef.current.currentSrc);

      audioRef.current.addEventListener("play", () => {
        setIsPlaying(true);
      });

      audioRef.current.addEventListener("pause", () => {
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    createWave();
  }, [createWave]);

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column p-3"
      style={{
        borderRadius: "0.5rem",
        background: "var(--color-primary)",
      }}
    >
      <div className="w-100">
        <audio ref={audioRef} src={audioUrl}></audio>
        <div ref={waveformRef}></div>
      </div>

      <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center justify-content-center flex-column h-100 text-white">
          <span className="fs-2 ms-2">
            {authorInfo.username ? <>{name}</> : <>Loading...</>}
          </span>
        </div>

        <div
          className="fs-5 text-center mt-2 text-white fw-bold d-flex justify-content-center align-items-center border"
          onClick={() => togglePlayback()}
          style={{
            cursor: "pointer",
            width: "4rem",
            height: "4rem",
          }}
        >
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Audio, isEqual);
