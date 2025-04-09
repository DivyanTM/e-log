document.querySelector('#orb1RecordForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    // Get form values using both FormData and direct access (for dynamic fields)
    const occasion = parseInt(document.getElementById('occasion').value);

    // Create operationData object
    const operationData = {
    };


    // Add dynamic fields based on occasion with null checks
    switch (occasion) {
        case 9:
            operationData.date = document.getElementById('operationDate').value;
            operationData.time = document.getElementById('operationTime').value;
            operationData.remarks = document.getElementById('operationRemarks').value;
            break;
        case 8:
            operationData.placeOfBunkering = document.getElementById('placeOfBunkering').value;
            operationData.timeOfBunkering = document.getElementById('timeOfBunkering').value;

            operationData.fuelOilType = document.getElementById('fuelOilType').value;
            operationData.fuelOilQuantityAdded = document.getElementById('fuelOilQuantityAdded').value;
            operationData.fuelOilTotalContent = document.getElementById('fuelOilTotalContent').value;
            operationData.fuelOilTankIdentity = document.getElementById('fuelOilTankIdentity').value;

            operationData.lubricatingOilType = document.getElementById('lubricatingOilType').value;
            operationData.lubricatingOilQuantityAdded = document.getElementById('lubricatingOilQuantityAdded').value;
            operationData.lubricatingOilTotalContent = document.getElementById('lubricatingOilTotalContent').value;
            operationData.lubricatingOilTankIdentity = document.getElementById('lubricatingOilTankIdentity').value;
            break;
        case 7:
            operationData.timeOfOccurrence = document.getElementById('time-of-occurrence').value;
            operationData.latitude = document.getElementById('latitude').value;
            operationData.longitude = document.getElementById('longitude').value;
            operationData.quantityOfOil = document.getElementById('oil-quantity').value;
            operationData.typeOfOil = document.getElementById('oil-type').value;
            operationData.circumstancesOfDischarge = document.getElementById('oil-circumstance').value;
            operationData.actionsTaken = document.getElementById('oil-actions-taken').value;
            operationData.remarks = document.getElementById('oil-remarks').value;

            break;
        case 6:
            operationData.systemFailureTime = document.getElementById('systemFailureTime')?.value.trim() || '';
            operationData.systemOperationalTime = document.getElementById('systemOperationalTime')?.value.trim() || '';
            operationData.failureReason = document.getElementById('failureReason')?.value.trim() || '';

            break;
        case 5:
            operationData.dischargeOverboardTime = document.getElementById('dischargeOverboardTime')?.value.trim() || '';
            operationData.dischargeOverboardLatitude = document.getElementById('dischargeOverboardLatitude')?.value.trim() || '';
            operationData.dischargeOverboardLongitude = document.getElementById('dischargeOverboardLongitude')?.value.trim() || '';

            operationData.transferToHoldingTankTime = document.getElementById('transferToHoldingTankTime')?.value.trim() || '';
            operationData.transferToHoldingTankLatitude = document.getElementById('transferToHoldingTankLatitude')?.value.trim() || '';
            operationData.transferToHoldingTankLongitude = document.getElementById('transferToHoldingTankLongitude')?.value.trim() || '';

            operationData.systemPutToManualModeTime = document.getElementById('systemPutToManualModeTime')?.value.trim() || '';


            break;

        case 4:
            operationData.tankIdentity = document.querySelector('#tankIdentity')?.value || '';
            operationData.tankCapacity = parseFloat(document.querySelector('#tankCapacity')?.value || '');
            operationData.totalQuantityRetention = parseInt(document.querySelector('#totalQuantityRetention')?.value || '');
            operationData.quantityResidueCollectedManually = parseInt(document.querySelector('#quantityResidueCollectedManually')?.value || '');
            
            const entry = document.querySelector('#disposal-methods .method-entry');
            if (entry) {
                const method = entry.querySelector('.method-select')?.value || '';
                const fieldsContainer = entry.querySelector('.method-fields');
            
                let additionalParts = [];
                if (fieldsContainer) {
                    const inputs = fieldsContainer.querySelectorAll('input, select, textarea');
                    inputs.forEach(input => {
                        const key = input.id || input.name;
                        const value = input.value || '';
                        if (key) {
                            additionalParts.push(`${key}:${value}`);
                        }
                    });
                }
            
                const additionalValue = additionalParts.join(',');
                operationData.methodsTransferDisposal = `${method}${additionalValue ? ',' + additionalValue : ''}`;
            } else {
                operationData.methodsTransferDisposal = '';
            }
            break;

        case 3:
            operationData.collectionTankIdentity = document.getElementById("collectionTankIdentity").value;
            operationData.collectionTankCapacity = document.getElementById("collectionTankCapacity").value;
            operationData.collectionTotalQuantityRetained = document.getElementById("collectionTotalQuantityRetained").value;
            operationData.collectionQuantityCollectedManually = document.getElementById("collectionQuantityCollectedManually").value;

            operationData.transferDisposalMethod = document.getElementById("transferDisposalMethod").value;
            operationData.transferDisposalQuantity = document.getElementById("transferDisposalQuantity").value;
            operationData.transferDisposalTanksEmptied = document.getElementById("transferDisposalTanksEmptied").value;
            operationData.transferDisposalQuantityRetained = document.getElementById("transferDisposalQuantityRetained").value;
            break;

        case 2:
            const tankInputs = document.querySelectorAll('#discharge-tanks .tankIdentity');
            operationData.tankIdentity = Array.from(tankInputs)
                .map(input => input.value.trim())
                .filter(val => val !== "")
                .join(', ');

            // Start position
            const startLat = document.getElementById('startPosition-lat').value.trim();
            const startLong = document.getElementById('startPosition-long').value.trim();
            operationData.startPosition = `${startLat}, ${startLong}`;

            // End position
            const endLat = document.getElementById('endPosition-lat').value.trim();
            const endLong = document.getElementById('endPosition-long').value.trim();
            operationData.endPosition = `${endLat}, ${endLong}`;

            // Speed, method, and quantity
            operationData.shipSpeedDuringDischarge = document.getElementById('shipSpeedDuringDischarge').value.trim();
            operationData.dischargeMethod = document.getElementById('dischargeMethod').value;
            operationData.quantityDischarged = document.getElementById('quantityDischarged').value.trim();
            break;
        case 1:
            operationData.tankIdentity = document.getElementById("tankIdentity").value;
            operationData.cleanedSinceLastOil = document.getElementById("cleanedSinceLastOil").value;
            operationData.cleaningProcessStartLatitude = document.getElementById("cleaningProcessStartLatitude").value;
            operationData.cleaningProcessStartLongitude = document.getElementById("cleaningProcessStartLongitude").value;
            operationData.cleaningProcessStartTime = document.getElementById("cleaningProcessStartTime").value;
            operationData.cleaningProcessEndLatitude = document.getElementById("cleaningProcessEndLatitude").value;
            operationData.cleaningProcessEndLongitude = document.getElementById("cleaningProcessEndLongitude").value;
            operationData.cleaningProcessEndTime = document.getElementById("cleaningProcessEndTime").value;

            operationData.tankNumber = document.getElementById("tankNumber").value;
            operationData.tankForCleaningWaterTransfer = document.getElementById("tankForCleaningWaterTransfer").value;
            operationData.cleaningMethod = document.getElementById("cleaningMethod").value;
            operationData.chemicalsUsed = document.getElementById("chemicalsUsed").value;

            operationData.ballastingStartLatitude = document.getElementById("ballastingStartLatitude").value;
            operationData.ballastingStartLongitude = document.getElementById("ballastingStartLongitude").value;
            operationData.ballastingStartTime = document.getElementById("ballastingStartTime").value;
            operationData.ballastingEndLatitude = document.getElementById("ballastingEndLatitude").value;
            operationData.ballastingEndLongitude = document.getElementById("ballastingEndLongitude").value;
            operationData.ballastingEndTime = document.getElementById("ballastingEndTime").value;

            operationData.quantityBallastIfNotCleaned = document.getElementById("quantityBallastIfNotCleaned").value;
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
        let response = await api.createorb1Record(data);
        console.log('API Response:', response);
        alert('Record submitted successfully!');
        form.reset();
    } catch (error) {
        console.error('Submission Error:', error);
        alert(error.response?.data?.message || 'An error occurred during submission');
    }
});