document.querySelector('#ballastRecordForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    // Get form values using both FormData and direct access (for dynamic fields)
    const occasion = parseInt(document.getElementById('occasion').value);
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const position = document.getElementById('position').value; // Keep position as single string


    // Create operationData object
    const operationData = {
        recordDate: date,
        recordTime: time + ':00',
        position: position // Store the complete position string
    };
    

    // Add dynamic fields based on occasion with null checks
    switch (occasion) {
        case 5:
            operationData.waterDepth = document.getElementById('waterDepth').value;
            operationData.estimatedUptakeVolume = document.getElementById('uptakeVolume').value;
            break;
            
        case 4:
            operationData.estimatedCirculatedVolume = document.getElementById('circulationVolume').value;
            operationData.treatmentSystemUsed = document.getElementById('treatmentSystem').value;
            operationData.conformBWMPlan = parseInt(document.getElementById('bwmPlan').value);
            break;
            
        case 3:
            operationData.estimatedDischargedVolume = parseFloat(document.getElementById('dischargeVolume').value);
            operationData.remainingVolume = parseFloat(document.getElementById('remainingVolume').value);
            operationData.conformBWMPlan = parseInt(document.getElementById('bwmPlan').value);
            break;
            
        case 2:
            operationData.portFacilityName = document.getElementById('facilityName')?.value;
            operationData.estimatedDischargedVolume = parseFloat(document.getElementById('dischargeVolume').value);
            operationData.conformBWMPlan = parseInt(document.getElementById('bwmPlan').value) || 0;
            break;
            
        case 1:
            operationData.estimatedDischargedVolume = parseFloat(document.getElementById('dischargeVolume').value);
            operationData.circumstancesRemarks = document.getElementById('remarks').value;
            operationData.conformBWMPlan = Boolean(document.getElementById('bwmPlan').value);
            break;
    }
    
    // Combine date and time into a single datetime string if needed by API

    
    // Create the final data object
    const data = {
        operationType: occasion,
        operationData: operationData
    };
    
    console.log('Submitting Ballast Water Record:', data);
    
    try {
        let response = await api.createbwrRecord(data);
        console.log('API Response:', response);
        showSuccessNotification('Ballast water record submitted successfully!');
        form.reset();
    } catch (error) {
        console.error('Submission Error:', error);
        showErrorNotification(error.response?.data?.message || 'An error occurred during submission');
    }
});