document.getElementById('noxForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    let form = e.target;
    let formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());
    
    
    if (data.event === "Others" && data.otherEvent) {
        data.event = data.otherEvent;
    }
    if (data.engineName === "Others" && data.otherEngineNameInput) {
        data.engineName = data.otherEngineNameInput;
    }
    if (data.engineStatus === "Others" && data.otherEngineStatusInput) {
        data.engineStatus = data.otherEngineStatusInput;
    }

  
    if (data.date && data.smtTime && data.event && data.position && 
        data.engineName && data.engineStatus && data.engineTierStatus) {
        // console.log("Form data:", data);
        try {
            let response = await api.createNoXRecord(data);
            alert(response.message);
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
        return;
    }
    
    alert("All the required fields must be filled out");
});