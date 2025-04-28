    function handleOperationChange() {
        const operation = document.getElementById('orb2-operation-select').value;
        const submitBtn = document.querySelector('#form-buttons button.btn-primary');
        const cancelBtn = document.querySelector('#form-buttons button.btn-danger');
        const formButtons = document.getElementById('form-buttons');
    
        if (operation) {
            // Show the buttons
            formButtons.style.display = 'flex';
    
            // Dynamically assign the onclick function
            submitBtn.setAttribute('onclick', `submitOperation('${operation}')`);
            cancelBtn.setAttribute('onclick',`clearOrb2${operation}FormData()`);
        } else {
            // Hide buttons if nothing is selected
            formButtons.style.display = 'none';
            submitBtn.removeAttribute('onclick');
            cancelBtn.removeAttribute('onclick');
        }
    }
    
    
    function submitOperation(opType) {
        
        switch (opType) {
          case 'A':
            console.log("Loading of oil cargo");
            fetchOrb2AFormData();
            break;
          case 'B':
            console.log("Internal transfer of oil cargo during voyage");
            fetchOrb2BFormData();
            break;
          case 'C':
            console.log("Unloading of oil cargo");
            fetchOrb2CFormData();
            break;
          case 'D':
            console.log("Crude Oil Washing (COW Tankers only)");
            fetchOrb2DFormData();
            break;
          case 'E':
            console.log("Ballasting of cargo tanks");
            fetchOrb2EFormData();
            break;
          case 'F':
            console.log("Ballasting of dedicated clean ballasting tanks (CBT Tankers only)");
            fetchOrb2FFormData();
            break;
          case 'G':
            console.log("Cleaning of cargo tanks");
            fetchOrb2GFormData();
            break;
          case 'H':
            console.log("Discharge of dirty ballast");
            fetchOrb2HFormData();
            break;
          case 'I':
            console.log("Discharge of water from slop tanks into the sea");
            fetchOrb2IFormData();
            break;
          case 'J':
            console.log("Collection, Transfer and disposal of residues not otherwise dealt with");
            fetchOrb2JFormData();
            break;
          case 'K':
            console.log("Discharge of clean ballast contained in cargo tanks");
            fetchOrb2KFormData();
            break;
          case 'L':
            console.log("Discharge of ballast from dedicated clean ballast tanks (CBT Tankers only)");
            fetchOrb2LFormData();
            break;
          case 'M':
            console.log("Condition of oil discharge monitoring and control system");
            fetchOrb2MFormData();
            break;
          case 'N':
            console.log("Accidental or other exceptional discharges of oil");
            fetchOrb2NFormData();
            break;
          case 'O':
            console.log("Additional operational procedures and general remarks");
            fetchOrb2OFormData();
            break;
          case 'P':
            console.log("Loading of ballast water");
            fetchOrb2PFormData();
            break;
          case 'Q':
            console.log("Re-allocation of ballast water within the ship");
            fetchOrb2QFormData();
            break;
          case 'R':
            console.log("Ballast water discharge to reception facility");
            fetchOrb2RFormData();
            break;
          default:
            console.log("Please select a valid operation");
        }
    }
    async function fetchOrb2AFormData() {
        const form = document.getElementById('orb1-a-form');
        let isValid = true;
    
        
        const placeOfLoading = form.querySelector('#placeOfLoading').value.trim();
        const typeOfOilLoaded = form.querySelector('#typeOfOilLoaded').value.trim();
        const quantityAdded = parseFloat(form.querySelector('#quantityAdded').value.trim());
        const totalContentOfTanks = parseFloat(form.querySelector('#totalContentOfTanks').value.trim());
    
        
        const tankEntries = [];
        form.querySelectorAll(".tank-entryofLooc").forEach(row => {
            const tankIdentity = row.querySelector("input[name='tankIdentity[]']").value.trim();
            const quantityLoadedM3 = row.querySelector("input[name='quantityLoadedM3[]']").value.trim();
    
            if (tankIdentity && quantityLoadedM3 !== '') { 
                tankEntries.push({
                    tankIdentity,
                    quantityLoadedM3: parseFloat(quantityLoadedM3) || 0
                });
            }
        });
    
        // Validation function
        function showError(field, message) {
            alert(`Error in ${field}: ${message}`);
            isValid = false;
        }
    
        // Validate required fields
        if (!placeOfLoading) showError('Place of Loading', 'This field is required.');
        if (!typeOfOilLoaded) showError('Type of Oil Loaded', 'This field is required.');
    
        // Validate numeric fields
        if (quantityAdded === '' || isNaN(quantityAdded) || Number(quantityAdded) < 0) {
            showError('Quantity Added', 'Must be a valid non-negative number.');
        }
        if (totalContentOfTanks === '' || isNaN(totalContentOfTanks) || Number(totalContentOfTanks) < 0) {
            showError('Total Content of Tanks', 'Must be a valid non-negative number.');
        }
    
        // Validate tank entries
        if (tankEntries.length === 0) {
            showError('Tank Entries', 'At least one tank entry must be added.');
        } else {
            tankEntries.forEach((tank, index) => {
                if (!tank.tankIdentity) showError(`Tank ${index + 1} Identity`, 'This field is required.');
                if (isNaN(tank.quantityLoadedM3) || tank.quantityLoadedM3 < 0) {
                    showError(`Tank ${index + 1} Quantity`, 'Must be a valid non-negative number.');
                }
            });
        }
    
        if (!isValid) {
            return; 
        }
    
       
        const formData = {
            placeOfLoading,
            typeOfOilLoaded,
            quantityAdded: parseFloat(quantityAdded),
            totalContentOfTanks: parseFloat(totalContentOfTanks),
            tanks: tankEntries
        };
    
        const data = {
            operationType: 'A',
            formData
        };
    
        console.log("Received from form ", data); 
    
        clearOrb2AFormData();
    
        try {
            const response = await api.createorb2(data);
            showSuccessNotification(response.message);
        } catch (error) {
            showErrorNotification(error.message);
        }
        hideRecordsLoader();
    }

    async function fetchOrb2BFormData() {
        const form = document.getElementById('orb1-b-form');
        const tankContainer = document.getElementById('tankIdentityContainers');
        const tankEntries = tankContainer.querySelectorAll('.row');
        const tanks = [];
        let isValid = true;
    
        // Collect dynamic tank data
        tankEntries.forEach(row => {
            const tankIdentity = row.querySelector('input[name="tankIdentity[]"]')?.value.trim();
            const tankRole = row.querySelector('select[name="tankRole[]"]')?.value;
            const tankQuantity = parseFloat(row.querySelector('input[name="tankQuantity[]"]')?.value.trim());
    
            if (tankIdentity && !isNaN(tankQuantity)) {
                tanks.push({ tankIdentity, tankRole, tankQuantity });
            }
        });
    
        // Collect form values
        const quantityTransferred = parseFloat(form.querySelector('#quantityTransferred').value.trim());
        const totalQuantityTanks = parseFloat(form.querySelector('#totalQuantityTanks').value.trim());
        const tankEmptied = form.querySelector('#tankEmptied').value;
        const quantityRetained = parseFloat(form.querySelector('#quantityRetained').value.trim());
    
        // Validation helper
        function showError(field, message) {
            alert(`Error in ${field}: ${message}`);
            isValid = false;
        }
    
        // Validate fields
        if (isNaN(quantityTransferred) || quantityTransferred < 0) {
            showError('Quantity Transferred', 'Must be a valid non-negative number.');
        }
        if (isNaN(totalQuantityTanks) || totalQuantityTanks < 0) {
            showError('Total Quantity of Tanks', 'Must be a valid non-negative number.');
        }
        if (!tankEmptied) {
            showError('Tank Emptied', 'This field is required.');
        }
        if (tankEmptied === "No" && (isNaN(quantityRetained) || quantityRetained < 0)) {
            showError('Quantity Retained', 'Must be a valid non-negative number when tanks are not emptied.');
        }
    
        if (tanks.length === 0) {
            showError('Tanks', 'At least one tank entry is required.');
        }
    
        if (!isValid) return;
    
        // Construct data object
        const data = {
            operationType: 'B',
            formData: {
                quantityTransferred,
                totalQuantityTanks,
                tankEmptied,
                quantityRetained: tankEmptied === "No" ? quantityRetained : 0,
                tanks
            }
        };
    
        console.log("Submitting:", data);
        clearOrb2BFormData();
    
        try {
            const response = await api.createorb2(data); 
            showSuccessNotification(response.message);
        } catch (error) {
            showErrorNotification(error.message);
        }
        hideRecordsLoader();
    }
    
    
    async function fetchOrb2CFormData() {
        const form = document.getElementById('orb1-c-form');
        let errors = [];
    
        
        const tanks = [];
        form.querySelectorAll('#tankEntriesUnload .tank-entry').forEach((entry, index) => {
            const identityInput = entry.querySelector('input[name^="tankIdentityUnload_"]');
            const quantityInput = entry.querySelector('input[name^="tankQuantityUnload_"]');
            const identity = identityInput?.value.trim();
            const quantity = quantityInput?.value.trim();
    
            if (identity && quantity && !isNaN(quantity) && parseFloat(quantity) >= 0) {
                tanks.push({
                    identity,
                    quantity: quantity
                });
            } else {
                errors.push(`Tank entry ${index + 1} is incomplete or invalid.`);
            }
        });
    
        
        const placeOfUnloading = form.querySelector('#PlaceOfUnloading').value.trim();
        const tankEmptiedUnload = form.querySelector('#tankEmptiedUnload').value;
        const quantityRetainedUnload =  form.querySelector('#quantityRetainedUnload').value.trim() || "0.0";
    
        console.log("QR IN ULOAD : ",quantityRetainedUnload);
        if (!placeOfUnloading) {
            errors.push("Place of Unloading is required.");
        }
    
        if (!tankEmptiedUnload) {
            errors.push("Tank Emptied selection is required.");
        }
    
        if (tankEmptiedUnload !== 'Yes') {
            if (!quantityRetainedUnload) {
                errors.push("Quantity Retained is required.");
            } else if (isNaN(quantityRetainedUnload) || parseFloat(quantityRetainedUnload) < 0) {
                errors.push("Quantity Retained must be a valid non-negative number.");
            }
        }
        
    
        if (tanks.length === 0) {
            errors.push("At least one valid tank entry is required.");
        }
    
        
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return null;
        }
    
        
        const formData = {
            tanks,
            placeOfUnloading,
            tankEmptiedUnload,
            quantityRetainedUnload: parseFloat(quantityRetainedUnload),
        };
    
        const data = {
            operationType: 'C',
            formData
        };
    console.log(data);
        clearOrb2CFormData();
    
        try {
            const response = await api.createorb2(data);
            showSuccessNotification(response.message);
        } catch (error) {
            showErrorNotification(error.message);
        }
        hideRecordsLoader();
    }
    
    
    async function fetchOrb2DFormData() {
        const form = document.getElementById('orb1-d-form');
        const tankBlocks = form.querySelectorAll('.tank-wash-block');
        const cowData = [];
        let isValid = true;
        let errorMessage = "";
    
        tankBlocks.forEach(block => {
            const tankIdentity = block.querySelector('input[name="tankIdentity[]"]').value.trim();
            const cowPort = block.querySelector('input[name="cowPort[]"]').value.trim();
            const cowShipPosition = block.querySelector('input[name="cowShipPosition[]"]').value.trim();
            const machinesInUse = block.querySelector('input[name="machinesInUse[]"]').value.trim();
            const startTimeWashing = block.querySelector('input[name="startTimeWashing[]"]').value;
            const washingPattern = block.querySelector('select[name="washingPattern[]"]').value.trim();
            const washingLinePressure = block.querySelector('input[name="washingLinePressure[]"]').value.trim();
            const endTimeWashing = block.querySelector('input[name="endTimeWashing[]"]').value;
            const methodOfEstablishing = block.querySelector('select[name="methodOfEstablishing[]"]').value;
            const cowRemarks = block.querySelector('textarea[name="cowRemarks[]"]').value.trim();
    
            // Required field validation
            if (!tankIdentity || !cowPort || !cowShipPosition || !machinesInUse || !startTimeWashing || 
                !washingPattern || !washingLinePressure || !endTimeWashing || !methodOfEstablishing) {
                isValid = false;
                errorMessage += "All fields are required.\n";
            }
    
            // Ensure washingLinePressure is a valid number
            if (isNaN(parseFloat(washingLinePressure))) {
                isValid = false;
                errorMessage += "Washing line pressure must be a valid number.\n";
            }
    
            // Time validation (Start time should be before End time)
            if (new Date(startTimeWashing) >= new Date(endTimeWashing)) {
                isValid = false;
                errorMessage += "Start time must be before end time.\n";
            }
    
            cowData.push({
                tankIdentity,
                cowPort,
                cowShipPosition,
                machinesInUse:parseInt(machinesInUse,10),
                startTimeWashing,
                washingPattern,
                washingLinePressure:parseFloat(washingLinePressure),
                endTimeWashing,
                methodOfEstablishing,
                cowRemarks
            });
        });
    
        if (!isValid) {
            alert(errorMessage);
            return; // Stop function execution if validation fails
        }
    
        let data = {
            operationType: 'D',
            formData: {
                tanks: cowData
            }
        };
        
    
        console.log("From form : ",data);
        clearOrb2DFormData();
        try {
            const response = await api.createorb2(data);
         
            showSuccessNotification(response.message);
        } catch (error) {
            showErrorNotification(error.message);
        }
    
        hideRecordsLoader();  
    }
    
    async function fetchOrb2EFormData() {
        const form = document.getElementById('orb1-e-form');
    
        // Retrieve and trim position fields
        const startBallasting = form.querySelector('input[name="start_ballasting_place"]').value.trim();
        const endBallasting = form.querySelector('input[name="end_ballasting_place"]').value.trim();
    
        // Validation
        if (!startBallasting) {
            alert("Start Ballasting Place is required.");
            return;
        }
        if (!endBallasting) {
            alert("End Ballasting Place is required.");
            return;
        }
    
        // Retrieve dynamic tank entries
        const tankIdentities = form.querySelectorAll('input[name="tankIdentity[]"]');
        const startTimes = form.querySelectorAll('input[name="startTime[]"]');
        const endTimes = form.querySelectorAll('input[name="endTime[]"]');
        const quantities = form.querySelectorAll('input[name="quantityReceived[]"]');
    
        const tanks = [];
    
        for (let i = 0; i < tankIdentities.length; i++) {
            const identity = tankIdentities[i].value.trim();
            const startTime = startTimes[i].value;
            const endTime = endTimes[i].value;
            const quantity = quantities[i].value.trim();
    
            if (!identity || !startTime || !endTime || !quantity) {
                alert(`All tank fields (identity, start time, end time, quantity) must be filled for tank ${i + 1}.`);
                return;
            }
    
            tanks.push({
                identity,
                startTime,
                endTime,
                quantity: parseFloat(quantity)
            });
        }
    
        if (tanks.length === 0) {
            alert("At least one tank entry is required.");
            return;
        }
    
        // Final data structure
        const formData = {
            startBallasting,
            endBallasting,
            tanks
        };
    
        const data = {
            operationType: 'E',
            formData
        };
    
        console.log("From form: ", data);
    clearOrb2EFormData();
        
        try {
            const response = await api.createorb2(data);
           
            showSuccessNotification(response.message);
        } catch (error) {
            showErrorNotification(error.message);
            
        }
        hideRecordsLoader();
    }
    
    
    async function fetchOrb2FFormData() {
        const form = document.getElementById('orb1-f-form');
    
     
        const port = form.querySelector('input[name="port"]').value.trim();
        const positionPortBallast = form.querySelector('input[name="positionPortBallast"]').value.trim();
        const positionFlush = form.querySelector('input[name="PositionFlush"]').value.trim();
        const oilyWaterQty = form.querySelector('input[name="oilyWaterQty"]').value.trim();
        const slopTankInputs = form.querySelectorAll('input[name="sloptankIdentity[]"]');
        const slopTankIdentities = Array.from(slopTankInputs).map(input => input.value.trim()).filter(val => val !== '');
        const positionAdditionalBallast = form.querySelector('input[name="positionAdditionalBallast"]').value.trim();
        const valveTime = form.querySelector('input[name="valveTime"]').value.trim();
        const valvePosition = form.querySelector('input[name="valvePosition"]').value.trim();
        const cleanBallastQty = form.querySelector('input[name="cleanBallastQty"]').value.trim();
    
        
        let errors = [];
        if (slopTankIdentities.length === 0) errors.push("At least one slop tank identity is required.");
        if (!port) errors.push("Port is required.");
        if (!positionPortBallast) errors.push("Position when water taken to CBT tank is required.");
        if (!positionFlush) errors.push("Position of flush is required.");
        if (!oilyWaterQty || isNaN(oilyWaterQty) || Number(oilyWaterQty) < 0) {
            errors.push("Oily water quantity must be a valid non-negative number.");
        }
        if (!slopTankIdentities) errors.push("Tank(s) where oily water was transferred is required.");
        if (!positionAdditionalBallast) errors.push("Position when additional ballast was taken is required.");
        if (!valveTime) errors.push("Valve time is required.");
        if (!valvePosition) errors.push("Valve position is required.");
        if (!cleanBallastQty || isNaN(cleanBallastQty) || Number(cleanBallastQty) < 0) {
            errors.push("Clean ballast quantity must be a valid non-negative number.");
        }
    
       
        const tanks = [];
        const tankInputs = form.querySelectorAll('#tankEntriesCBT input[name="tankIdentity[]"]');
        tankInputs.forEach(input => {
            const tankValue = input.value.trim();
            if (tankValue) {
                tanks.push(tankValue);
            }
        });
    
        if (tanks.length === 0) errors.push("At least one CBT tank identity is required.");
    
        
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }
    
       
        const formData = {
            port,
            positionPortBallast,
            positionFlush,
            oilyWaterQty: Number(oilyWaterQty),
            slopTankIdentities,
            positionAdditionalBallast,
            valveTime,
            valvePosition,
            cleanBallastQty: Number(cleanBallastQty),
            tanks
        };
    
        const data = {
            operationType: 'F',
            formData
        };
    
        console.log("Submitting ORB2 Section F data:", data);
        clearOrb2FFormData();
    
        try {
            const response = await api.createorb2(data);
            
            showSuccessNotification(response.message);
        } catch (error) {
            showErrorNotification(error.message);
        }
        hideRecordsLoader();
    }
    
    
    
    async function fetchOrb2GFormData() {
        const form = document.getElementById('orb1-g-form');
        if (!form) {
            console.error("Form not found!");
            return;
        }
    
        let errors = [];
    
        // Fetch dynamic tank identities
        const tanks = [];
        const tankInputs = form.querySelectorAll('#tankEntriesCleaning input[name="tankIdentity[]"]');
        tankInputs.forEach(input => {
            const tankValue = input.value.trim();
            if (tankValue) {
                tanks.push(tankValue);
            }
        });
    
        if (tanks.length === 0) {
            errors.push("At least one tank identity is required.");
        }
    
        // Helper function to validate number fields
        function validateNumber(value, fieldName, isInteger = false) {
            if (value === "") {
                errors.push(`${fieldName} is required.`);
                return null;
            }
            const numValue = isInteger ? parseInt(value, 10) : parseFloat(value);
            if (isNaN(numValue) || numValue < 0) {
                errors.push(`${fieldName} must be a valid ${isInteger ? 'integer' : 'number'}.`);
                return null;
            }
            return numValue;
        }
    
        // Fetch and validate input fields
        const portOrPosition = form.querySelector('input[name="portPosition"]').value.trim();
        if (!portOrPosition) errors.push("Port or ship position is required.");
    
        const durationCleaning = form.querySelector('input[name="cleaningDuration"]').value.trim();
        if (!durationCleaning) errors.push("Duration of cleaning is required.");
    
        const methodCleaning = form.querySelector('select[name="cleaningMethod"]').value.trim();
        if (!methodCleaning) errors.push("Method of cleaning is required.");
    
        const TWT = form.querySelector('select[name="TWT"]').value;
        if (!TWT) errors.push("Tanks Washing Transferred To (TWT) selection is required.");
    
        // Fields for Reception Facility
        let portRF = null;
        let quantityRF = null;
    
        // Fields for Slop Tank
        let slopTankName = null;
        let quantityTransferred = null;
        let totalQuantity = null;
    
        if (TWT === "rf") {
            portRF = form.querySelector('input[name="portOfRF"]').value.trim();
            if (!portRF) errors.push("Port of Reception Facility is required.");
    
            quantityRF = validateNumber(form.querySelector('input[name="quantityRF"]').value.trim(), "Quantity (Reception Facility)");
        } else if (TWT === "slop") {
            slopTankName = form.querySelector('input[name="slopTankName"]').value.trim();
            if (!slopTankName) errors.push("Slop/Cargo Tank name is required.");
    
            quantityTransferred = validateNumber(form.querySelector('input[name="quantityTransferred"]').value.trim(), "Quantity Transferred");
            totalQuantity = validateNumber(form.querySelector('input[name="totalQuantity"]').value.trim(), "Total Quantity");
        }
    
        // If there are validation errors, display them and stop execution
        if (errors.length > 0) {
            console.error("Validation Errors:", errors);
            alert("Please fix the following errors:\n" + errors.join("\n"));
            return;
        }
    
        // Create the final data object
        const formData = {
            tanks,
            portOrPosition,
            durationCleaning,
            methodCleaning,
            TWT
        };
    
        // Conditionally append either RF or Slop/Cargo Tank data
        if (TWT === "rf") {
            formData.portRF = portRF;
            formData.quantityRF = quantityRF;
        } else if (TWT === "slop") {
            formData.slopTankName = slopTankName;
            formData.quantityTransferred = quantityTransferred;
            formData.totalQuantity = totalQuantity;
        }
    
        const data = {
            operationType: 'G',
            formData
        };
    
        console.log("Validated Data:", data);
        clearOrb2GFormData();
    
        try {
            const response = await api.createorb2(data);
            showSuccessNotification(response.message);
        } catch (error) {
            showErrorNotification(error.message);
        }
        hideRecordsLoader();
    }
    

async function fetchOrb2HFormData() {
        const form = document.getElementById('orb1-h-form');
    
        let isValid = true;  // Flag to track validation status

    // Fetch dynamic Identity of Tanks
    const tankIdentities = [];
    const tankInputs = form.querySelectorAll('#tankEntriesDischarge input[name="tankIdentity[]"]');
    tankInputs.forEach(input => {
        const value = input.value.trim();
        if (value) {
            tankIdentities.push(value);
        }
    });

    // Fetch dynamic Slop Tank entries
    const slopTanks = [];
    const slopInputs = form.querySelectorAll('#slopTankEntries input[name="tankIdentity[]"]');
    slopInputs.forEach(input => {
        const value = input.value.trim();
        if (value) {
            slopTanks.push(value);
        }
    });

    // Fetch and validate static inputs
    function getInputValue(name, type = "text", required = true) {
        const input = form.querySelector(`[name="${name}"]`);
        if (!input) return null;

        let value = input.value.trim();
        if (required && value === "") {
            alert(`${name.replace(/_/g, " ")} is required.`);
            isValid = false;
        }

        if (type === "number" && value !== "" && isNaN(value)) {
            alert(`${name.replace(/_/g, " ")} must be a valid number.`);
            isValid = false;
        }

        return type === "number" && value !== "" ? parseFloat(value) : value;
    }

    const timeStart = getInputValue("Time of discharge start");
    const positionStart = getInputValue("Position of discharge start");
    const timeComplete = getInputValue("Time of discharge complete");
    const positionComplete = getInputValue("Position of discharge complete");
    const shipsSpeed = getInputValue("ships_speed", "number");
    const quantityDischarged = getInputValue("quantity_discharged", "number");
    
    const shorePort = getInputValue("shore_port", "text", false);
    const shoreQuantity = getInputValue("shore_quantity", "number", false);

    let monitoringSystemRaw = getInputValue("monitoring_system", "text", false);
let regularCheckupRaw = getInputValue("regular_checkup", "text", false);

// Validation: Check if either field is null, empty, or whitespace
if (!monitoringSystemRaw || monitoringSystemRaw.trim() === "") {
    alert("Monitoring system selection is required.");
    isValid = false;
}
if (!regularCheckupRaw || regularCheckupRaw.trim() === "") {
    alert("Regular checkup selection is required.");
    isValid = false;
}

const monitoringSystem = monitoringSystemRaw === 'Yes';
const regularCheckup = regularCheckupRaw === 'Yes';

    // Stop execution if validation fails
    if (!isValid) {
        return;
    }

    // Final structured data
    const formData = {
        tankIdentities,
        timeStart,
        positionStart,
        timeComplete,
        positionComplete,
        shipsSpeed,
        quantityDischarged,
        monitoringSystem,
        regularCheckup,
        slopTanks,
        shorePort,
        shoreQuantity
    };
    let data = {
    operationType:'H',
    formData
    
    };
    console.log("Form data ",data); 
    clearOrb2HFormData();

    try {
        const response = await api.createorb2(data);
        showSuccessNotification(response.message);
    } catch (error) {
        showErrorNotification(error.message);
    }
    hideRecordsLoader();  
}

async function fetchOrb2IFormData() {
    const form = document.getElementById('orb1-i-form');
    const tanksData = [];

    // Collect all tank identities (dynamic)
    const tankInputs = form.querySelectorAll('#tank-section-container input[name="tank_identity[]"]');
    let hasTankError = false;

    tankInputs.forEach((tankInput, index) => {
        const value = tankInput.value.trim();
        if (!value) {
            alert(`Tank identity at position ${index + 1} is required.`);
            hasTankError = true;
            return;
        }
        tanksData.push(value);
    });

    if (hasTankError) return;

    // Helper to validate individual fields
    function validateField(value, fieldName, isNumber = false) {
        const trimmed = value.trim();
        if (!trimmed) {
            alert(`${fieldName} is required.`);
            throw new Error(`${fieldName} is required`);
        }
        return isNumber ? parseFloat(trimmed) : trimmed;
    }

    try {
        // Collect and validate static fields
        const staticData = {
            settling_last_residues: validateField(form.querySelector('input[name="settling_last_residues"]').value, "Settling Last Residues"),
            settling_last_discharge: validateField(form.querySelector('input[name="settling_last_discharge"]').value, "Settling Last Discharge"),
            rate_of_discharge: validateField(form.querySelector('input[name="rate_of_discharge"]').value, "Rate of Discharge", true),
            ullage_completion: validateField(form.querySelector('input[name="ullage_completion"]').value, "Ullage Completion"),
            valves_closed: validateField(form.querySelector('select[name="valves_closed"]').value, "Valves Closed")
        };

        const formData = {
            tanks: tanksData,
            static: staticData
        };
        const data = {
            operationType: 'I',
            formData
        };
        clearOrb2IFormData();
        console.log("Validated Form Data: ", data);
        const response = await api.createorb2(data);
        
        showSuccessNotification(response.message);
          
        
    } catch (error) {
        showErrorNotification(error.message);
        return null;
    }
    hideRecordsLoader();
}
async function fetchOrb2JFormData() {
    
    let formData = {};

    // Validate and fetch tank identities
    let tank_identity = [];
    let tankInputs = document.querySelectorAll('input[name="tank-identity[]"]');
    tankInputs.forEach(input => {
        if (input.value.trim() !== '') {
            tank_identity.push(input.value.trim());
        }
    });

    if (tank_identity.length === 0) {
        alert("Please enter at least one tank identity.");
        return;
    }
    formData.tank_identity = tank_identity;

    // Validate transferred quantity
    let transferredQuantity = document.getElementById('transferredQuantity').value.trim();
    if (!transferredQuantity || isNaN(transferredQuantity) || parseFloat(transferredQuantity) <= 0) {
        alert("Please enter a valid transferred quantity.");
        return;
    }
    formData.transferred_quantity = transferredQuantity;

    // Validate method of disposal
    let method = document.getElementById('Method-of-transfer-or-disposal').value.trim();
    if (!method) {
        alert("Please select a method of disposal.");
        return;
    }
    formData.method_of_disposal = method;

    // Dynamic section validation
    formData.dynamic_data = {};

    if (method === 'disposal to reception facilities') {
        let port = document.getElementById("portNames")?.value.trim();
        let quantity = document.querySelector('input[name="QuantityInvolved"]')?.value.trim();

        if (!port) {
            alert("Please enter the port name for disposal.");
            return;
        }
        if (!quantity || isNaN(quantity) || parseFloat(quantity) <= 0) {
            alert("Please enter a valid quantity involved for disposal.");
            return;
        }

        formData.dynamic_data.port = port;
        formData.dynamic_data.quantity_involved = quantity;

    } else if (method === 'mixed with cargo') {
        let quantity = document.querySelector('input[name="QuantityInvolved"]')?.value.trim();
        if (!quantity || isNaN(quantity) || parseFloat(quantity) <= 0) {
            alert("Please enter a valid quantity mixed with cargo.");
            return;
        }

        formData.dynamic_data.quantity_involved = quantity;

    } else if (method === 'transferred to or from (an)other tank(s) including transfer from machinery space oil residue(sludge) and oily bilge water tanks') {
        let transferredQty = document.querySelector('#methodOfTransportDisposal #transferredQuantity')?.value.trim();
        let totalQty = parseFloat(document.querySelector('input[name="totalQuantitys"]')?.value.trim());
        console.log(totalQty);
        if (!transferredQty || isNaN(transferredQty) || parseFloat(transferredQty) <= 0) {
            alert("Please enter a valid transferred quantity.");
            return;
        }
        if (!totalQty || isNaN(totalQty) ) {
            alert("Please enter a valid total quantity.");
            return;
        }

        let tankInputs = document.querySelectorAll('input[name="tankIdentity[]"]');
        let tankIdentities = [];
        tankInputs.forEach(input => {
            if (input.value.trim() !== '') {
                tankIdentities.push(input.value.trim());
            }
        });

        if (tankIdentities.length === 0) {
            alert("Please enter at least one tank identity for transfer.");
            return;
        }

        formData.dynamic_data.transferred_quantity = transferredQty;
        formData.dynamic_data.total_quantity = totalQty;
        formData.dynamic_data.tank_identities = tankIdentities;

    } else if (method === 'other method') {
        let methodName = document.getElementById('NameOfMethod')?.value.trim();
        let qtyDisposed = document.getElementById('QuantityDisposed')?.value.trim();

        if (!methodName) {
            alert("Please specify the name of the other method.");
            return;
        }
        if (!qtyDisposed || isNaN(qtyDisposed) || parseFloat(qtyDisposed) <= 0) {
            alert("Please enter a valid quantity disposed by other method.");
            return;
        }

        formData.dynamic_data.method_name = methodName;
        formData.dynamic_data.quantity_disposed = qtyDisposed;
    }

    let data = {
        operationType:'J',
        formData
    }
    console.log("Validated Form Data:", data);
    clearOrb2JFormData();

    try {
        const response = await api.createorb2(data);
        
      
        showSuccessNotification(response.message);
    } catch (error) {
        showErrorNotification(error.message);
    }
    hideRecordsLoader();
}

async function fetchOrb2KFormData() {

    const form = document.getElementById('orb1-k-form');
    form.style.display = 'block';

    let formData = {
        dischargedTanks: [],
        positionStart: '',
        tanksEmptyOnCompletion: '',
        positionCompletion: '',
        regularCheckup: ''
    };

    let isValid = true;
    let errorMessages = [];

    // Validate discharged tanks
    const tankInputs = form.querySelectorAll('#tanks-discharged input[name="tanks-in-tdt"]');
    tankInputs.forEach(tank => {
        if (tank.value.trim() !== '') {
            formData.dischargedTanks.push(tank.value.trim());
        }
    });

    if (formData.dischargedTanks.length === 0) {
        isValid = false;
        errorMessages.push("At least one discharged tank must be provided.");
    }

    // Validate Position of ship at start
    const positionStart = form.querySelector('input[name="Position of ship at start of discharge"]').value.trim();
    if (positionStart === '') {
        isValid = false;
        errorMessages.push("Position of ship at start of discharge is required.");
    } else {
        formData.positionStart = positionStart;
    }

    // Validate tank empty on completion
    const tanksEmpty = form.querySelector('select[name="was(were) the tank(s) empty on completion ?"]').value;
    if (tanksEmpty === '' || tanksEmpty === null) {
        isValid = false;
        errorMessages.push("Please select whether the tank(s) were empty on completion.");
    } else {
        formData.tanksEmptyOnCompletion = tanksEmpty;
    }

    // Validate Position of ship on completion
    const positionCompletion = form.querySelector('input[name="Position of ship on completion"]').value.trim();
    if (positionCompletion === '') {
        isValid = false;
        errorMessages.push("Position of ship on completion is required.");
    } else {
        formData.positionCompletion = positionCompletion;
    }

    // Validate regular checkup
    const regularCheckup = form.querySelector('select[name="regular checkup kept"]').value;
    if (regularCheckup === '' || regularCheckup === null) {
        isValid = false;
        errorMessages.push("Please select if a regular checkup was kept.");
    } else {
        formData.regularCheckup = regularCheckup;
    }

    // Final validation check
    if (!isValid) {
        alert("Form validation failed:\n" + errorMessages.join("\n"));
        return;
    }

    let data = {
        operationType : 'K',
        formData
    }
    console.log("Validated Form Data:", data);
    clearOrb2KFormData();
    try {
        const response = await api.createorb2(data);
        hideRecordsLoader();
        showSuccessNotification(response.message);
    } catch (error) {
        showErrorNotification(error.message);
    }

   
}

async function fetchOrb2LFormData() {
    const form = document.getElementById('orb1-l-form');

    let data = {
        dischargedTanks: [],
        positionStart: '',
        timeStart: '',
        positionCompletion: '',
        timeCompletion: '',
        quantityDischargedSea: '',
        quantityDischargedRF: '',
        portRF: '',
        oilContamination: '',
        dischargeMonitored: '',
        valvePosition: '',
        valveTime: ''
    };

    // Helper: validate time (HH:mm or HH:mm:ss)
    const isValidTime = (time) => /^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(time);

    // Collect all dynamic tank entries
    const tankInputs = form.querySelectorAll('#tanks-discharged-CBT input[name="tank-identity"]');
    tankInputs.forEach(tank => {
        if (tank.value.trim() !== '') {
            data.dischargedTanks.push(tank.value.trim());
        }
    });

    if (data.dischargedTanks.length === 0) {
        alert("At least one tank must be selected for discharge.");
        return null;
    }

    // Position Start
    data.positionStart = form.querySelector('input[name="Position of ship at start of discharge"]').value.trim();
    if (!data.positionStart) {
        alert("Position of ship at start of discharge is required.");
        return null;
    }

    // Time Start
    data.timeStart = form.querySelector('input[name="Time of ship at start of discharge of clean ballast into the sea"]').value;
    if (!data.timeStart || !isValidTime(data.timeStart)) {
        alert("Valid start time of discharge is required (format HH:mm or HH:mm:ss).");
        return null;
    }

    // Position Completion (from second matching input)
    const positionCompletionInputs = form.querySelectorAll('input[name="Position of ship at start of discharge"]');
    if (positionCompletionInputs.length > 1) {
        data.positionCompletion = positionCompletionInputs[1].value.trim();
    }
    if (!data.positionCompletion) {
        alert("Position of ship at completion of discharge is required.");
        return null;
    }

    // Time Completion
    data.timeCompletion = form.querySelector('input[name="TSCDS"]').value;
    if (!data.timeCompletion || !isValidTime(data.timeCompletion)) {
        alert("Valid time of completion of discharge is required (format HH:mm or HH:mm:ss).");
        return null;
    }

    // Quantity Discharged Into the Sea
    data.quantityDischargedSea =parseFloat(form.querySelector('#quantityDischargedintothesea').value);
    if (isNaN(data.quantityDischargedSea) || Number(data.quantityDischargedSea) < 0) {
        alert("Quantity discharged into the sea must be a valid non-negative number.");
        return null;
    }

    // Quantity Discharged Into RF
    data.quantityDischargedRF =parseFloat(form.querySelector('#quantityDischargedintoRF').value);
    if (isNaN(data.quantityDischargedRF) || Number(data.quantityDischargedRF) < 0) {
        alert("Quantity discharged into reception facility must be a valid non-negative number.");
        return null;
    }

    // Port of RF
    data.portRF = form.querySelector('#portofRF').value;
    if (!data.portRF) {
        alert("Port of reception facility is required.");
        return null;
    }

    // Oil contamination check
    data.oilContamination = form.querySelector('#WTAIOO').value;
    if (!data.oilContamination || !["Yes", "No"].includes(data.oilContamination)) {
        alert("Select whether the water was contaminated with oil (Yes/No).");
        return null;
    }

    // Discharge monitored
    data.dischargeMonitored = form.querySelector('#WDM').value;
    if (!data.dischargeMonitored || !["Yes", "No"].includes(data.dischargeMonitored)) {
        alert("Select whether the discharge was monitored (Yes/No).");
        return null;
    }

    // Valve Position
    data.valvePosition = form.querySelector('input[name="Position"]').value.trim();
    if (!data.valvePosition) {
        alert("Final valve position is required.");
        return null;
    }

    // Valve Time
    data.valveTime = form.querySelector('input[name="Time"]').value;
    if (!data.valveTime || !isValidTime(data.valveTime)) {
        alert("Valid final valve time is required (format HH:mm or HH:mm:ss).");
        return null;
    }
let datas = {
    operationType : 'L',
    formData : data
};
    console.log(" Validated ORB2L Form Data:", datas);
    clearOrb2LFormData();
    try {
        const response = await api.createorb2(datas);
        hideRecordsLoader();
        showSuccessNotification(response.message);
    } catch (error) {
        showErrorNotification(error);
    }

    
    
}

 async function fetchOrb2MFormData() {
    const form = document.getElementById('orb1-m-form');

    const timeOfSystemFailure = form.querySelector('#time-of-system-failure').value;
    const timeSystemOperational = form.querySelector('#time-of-system-operational').value;
    const reasonForFailure = form.querySelector('#reason-for-failure').value.trim();

    // Validation
    if (!timeOfSystemFailure) {
        alert("Time of system failure is required.");
        return;
    }

    if (!timeSystemOperational) {
        alert("Time when the system became operational is required.");
        return;
    }

    if (!reasonForFailure || reasonForFailure.length < 5) {
        alert("Please provide a valid reason for system failure (at least 5 characters).");
        return;
    }

    // Time logic check (optional but useful)
    const [failHour, failMin] = timeOfSystemFailure.split(":").map(Number);
    const [opHour, opMin] = timeSystemOperational.split(":").map(Number);
    const failureDate = new Date(2000, 0, 1, failHour, failMin);
    const operationalDate = new Date(2000, 0, 1, opHour, opMin);

    if (operationalDate <= failureDate) {
        alert("System operational time must be after the system failure time.");
        return;
    }

    const formData = {
        timeOfSystemFailure,
        timeSystemOperational,
        reasonForFailure
    };
    let data = {
        operationType : 'M',
        formData
    };

    console.log(data);
    clearOrb2MFormData();

    try {
        const response = await api.createorb2(data);
        hideRecordsLoader();
        showSuccessNotification(response.message);
    } catch (error) {
        showErrorNotification(error.message);
    }
    
}

async function fetchOrb2NFormData() {
    const form = document.getElementById('orb1-n-form');

    const data = {
        
        timeOfOccurrence: form.querySelector('#timeofoccurence')?.value,
        portAtTimeOfOccurrence: form.querySelector('#portattimeofoccurence')?.value,
        positionAtTimeOfOccurrence: form.querySelector('#positiontimeofoccurence')?.value.trim(),
        approximateQuantityM3:parseFloat( form.querySelector('#Approximate\\ quantity\\ in\\ m3')?.value),
        typeOfOil: form.querySelector('#typeOfOil')?.value,
        circumstancesOfDischarge:parseFloat( form.querySelector('#cde')?.value.trim()),
        reasons: form.querySelector('#reasons')?.value.trim(),
        generalRemarks: form.querySelector('#generalRemarks')?.value.trim()
    };
    
    // === Validation ===
    try {
        if (!data.timeOfOccurrence || typeof data.timeOfOccurrence !== 'string') {
            throw new Error("Time of occurrence is required.");
        }

        if (!data.portAtTimeOfOccurrence || data.portAtTimeOfOccurrence.trim() === "") {
            throw new Error("Port at time of occurrence is required.");
        }

        if (!data.positionAtTimeOfOccurrence || data.positionAtTimeOfOccurrence.length < 5) {
            throw new Error("Valid position at time of occurrence is required.");
        }

        const quantity = parseFloat(data.approximateQuantityM3);
        if (isNaN(quantity) || quantity < 0) {
            throw new Error("Approximate quantity (m3) must be a valid non-negative number.");
        }
        data.approximateQuantityM3 = quantity.toFixed(2);

        if (!data.typeOfOil || data.typeOfOil.trim() === "") {
            throw new Error("Type of oil is required.");
        }

        if (!data.circumstancesOfDischarge || data.circumstancesOfDischarge.length < 5) {
            throw new Error("Circumstances of discharge must be at least 5 characters.");
        }

        if (!data.reasons || data.reasons.length < 5) {
            throw new Error("Reasons for discharge must be at least 5 characters.");
        }

        if (!data.generalRemarks || data.generalRemarks.length < 5) {
            throw new Error("General remarks must be at least 5 characters.");
        }
        let datas = {
            operationType: 'N',
            formData:data
        };
        console.log(datas);

        clearOrb2NFormData();
            const response = await api.createorb2(datas);
            hideRecordsLoader();
            showSuccessNotification(response.message);
       

        

    } catch (err) {
        showErrorNotification(err.message);
    }
}

async function fetchOrb2OFormData() {
    const form = document.getElementById('orb1-o-form');
    
    if (!form) {
        console.error("Form not found!");
        return;
    }

    const additionalOperationalProcedures = form.querySelector('#additional-operational-procedures').value.trim();
    const generalRemarks = form.querySelector('#general-remarks').value.trim();

    // === Validations ===
    if (!additionalOperationalProcedures || additionalOperationalProcedures.length < 5) {
        alert("Additional operational procedures must be at least 5 characters long.");
        return;
    }

    if (!generalRemarks || generalRemarks.length < 5) {
        alert("General remarks must be at least 5 characters long.");
        return;
    }

    const data = {
        
        additionalOperationalProcedures,
        generalRemarks
    };

    let datas = {
        operationType: 'O',
        formData:data
    };
    console.log(datas);
    try{
        clearOrb2OFormData();
    const response = await api.createorb2(datas);
    hideRecordsLoader();
            
            showSuccessNotification(response.message);
    }
    catch(err)
    {
        
        showErrorNotification(err.message);
    }
    
}

async function fetchOrb2PFormData() {
    const form = document.getElementById('orb1-p-form');
    
    // Collect all tank names added dynamically
    const tanks = [];
    form.querySelectorAll('#tanks-discharged-LBW input[name="tank-identity"]').forEach(input => {
        if (input.value.trim() !== '') {
            tanks.push(input.value.trim());
        }
    });

    const data = {
        tanksLoaded: tanks,
        positionOfShip: form.querySelector('#positionOfShip').value.trim(),
        quantityOfBallast:parseFloat(form.querySelector('#quantityofballast').value.trim()),
        remarks: form.querySelector('#Remarks').value.trim()
    };

    // Validations
    let errors = [];

    if (tanks.length === 0) {
        errors.push("At least one tank identity is required.");
    }

    if (!data.positionOfShip || data.positionOfShip.length < 3) {
        errors.push("Position of the ship must be at least 3 characters long.");
    }

    const quantity = parseFloat(data.quantityOfBallast);
    if (isNaN(quantity) || quantity < 0) {
        errors.push("Quantity of ballast must be a valid non-negative number.");
    }

    if (!data.remarks || data.remarks.length < 3) {
        errors.push("Remarks must be at least 3 characters long.");
    }

    // If errors exist, show them and stop execution
    if (errors.length > 0) {
        alert("Validation Errors:\n" + errors.join("\n"));
        return;
    }

    let datas = {
        operationType:'P',
        formData:data
    };
    console.log(datas);
    clearOrb2PFormData();
    try{
        const response = await api.createorb2(datas);
                console.log(response.message);
                hideRecordsLoader();
                showSuccessNotification(response.message);
        }
        catch(err)
        {
            
            showErrorNotification(err.message);
        }
    
}

async function fetchOrb2QFormData() {
    const form = document.getElementById('orb1-q-form');

    const reasonInput = form.querySelector('#Reason\\ for\\ re-allocation');
    const reasonForReallocation = reasonInput ? reasonInput.value.trim() : "";

    // Validation
    if (!reasonForReallocation || reasonForReallocation.length < 3) {
        alert("Please enter a valid reason for re-allocation (at least 3 characters).");
        reasonInput.focus();
        return;
    }

    const data = {
        reasonForReallocation
    };
    let datas = {
        operationType : 'Q',
        formData:data
    };
    console.log(datas);
        try{
            clearOrb2QFormData();
        const response = await api.createorb2(datas);
        hideRecordsLoader();
                
                showSuccessNotification(response.message);
        }
        catch(err)
        {
            
            showErrorNotification(err.message);
        }
   
}

async function fetchOrb2RFormData() {
    const form = document.getElementById('orb1-r-form');

    const portOfDischargeInput = form.querySelector('#Port-where-ballast-water-was-discharged');
    const receptionFacilityInput = form.querySelector('#Name-or-Designation-to-reception-facility');
    const quantityInput = form.querySelector('#TQOBW');

    const portOfDischarge = portOfDischargeInput?.value.trim();
    const receptionFacility = receptionFacilityInput?.value.trim();
    const totalQuantityDischarged_m3 = quantityInput?.value.trim();

    // Validation
    if (!portOfDischarge || portOfDischarge.length < 3) {
        alert("Please enter a valid Port of Discharge (min 3 characters).");
        portOfDischargeInput.focus();
        return;
    }

    if (!receptionFacility || receptionFacility.length < 3) {
        alert("Please enter a valid Reception Facility name (min 3 characters).");
        receptionFacilityInput.focus();
        return;
    }

    if (!totalQuantityDischarged_m3 || isNaN(totalQuantityDischarged_m3) || Number(totalQuantityDischarged_m3) <= 0) {
        alert("Please enter a valid quantity discharged (a positive number).");
        quantityInput.focus();
        return;
    }

    const data = {
        
        portOfDischarge,
        receptionFacility,
        totalQuantityDischarged_m3: parseFloat(totalQuantityDischarged_m3)
    };
    let datas = {
        operationType : 'R',
        formData : data
    };
    console.log(datas);
        try{
            clearOrb2RFormData();
        const response = await api.createorb2(datas);
        hideRecordsLoader();
               
                showSuccessNotification(response.message);
        }
        catch(err)
        {
           
            showErrorNotification(err.message);
        }
    
}
                        
    function clearOrb2AFormData(){
        document.getElementById('orb1-a-form').reset();
    }
    function clearOrb2BFormData(){
        document.getElementById('orb1-b-form').reset();
    }
    function clearOrb2CFormData(){
        document.getElementById('orb1-c-form').reset();
    }
    function clearOrb2DFormData(){
        document.getElementById('orb1-d-form').reset();
    }
    function clearOrb2EFormData(){
        document.getElementById('orb1-e-form').reset();
    }
    function clearOrb2FFormData(){
        document.getElementById('orb1-f-form').reset();
    }
    function clearOrb2GFormData(){
        document.getElementById('orb1-g-form').reset();
    }
    function clearOrb2HFormData(){
        document.getElementById('orb1-h-form').reset();
    }
    function clearOrb2IFormData(){
        document.getElementById('orb1-i-form').reset();
    }
    function clearOrb2JFormData(){
        document.getElementById('orb1-j-form').reset();
    }
    function clearOrb2KFormData(){
        document.getElementById('orb1-k-form').reset();
    }
    function clearOrb2LFormData(){
        document.getElementById('orb1-l-form').reset();
    }
    function clearOrb2MFormData(){
        document.getElementById('orb1-m-form').reset();
    }
    function clearOrb2NFormData(){
        document.getElementById('orb1-n-form').reset();
    }
    function clearOrb2OFormData(){
        document.getElementById('orb1-o-form').reset();
    }
    function clearOrb2PFormData(){
        document.getElementById('orb1-p-form').reset();
    }
    function clearOrb2QFormData(){
        document.getElementById('orb1-q-form').reset();
    }
    function clearOrb2RFormData(){
        document.getElementById('orb1-r-form').reset();
    }
