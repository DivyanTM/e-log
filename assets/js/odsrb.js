
$('form').on('submit', async function (e) {
  e.preventDefault(); 

  var formData = {};
  var operation = $('#odsrb-table').val();
  var isValid = true;
  var errorFields = [];

  $(this).find('input, select, textarea').each(function () {
      var name = $(this).attr('name') || $(this).attr('id'); 
      var value = $(this).val()?.trim(); 

      if (!value) {
          isValid = false;
          errorFields.push(name);
          
      } 

      formData[name] = value;
  });


  if (!isValid) {
      showErrorNotification("All fields are required");
      return;
  }

  const data = formData;

  
  try {
      clearAll();
      let response;
      if (operation === 'Equipments containing ODS') {
          response = await api.createodsRecords1(data);
          
      } else {
          response = await api.createodsRecords2(data);
      }
    
      showSuccessNotification(response.result.message);
      
  } catch (error) {
    
      showErrorNotification(error.message);
      
  }
});

function clearAll() {
  document.getElementById('odsrb-table-1')?.reset();
  document.getElementById('odsrb-table-2')?.reset();
  
}
function showRecordsLoader() {
    
    document.getElementById("recordsLoader").style.display = "flex";
  }
  
  
  function hideRecordsLoader() {
    document.getElementById("recordsLoader").style.display = "none";
   

  }
  setTimeout(hideRecordsLoader,4000);




