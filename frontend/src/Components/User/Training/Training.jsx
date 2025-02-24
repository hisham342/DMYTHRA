import React, { useEffect, useState } from "react";
import "./Training.css";
import { fetchTrainingDetails } from "../../../Services/userApi";

function Training() {
    const [trainingDetails, setTraining] = useState([]);
    const [selectedTraining, setSelectedTraining] = useState(null);

    const fetchTrainingClass = async () => {
        try {
            const { data } = await fetchTrainingDetails();
            if (data.status) {
                setTraining(data.data);
            }
        } catch (error) {
            console.error("Error fetching training details:", error);
        }
    };

    console.log(selectedTraining);

    useEffect(() => {
        fetchTrainingClass();
    }, []);

    const selectTraining = (videoKey) => {
        setSelectedTraining(videoKey);
    };

    return (
        <div className="mainDivOfTraining">
            <h4 className="trainingHeading">Training Class</h4>
            {trainingDetails.length > 0 ? (
                trainingDetails.map((value) => (
                    <div
                        className="mainDetailsDiv"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        key={value._id}
                    >
                        <h5> Name : {value.videoName}</h5>
                        <p> Description : {value.videoDescription}</p>
                        <button className=" bg-success px-2 py-2" onClick={() => selectTraining(value.videoLink)}>
                            View video
                        </button>
                        <p>Posted on :{new Date(value.date).toLocaleDateString("en-GB")}</p>
                    </div>
                ))
            ) : (
                <p>No training details available</p>
            )}

            {/* modal */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Training Video
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <iframe
                                width="100%"
                                height="360"
                                src={selectedTraining}
                                title="Training class"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Training;
