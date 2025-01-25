export const createResponse = ({ 
    status = 200,
    success = true,
    data = {}, 
    message = "Ok",
    error = "", 
  } = {}) => {
    return {
      status,
      success,
      data,
      message,
      error,
    };
  };