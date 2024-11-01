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

// Example usage in components:
/*
const ProjectList = () => {
  const { data: projects, loading, error } = useApi('getProjects');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
*/

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

// Example usage for forms:
/*
const ContactForm = () => {
  const { submit, loading, error, success } = useSubmit();

  const handleSubmit = async (formData) => {
    await submit('submitContact', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <div>Submitting...</div>}
      {error && <div>Error: {error}</div>}
      {success && <div>Message sent successfully!</div>}
      // form fields here
    </form>
  );
};
*/
