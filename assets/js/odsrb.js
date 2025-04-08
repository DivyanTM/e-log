// Handle form submission
$('form').on('submit', async function (e) {
  e.preventDefault(); 

  var formData = {};
  var operation = $('#odsrb-table').val();
  var isValid = true;
  var errorFields = [];

  // Fetch values from all input, select, and textarea fields inside the submitted form
  $(this).find('input, select, textarea').each(function () {
      var name = $(this).attr('name') || $(this).attr('id'); // Prefer 'name', fallback to 'id'
      var value = $(this).val()?.trim(); // Trim to avoid whitespace-only values

      // Required field validation
      if (!value) {
          isValid = false;
          errorFields.push(name);
          
      } 

      formData[name] = value;
  });

  // Show error if validation fails
  if (!isValid) {
      alert(`Please fill in the required fields: ${errorFields.join(', ')}`);
      return;
  }

  const data = formData;

  // API request and response handling
  try {
      clearAll();
      let response;
      if (operation === 'Equipments containing ODS') {
          response = await api.createodsRecords1(data);
          
      } else {
          response = await api.createodsRecords2(data);
      }
      
      alert(response.result.message);
      
  } catch (error) {
      console.log("Error:", error.message);
      alert("An error occurred while submitting the form.");
  }
});

function clearAll() {
  document.getElementById('odsrb-table-1')?.reset();
  document.getElementById('odsrb-table-2')?.reset();
  
}
