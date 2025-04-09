
document.addEventListener("DOMContentLoaded", function () {
    const toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);

    function showToast(type, message) {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("hide");
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // Expose functions globally
    window.showSuccess = (msg) => showToast("success", msg);
    window.showError = (msg) => showToast("error", msg);
    window.showWarning = (msg) => showToast("warning", msg);
    window.showInfo = (msg) => showToast("info", msg);
});
