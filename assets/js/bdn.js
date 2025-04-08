$(document).ready(async function () {
    $('#bunkerDeliveryForm').on('submit', async function (e) {
      e.preventDefault();
  
      const port = $('#port').val().trim();
      const deliveryDate = $('#deliveryDate').val().trim();
      const supplierName = $('#supplierName').val().trim();
      const supplierAddress = $('#supplierAddress').val().trim();
      const supplierTelephone = $('#supplierTelephone').val().trim();
      const productName = $('#productName').val().trim();
      const quantityStr = $('#quantity').val().trim();
      const densityStr = $('#density').val().trim();
      const sulfurContentStr = $('#sulfurContent').val().trim();
      const supplierDeclaration = $('#supplierDeclaration')[0].files[0];
  
      // Validation functions
      function isEmpty(value) {
        return value === '';
      }
  
      function isValidNumber(value, precision = 10, scale = 2) {
        const regex = new RegExp(`^\\d{1,${precision - scale}}(\\.\\d{1,${scale}})?$`);
        return regex.test(value);
      }
  
      // Required field checks
      if ([port, deliveryDate, supplierName, supplierAddress, supplierTelephone, productName].some(isEmpty)) {
        alert("Please fill in all required fields.");
        return;
      }

      if(!supplierDeclaration)
      {
        alert("Please fill in all required fields.");
        return;
      }
  
      // Number validations
      if (!isValidNumber(quantityStr)) {
        alert("Quantity must be a valid number with up to 10 digits and 2 decimal places.");
        return;
      }
  
      if (!isValidNumber(densityStr)) {
        alert("Density must be a valid number with up to 10 digits and 2 decimal places.");
        return;
      }
  
      if (!isValidNumber(sulfurContentStr)) {
        alert("Sulfur Content must be a valid number with up to 10 digits and 2 decimal places.");
        return;
      }
  
      const quantity = parseFloat(quantityStr);
      const density = parseFloat(densityStr);
      const sulfurContent = parseFloat(sulfurContentStr);
  
      let formData = new FormData();
      formData.append("port", port);
      formData.append("deliveryDate", deliveryDate);
      formData.append("supplierName", supplierName);
      formData.append("supplierAddress", supplierAddress);
      formData.append("supplierTelephone", supplierTelephone);
      formData.append("productName", productName);
      formData.append("quantity", quantity);
      formData.append("density", density);
      formData.append("sulfurContent", sulfurContent);
  
      if (supplierDeclaration) {
        formData.append("supplierDeclaration", supplierDeclaration);
      }
      clear();
      try {
        let response = await api.createbdnrecord(formData);
        console.log(response);
        alert(response.inserted.message);
        
      } catch (error) {
        console.error("Error:", error.response ? error.response.message : error.message);
        alert('Fail to create record');
      }
    });
  });
  
  function clear(){
    document.getElementById('bunkerDeliveryForm').reset();
  }
