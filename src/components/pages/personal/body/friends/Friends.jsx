import React from "react";

import "./friends.css";

const row1Items = [
    {
        id: 1,
        imgURL: "https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-1/272658854_657828442327526_4845066051186167594_n.jpg?stp=dst-jpg_p148x148&_nc_cat=110&ccb=1-7&_nc_sid=aa3c98&_nc_ohc=uJdvz-okLiIAX9W9OQO&_nc_ht=scontent.fvca1-3.fna&oh=00_AT_6mv8SLi3T088DHDUP3xKmt-kzWByAkrLPDZKNDBL4IQ&oe=62F2D241",
        name: "Lorem",
    },
    {
        id: 2,
        imgURL: "https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-1/290895244_1394310174378393_3051805713390994267_n.jpg?stp=cp1_dst-jpg_p148x148&_nc_cat=105&ccb=1-7&_nc_sid=aa3c98&_nc_ohc=LtlHDVjvaqMAX-m7zoG&_nc_ht=scontent.fvca1-1.fna&oh=00_AT_-lacHf00gef9CntbdzEY5hHgm8NS0ipw3XnNp4cbG_Q&oe=62F40714",
        name: "Lorem",
    },
    {
        id: 3,
        imgURL: "https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-1/292607458_1290817231669857_1931502672626104428_n.jpg?stp=dst-jpg_p148x148&_nc_cat=105&ccb=1-7&_nc_sid=aa3c98&_nc_ohc=JvLOUvwXdwgAX_RkDBq&_nc_ht=scontent.fvca1-1.fna&oh=00_AT8UrvFuSuDOYiv5_vbaVaq0E9U3z_aBs8ybIKi99zKTnw&oe=62F63865",
        name: "Lorem",
    },
];

const row2Items = [
    {
        id: 1,
        imgURL: "https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-1/295805312_149298944376674_5940786638085213592_n.jpg?stp=dst-jpg_s148x148&_nc_cat=106&ccb=1-7&_nc_sid=aa3c98&_nc_ohc=serK4rL5AY0AX-YbO0l&_nc_ht=scontent.fvca1-1.fna&oh=00_AT_Yk_9PU-5dFfJpBeLhnWpgqbgYskIl_4NNl5rNzAtx-Q&oe=62F24571",
        name: "Lorem",
    },
    {
        id: 2,
        imgURL: "https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-1/146550662_1377208315945220_576178969029273474_n.jpg?stp=dst-jpg_p148x148&_nc_cat=104&ccb=1-7&_nc_sid=aa3c98&_nc_ohc=YaTzCta2G1QAX_EBopV&_nc_ht=scontent.fvca1-2.fna&oh=00_AT9Rmjk8v9XD_EgbsscxUqXSWFFfmTUq8L5EntD3gOCS4Q&oe=63132BD7",
        name: "Lorem",
    },
    {
        id: 3,
        imgURL: "https://scontent.fvca1-2.fna.fbcdn.net/v/t39.30808-1/297295539_150891600875212_8670544789740449159_n.jpg?stp=dst-jpg_p148x148&_nc_cat=104&ccb=1-7&_nc_sid=aa3c98&_nc_ohc=6-CIZ6NXL6IAX9E_dF8&_nc_ht=scontent.fvca1-2.fna&oh=00_AT-KscTmw_wEiIMqeBANthJlgqPcthU6rQgiAOvkrNXGqA&oe=62F2EFF9",
        name: "Lorem",
    },
];

const row3Items = [
    {
        id: 1,
        imgURL: "https://scontent.fvca1-2.fna.fbcdn.net/v/t39.30808-1/295037363_1095137398076192_2424018389822282807_n.jpg?stp=dst-jpg_p148x148&_nc_cat=107&ccb=1-7&_nc_sid=aa3c98&_nc_ohc=1oqS2PXjkW4AX_KvkiT&_nc_ht=scontent.fvca1-2.fna&oh=00_AT8FXzZH5uqHLEMCpo3V_EUgrab85SqwbfeHihnlXALuPQ&oe=62F36F1E",
        name: "Lorem",
    },
    {
        id: 2,
        imgURL: "https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-1/241627839_588988332469739_7664430576179844030_n.jpg?stp=dst-jpg_s148x148&_nc_cat=106&ccb=1-7&_nc_sid=aa3c98&_nc_ohc=zIZ0h_wb14AAX9DCRFM&_nc_ht=scontent.fvca1-1.fna&oh=00_AT_Y5CL7dEc7HkDpgoiJlyI-e2HJxNb8W7LVSbTfMlfoUw&oe=62F39E3F",
        name: "Lorem",
    },
    {
        id: 3,
        imgURL: "https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-1/240535636_972570429990323_535209135229295660_n.jpg?stp=dst-jpg_p148x148&_nc_cat=103&ccb=1-7&_nc_sid=aa3c98&_nc_ohc=XOE-TC5aFiMAX9eg0wU&_nc_ht=scontent.fvca1-3.fna&oh=00_AT_9bKUkrQo66VrnMg00XDqopTf044htjzqa76y_WSkaIg&oe=62F2EA8A",
        name: "Lorem",
    },
];

function Friends() {
    return (
        <div>
            <div className="header d-flex justify-content-between">
                <a href="#" className="fw-bold fs-3">
                    Friends
                </a>
                <a href="#" className="fs-3">
                    All friends
                </a>
            </div>
            <span className="fs-5 nums-friends">1.259 Friends</span>
            <div>
                <div className="mt-4 row-1 row p-0 gap-4 my-4">
                    {row1Items.map((item) => (
                        <div key={item.id} className="col col-img d-flex flex-column align-items-center mb-3">
                            <span>
                                <img src={item.imgURL} alt="img-2" />
                            </span>
                            <p className="mt-1">{item.name}</p>
                        </div>
                    ))}
                </div>
                <div className="row row-2 p-0 gap-4 my-4">
                    {row2Items.map((item) => (
                        <div key={item.id} className="col col-img d-flex flex-column align-items-center mb-3">
                            <span>
                                <img src={item.imgURL} alt="img-2" />
                            </span>
                            <p className="mt-1">{item.name}</p>
                        </div>
                    ))}
                </div>
                <div className="row row-3 p-0 gap-4 mt-4 mb-0">
                    {row3Items.map((item) => (
                        <div key={item.id} className="col col-img d-flex flex-column align-items-center mb-4">
                            <span>
                                <img src={item.imgURL} alt="img-2" />
                            </span>
                            <p className="mt-1">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Friends;
