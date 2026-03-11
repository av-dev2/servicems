import { useToast as useVueToastification } from "vue-toastification";

export const useToast = () => {
  const toast = useVueToastification();

  const showToast = (message, type = "info", options = {}) => {
    const defaultOptions = {
      timeout: options.timeout || 5000,
      position: options.position || "bottom-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: true,
      ...options,
    };

    switch (type) {
      case "success":
        toast.success(message, defaultOptions);
        break;
      case "error":
        toast.error(message, {
          ...defaultOptions,
          timeout: options.timeout || 5000,
        });
        break;
      case "warning":
        toast.warning(message, defaultOptions);
        break;
      case "info":
        toast.info(message, defaultOptions);
        break;
      default:
        toast(message, defaultOptions);
    }
  };

  const showSuccess = (message, options = {}) => {
    showToast(message, "success", options);
  };

  const showError = (message, options = {}) => {
    showToast(message, "error", options);
  };

  const showWarning = (message, options = {}) => {
    showToast(message, "warning", options);
  };

  const showInfo = (message, options = {}) => {
    showToast(message, "info", options);
  };

  const clear = () => {
    toast.clear();
  };

  // Service Booking specific toast notifications
  const notifySuccess = {
    bookingCreated: () => showSuccess("Booking created successfully!"),
    bookingUpdated: () => showSuccess("Booking updated successfully!"),
    bookingCancelled: () => showSuccess("Booking cancelled successfully!"),
    customerCreated: () => showSuccess("Customer created successfully!"),
    vehicleCreated: () => showSuccess("Vehicle created successfully!"),
    dataRefreshed: () => showSuccess("Data refreshed successfully!"),
    generic: (message) => showSuccess(message),
  };

  const notifyError = {
    bookingCreateFailed: () => showError("Failed to create booking"),
    bookingUpdateFailed: () => showError("Failed to update booking"),
    dataLoadFailed: () => showError("Failed to load data"),
    validationFailed: () => showError("Please fix the form errors"),
    networkError: () => showError("Network error. Please check your connection"),
    serverError: () => showError("Server error. Please try again later"),
    generic: (message) => showError(message),
  };

  const notifyWarning = {
    unsavedChanges: () => showWarning("You have unsaved changes"),
    duplicateBooking: () => showWarning("A booking already exists at this time"),
    bayUnavailable: () => showWarning("This service bay is not available"),
    generic: (message) => showWarning(message),
  };

  const notifyInfo = {
    loadingData: () => showInfo("Loading bookings..."),
    savingData: () => showInfo("Saving booking..."),
    processingRequest: () => showInfo("Processing your request..."),
    generic: (message) => showInfo(message),
  };

  // Handle Frappe createResource errors
  const handleResourceError = (error) => {
    if (error.messages && Array.isArray(error.messages)) {
      showError(error.messages.join("\n"));
    } else if (error.message) {
      showError(error.message);
    } else {
      showError("An error occurred while processing your request.");
    }
  };

  // Handle API errors
  const handleApiError = (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;

      switch (status) {
        case 400:
          showError(`Bad Request: ${message}`);
          break;
        case 401:
          showError("Unauthorized. Please log in again.");
          break;
        case 403:
          showError("You do not have permission to perform this action.");
          break;
        case 404:
          showError("Resource not found.");
          break;
        case 500:
          showError("Server error. Please try again later.");
          break;
        default:
          showError(message || "An error occurred.");
      }
    } else if (error.request) {
      showError("Network error. Please check your connection");
    } else if (error.messages && Array.isArray(error.messages)) {
      showError(error.messages.join("\n"));
    } else if (error.message) {
      showError(error.message);
    } else {
      showError("An unexpected error occurred.");
    }
  };

  const notifications = {
    success: notifySuccess,
    error: notifyError,
    warning: notifyWarning,
    info: notifyInfo,
  };

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clear,
    toast,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
    handleResourceError,
    handleApiError,
    notifications,
  };
};
