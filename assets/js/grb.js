document.getElementById('grbForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const form = event.target;
    let formData = new FormData(form);

    let data = Object.fromEntries(formData.entries());
    
    let wasteTypes = ['plastics', 'foodWaste', 'domesticWaste', 'cookingOil', 'incineratorAsh', 'operationalWaste', 'animalCarcasses', 'fishingGear', 'eWaste'];
    
    let hasWasteType = wasteTypes.some(type => {
        if (data[type]) {
            data[type] = parseInt(data[type]) || 0;
            return data[type] > 0;
        }
        return false;
    });

    console.log(data);

    if (data.occasion.trim() && data.area.trim() && data.date.trim() && data.time.trim() && 
        data.position.trim() && data.methodOfDisposal.trim()) {
        
        if (!hasWasteType) {
            alert('Enter at least one waste type');
           
            return;
        }

        try {
            let response = await api.creategrbRecord(data);
            showSuccessNotification(response.message);
        } catch (error) {
            showErrorNotification(error.response.data.message);
            
            console.log(error);
        }
    } else {
        
        showErrorNotification('Please fill all the fields');
    }
});


function showRecordsLoader() {
    document.getElementById("recordsLoader").style.display = "flex";
  }
  
  
  function hideRecordsLoader() {
    document.getElementById("recordsLoader").style.display = "none";
  }
  
