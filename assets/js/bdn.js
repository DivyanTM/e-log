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
  
      function isEmpty(value) {
        return value === '';
      }
  
      function isValidNumber(value, precision = 10, scale = 2) {
        const regex = new RegExp(`^\\d{1,${precision - scale}}(\\.\\d{1,${scale}})?$`);
        return regex.test(value);
      }
  
      if ([port, deliveryDate, supplierName, supplierAddress, supplierTelephone, productName].some(isEmpty)) {
        showErrorNotification("Please fill in all required fields.");
        return;
      }

      if(!supplierDeclaration)
      {
        showErrorNotification("Upload the supplier declaration file");
        return;
      }
  
      if (!isValidNumber(quantityStr)) {
        showErrorNotification("Quantity must be a valid number with up to 10 digits and 2 decimal places.");
        return;
      }
  
      if (!isValidNumber(densityStr)) {
        showErrorNotification("Density must be a valid number with up to 10 digits and 2 decimal places.");
        return;
      }
  
      if (!isValidNumber(sulfurContentStr)) {
        showErrorNotification("Sulfur Content must be a valid number with up to 10 digits and 2 decimal places.");
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
       
        showSuccessNotification(response.inserted.message);
        
      } catch (error) {
     
        showErrorNotification(error.response ? error.response.message : error.message);
       
      }
    });
  });
  
  function clear(){
    document.getElementById('bunkerDeliveryForm').reset();
  }
  function showRecordsLoader() {
    
    document.getElementById("recordsLoader").style.display = "flex";
  }
  
  
  function hideRecordsLoader() {
    document.getElementById("recordsLoader").style.display = "none";
   

  }
  setTimeout(hideRecordsLoader,4000);



