import '../styles/style.css'

async function requestFormHandler(formData) {
    const title = formData.get("title");
    const description = formData.get("description");
    const extraInfo = formData.get("extraInfo");
    const cost = formData.get("cost");
    
    // TODO: validation

    const requestBody = {
        title: title,
        description: description,
        cost: cost,
        status: "pending",
        user_id: "1"
    }

    console.log(requestBody);

    fetch("http://localhost:8000/requests",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(requestBody)
    }).then((res) => { console.log(res); window.location.replace("/user_requests.html"); })
    .catch((res) => { console.log(res); });
}

export default function RequestForm({isEditing, editRequestData}) {
    var title = "";
    var description = "";
    var info = "";
    var cost = 0;
    if (editRequestData) {
        title = editRequestData.title;
        description = editRequestData.description;
        info = editRequestData.info;
        cost = editRequestData.cost;
    }

    return (
        <div id="requestFormContainer">
            <form id="requestForm" action={requestFormHandler}>
                <label htmlFor="requestFormTitle">Title</label>
                <input type="text" name="title" id="requestFormTitle" placeholder="Enter the name of the item or service"/> <br />
                <label htmlFor="requestFormDescription">Description</label>
                <textarea name="description" id="requestFormDescription" placeholder="Describe the requested item or service to the best of your ability">{description}</textarea> <br />
                <label htmlFor="requestFormExtraInfo">Links & other info</label>
                <textarea name="extraInfo" id="requestFormExtraInfo" placeholder="Add links to external sources or any relevant additional information">{info}</textarea> <br />
                <label htmlFor="requestFormCost">Cost</label>
                <input type="number" dir="rtl" name="cost" id="requestFormCost"/>
                <span>EUR</span>
            </form>
            <div id="requestFormButtons">
                <button className="requestCancel" onClick={() => {window.location.replace("/user_requests.html");}}>Cancel</button>
                <button className="requestSubmit" form="requestForm" type="submit">{(isEditing ? "Edit request" : "Create request")}</button>
            </div>
            <p className="requestFormError"></p>
        </div>
    );
}