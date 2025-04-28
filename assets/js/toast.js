toastr.options = {
   
    
    "positionClass": "toast-top-right",
    "timeOut": "3000"
  };

  function showSuccessNotification(msg) {
    toastr.success(`${msg}`);
  }

  function showErrorNotification(msg) {
    toastr.error(`${msg}`);
  }

  function showWarningNotification(msg) {
    toastr.warning(`${msg}`);
  }

  function clearNotifications() {
    toastr.clear();
  }