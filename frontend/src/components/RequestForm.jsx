import { useState } from "react";

export default function RequestForm({isEditing, editRequestData}) {
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState("");
    const [info, setInfo] = useState("");
    const [cost, setCost] = useState(0);

    const [error, setError] = useState("");

    if (editRequestData) {
        setTitle(editRequestData.title);
        setDescription(editRequestData.description);
        setInfo(editRequestData.info);
        setCost(editRequestData.cost);
    }

    function submitHandler(event) {
        event.preventDefault();
        setError("");
        if(title.trim().length < 1) {
            setError("Title cannot be empty!");
        }
        else if (description.trim().length < 1) {
            setError("Description cannot be empty!");
        }
        else if (cost < 0) {
            setError("Cost cannot be negative!");
        }
        else {
            const requestBody = {
                title: title,
                description: description,
                cost: cost
            }
            fetch(process.env.VITE_API_LOCATION + "/requests", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                method: (isEditing ? "PUT" : "POST"),
                body: JSON.stringify(requestBody)
            }).then(async (res) => {
                const responseBody = await res.json();
                if (!res.ok) {
                    setError(responseBody.detail);
                    return;
                }
                window.location.replace("/user_requests.html");
            }).catch((res) => {
                console.log(res);
                setError("Unknown error sending data, please try again later.");
            })
        }
    }    

    return (
        <div id="requestFormContainer">
            <form id="requestForm" aria-label="Request data">
                <label htmlFor="requestFormTitle">Title</label>
                <input type="text" name="title" id="requestFormTitle" placeholder="Enter the name of the item or service" value={title} onChange={(e) => { setTitle(e.target.value) }}/> <br />
                <label htmlFor="requestFormDescription">Description</label>
                <textarea name="description" id="requestFormDescription" placeholder="Describe the requested item or service to the best of your ability" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea> <br />
                <label htmlFor="requestFormExtraInfo">Links & other info</label>
                <textarea name="extraInfo" id="requestFormExtraInfo" placeholder="Add links to external sources or any relevant additional information" value={info} onChange={(e) => { setInfo(e.target.value) }}></textarea> <br />
                <label htmlFor="requestFormCost">Cost</label>
                <input type="number" dir="rtl" name="cost" id="requestFormCost" value={cost} onChange={ (e) => {setCost(e.target.value)} }/>
                <span>EUR</span>
            </form>
            <div id="requestFormButtons">
                <button className="requestCancel" onClick={() => {window.location.replace("/user_requests.html");}}>Cancel</button>
                <button className="requestSubmit" type="button" onClick={submitHandler}>{(isEditing ? "Edit request" : "Create request")}</button>
            </div>
            <p className="requestFormError">{error}</p>
        </div>
    );
}