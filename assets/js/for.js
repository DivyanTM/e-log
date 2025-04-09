$(document).ready(function () {
    $('form').on('submit', async function (e) {
      e.preventDefault();

    
      const bunkerDeliveryNote = $('#bunkerDeliveryNote').val();
      const port = $('#port').val();
      const date = $('#date').val();
      const grade = $('#grade').val();
      const sulphur = $('#sulphur').val();
      const tank = $('#tank').val();
      const quantity = $('#quantity').val();



      const data = {
        bunkerDeliveryNoteReferenceNumber: bunkerDeliveryNote || null,
        portOfDelivery: port || null,
        date: date || null,
        grade: grade || null,
        sulphur: sulphur || null,
        tankNumber: tank || null,
        quantity: quantity || null
      };
      
      if (Object.values(data).every(value => value !== null && value !== '')) {
        try{
          const response=await axiosInstance.post('/for/create', data);
          console.log(response);
          alert(response.data.message);
        }catch(err){
          alert(err.response.data.message);
          console.log('error: ',err.response.data.message);
        }
      } else {
        alert('Please enter all the required fields');
      }
      
    });
  });