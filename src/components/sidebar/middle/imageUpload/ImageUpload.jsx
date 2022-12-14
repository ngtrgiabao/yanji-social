import React, { useState } from "react";

import "./ImageUpload.css";

function ImageUpload() {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [caption, setCaption] = useState("");
    const [progress, setProgess] = useState(0);
    const [noLikes, setNoLikes] = useState(0);
    const [scroll, setScroll] = React.useState("paper");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }

        setImageURL(URL.createObjectURL(e.target.files[0]));
    };

    const uploadFileWithClick = () => {
        document.getElementsByClassName("four")[0].click();
    };

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
        setImage("");
        setImageURL("");
    };

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleUpload = (e) => {
        if (document.getElementsByClassName("hidden")[0]) {
            document
                .getElementsByClassName("hidden")[0]
                .classList.remove("hidden");
        }

        document.getElementsByClassName("postButton").disabled = true;
        document
            .getElementsByClassName("postButton")[0]
            .classList.add("disabled");

        if (caption === "" && imageURL === "") {
            console.log("Prevent Access to Photo or Caption Submission");
        } else {
            e.preventDefault();

            if (imageURL === "") {
                db.collection("posts").add({
                    caption: caption,
                    imageURL: "",
                    noLikes: noLikes,
                    uid: uid(),
                });

                handleClose();
                setProgess(0);
                setCaption("");
                setImage(null);
            } else {
                const uploadTask = ref(storage, `image/${image.name + uid()}`);

                uploadTask.on(
                    "state_change",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100
                        );
                        setProgess(progress);
                    },
                    (err) => {
                        console.log(err);
                        alert(err.message);
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            .then((url) => {
                                db.collection("posts").add({
                                    caption: caption,
                                    imageURL: url,
                                    noLikes: noLikes,
                                    uid: uid(),
                                });

                                handleClose();
                                setProgess(0);
                                setCaption("");
                                setImage(null);
                            });
                    }
                );
            }
        }
    };

    return <div></div>;
}

export default ImageUpload;
