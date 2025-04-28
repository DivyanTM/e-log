document.querySelector('#cargoRecordForm').addEventListener('submit', async function (event) {
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
        case 11: // Assuming 2 is the case for accidental discharge
            operationData.placeOfLoading = document.getElementById('placeOfLoading').value;
            operationData.tankIdentity = document.getElementById('tankIdentity').value;
            operationData.nameOfSubstance = document.getElementById('substance').value;
            operationData.category = document.getElementById('category').value;

            break;

        case 10:
            operationData.placeOfUnloading = document.getElementById('placeOfUnloading').value;
            operationData.tanksUnloaded = document.getElementById('tanksUnloaded').value;
            operationData.wasTankEmptied = document.getElementById('wasTankEmptied').value;
            operationData.prewashRequired = document.getElementById('prewashRequired').value;
            operationData.failureTime = document.getElementById('failureTime').value;
            operationData.failureReason = document.getElementById('failureReason').value;
            operationData.operationalTime = document.getElementById('operationalTime').value;

            break;

        case 9:
            operationData.nameOfCargo = document.getElementById('cargoName').value;
            operationData.categoryOfCargo = document.getElementById('cargoCategory').value;
            operationData.tankFrom = document.getElementById('sourceTank').value;
            operationData.tankTo = document.getElementById('destinationTank').value;
            operationData.wasTankEmptied = document.getElementById('tankEmptied').value;
            break;

        case 8:
            operationData.tankDetails = document.getElementById('tankIdentification').value;
            operationData.wereWashingsDischarged = document.getElementById('washingsDischarged').value;
            operationData.dischargeRate = parseFloat(document.getElementById('dischargeRate').value) || null;
            operationData.wereSlopDischarged = document.getElementById('slopsDischarged').value;
            operationData.quantityDischarged = parseFloat(document.getElementById('slopsQuantity').value) || null;
            operationData.slopRate = parseFloat(document.getElementById('slopsDischargeRate').value) || null;
            operationData.startTime = document.getElementById('pumpingStartTime').value +":00";
            operationData.stopTime = document.getElementById('pumpingEndTime').value+":00";
            operationData.shipSpeed = parseFloat(document.getElementById('shipSpeed').value) || null;
            break;
        case 7:
            operationData.tankIdentity = document.getElementById('ballastTanks').value;
            operationData.dischargeMethod = document.getElementById('dischargeMethod').value;
            operationData.receptionFacility = document.getElementById('receptionFacility').value;
            operationData.startTime = document.getElementById('dischargeStartTime').value +":00";
            operationData.stopTime = document.getElementById('dischargeEndTime').value +":00";
            operationData.shipSpeed = parseFloat(document.getElementById('dischargeSpeed').value);
            break;
        case 6:
            operationData.port = document.getElementById('port').value;
            operationData.tankDetails = document.getElementById('tankDetails').value;
            operationData.substances = document.getElementById('substances').value;
            operationData.categories = document.getElementById('categories').value;
            operationData.tanksEmptied = document.getElementById('tanksEmptied').value;
            operationData.prewashDone = document.getElementById('prewashDone').value;
            operationData.tankWashingsDischarged = document.getElementById('tankWashingsDischarged').value;
            operationData.exemptionGranted = document.getElementById('exemptionGranted').value;
            operationData.exemptionReason = document.getElementById('exemptionReason').value;
            operationData.surveyorName = document.getElementById('surveyorName').value;
            operationData.surveyorSignature = document.getElementById('surveyorSignature').value;
            operationData.organization = document.getElementById('organization').value;
            break;
        case 5:
            operationData.cleaningTime = document.getElementById('cleaningTime').value+':00';
            operationData.tankDetails = document.getElementById('tankSubstanceCategory').value;


            operationData.washingProcedure = document.getElementById('washingProcedure').value;

            operationData.cleaningAgent = document.getElementById('cleaningAgents').value;

            operationData.cleaningAgentQuantity = document.getElementById('cleaningAgentQuantity').value;

            operationData.numFansUsed = document.getElementById('ventilationFanCount').value;
            operationData.ventilationDuration = document.getElementById('ventilationDuration').value;
            operationData.intoSea = document.getElementById('dischargedToSea').value;
            operationData.receptionFacility = document.getElementById('receptionFacilityPort').value;
            operationData.slopTank = document.getElementById('slopsCollectingTank').value;
            operationData.tankWashingsTransferred = document.getElementById('transferredWashingsQuantity').value;

            operationData.transferDateTime = parseFloat(document.getElementById('transferDateTime').value);
            break;

        case 4:
            operationData.tankDetails = document.getElementById('tankSubstanceCategory').value;
            operationData.numCleaningMachines = document.getElementById('cleaningMachinesCount').value;
            operationData.washDuration = document.getElementById('washingDuration').value;
            operationData.washType = document.getElementById('washType').value;

            operationData.unloadingPortFacility = document.getElementById('unloadingPortFacility').value;
            operationData.otherFacility = document.getElementById('otherReceptionFacility').value;
            operationData.tankWashingsTransferred = document.getElementById('washingsQuantity').value;
            operationData.transferDateTime = document.getElementById('transferDateTime').value + ':00';
            break;

        case 3:
            operationData.tankIdentity = document.getElementById('ballastedTanks').value;
            operationData.startTime = document.getElementById('ballastingStartTime').value +':00';

            break;

        case 2:
            operationData.recordDate = document.getElementById('operationDate')?.value;

            operationData.recordTime = document.getElementById('operationTime')?.value ;

            operationData.remarks = document.getElementById('operationRemarks')?.value;
            break;
        case 1:
            operationData.occurrenceTime = document.getElementById('dischargeTime').value + ':00';
            operationData.quantity = parseFloat(document.getElementById('dischargeQuantity').value) || null;
            operationData.substance = document.getElementById('dischargeSubstance').value;
            operationData.category = document.getElementById('dischargeCategory').value;
            operationData.circumstances = document.getElementById('dischargeCircumstances').value;
            operationData.remarks = document.getElementById('dischargeRemarks').value;
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
        let response = await api.createcrbRecord(data);
        console.log('API Response:', response);
        showSuccessNotification('Cargo record submitted successfully!');
        form.reset();
    } catch (error) {
        console.error('Submission Error:', error);
        showErrorNotification(error.response?.data?.message || 'An error occurred during submission');
    }
});