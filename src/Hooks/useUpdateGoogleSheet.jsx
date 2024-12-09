import { useState } from 'react';
import axios from 'axios';

const useUpdateGoogleSheet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const updateGoogleSheet = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await axios.post('https://aam-api-apppilot.com/update_google_sheet', {
        data,
      });
      setResponse(result.data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return { updateGoogleSheet, isLoading, error, response };
};

export default useUpdateGoogleSheet;
