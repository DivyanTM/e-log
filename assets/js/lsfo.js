document.getElementById('fuelChangeoverForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    // Function to format datetime with :00Z if needed
    function formatDateTime(inputValue) {
        if (!inputValue) return inputValue;
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/i.test(inputValue)) {
            return inputValue + ':00Z';
        }
    }

    // Get form values with datetime formatting
    const data = {
        begin_LSFO_datetime: formatDateTime(formData.get('begin_LSFO_datetime')),
        begin_LSFO_latitude: parseFloat(formData.get('begin_LSFO_latitude')),
        begin_LSFO_longitude: parseFloat(formData.get('begin_LSFO_longitude')),
        complete_LSFO_datetime: formatDateTime(formData.get('complete_LSFO_datetime')),
        complete_LSFO_latitude: parseFloat(formData.get('complete_LSFO_latitude')),
        complete_LSFO_longitude: parseFloat(formData.get('complete_LSFO_longitude')),
        lsfo_volume_completion: parseFloat(formData.get('lsfo_volume_completion')),
        regulated_entry_datetime: formatDateTime(formData.get('regulated_entry_datetime')),
        regulated_entry_latitude: parseFloat(formData.get('regulated_entry_latitude')),
        regulated_entry_longitude: parseFloat(formData.get('regulated_entry_longitude')),
        regulated_exit_datetime: formatDateTime(formData.get('regulated_exit_datetime')),
        regulated_exit_latitude: parseFloat(formData.get('regulated_exit_latitude')),
        regulated_exit_longitude: parseFloat(formData.get('regulated_exit_longitude')),
        begin_HSFO_datetime: formatDateTime(formData.get('begin_HSFO_datetime')),
        begin_HSFO_latitude: parseFloat(formData.get('begin_HSFO_latitude')),
        begin_HSFO_longitude: parseFloat(formData.get('begin_HSFO_longitude')),
        complete_HSFO_datetime: formatDateTime(formData.get('complete_HSFO_datetime')),
        complete_HSFO_latitude: parseFloat(formData.get('complete_HSFO_latitude')),
        complete_HSFO_longitude: parseFloat(formData.get('complete_HSFO_longitude')),
        lsfo_volume_start: parseFloat(formData.get('lsfo_volume_start'))
    };

    // Log the formatted data before sending
    console.log('Formatted submission data:', data);

    try {
        let response = await api.createlsfoRecord(data);
        console.log('API Response:', response);
        showSuccessNotification(response.message); // Uncomment if you want user feedback
        form.reset(); // Reset the form after successful submission
    } catch (error) {
        console.error('Submission Error:', error);
        showErrorNotification(error.response?.data?.message || 'An error occurred during submission');
    }
});