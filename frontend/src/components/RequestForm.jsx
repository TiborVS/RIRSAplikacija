import '../styles/style.css'

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
            <form id="requestForm">
                <label htmlFor="requestFormTitle">Title</label>
                <input type="text" name="title" id="requestFormTitle" placeholder="Enter the name of the item or service"/> <br />
                <label htmlFor="requestFormDescription">Description</label>
                <textarea name="description" id="requestFormDescription" placeholder="Describe the requested item or service to the best of your ability">{description}</textarea> <br />
                <label htmlFor="requestFormExtraInfo">Links & other info</label>
                <textarea name="extraInfo" id="requestFormExtraInfo" placeholder="Add links to external sources or any relevant additional information">{info}</textarea> <br />
                <label htmlFor="requestFormCost">Cost</label>
                <input type="number" dir="rtl" step="0.01" name="cost" id="requestFormCost"/>
                <span>EUR</span>
            </form>
            <div id="requestFormButtons">
                <button className="requestCancel">Cancel</button>
                <button className="requestSubmit">{(isEditing ? "Edit request" : "Create request")}</button>
            </div>
            <p className="requestFormError">Example error text example error text example error text  text example error  text example error  text example error </p>
        </div>
    );
}