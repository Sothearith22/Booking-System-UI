import { useState, useCallback } from 'react';

export const useAsync = (asyncFunction) => {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback((...args) => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction(...args)
      .then((response) => {
        setValue(response.data?.data || response.data || response);
        setStatus('success');
      })
      .catch((error) => {
        setError(error.response?.data?.message || error.message);
        setStatus('error');
      });
  }, [asyncFunction]);

  return { execute, status, value, error, loading: status === 'pending' };
};

export default useAsync;
