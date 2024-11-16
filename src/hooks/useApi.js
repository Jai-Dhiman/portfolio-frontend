import { useState, useEffect } from "react";
import { api } from "../services/api";

export const useApi = (endpoint, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api[endpoint]();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export const useSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = async (endpoint, data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await api[endpoint](data);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "An error occurred");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, success };
};
