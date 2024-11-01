import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const api = {
  getAbout: () => axios.get(`${BASE_URL}/about`),
  getExperience: () => axios.get(`${BASE_URL}/experience`),
  getSkills: () => axios.get(`${BASE_URL}/skills`),
  getProjects: () => axios.get(`${BASE_URL}/projects`),
  getProjectDetail: (id) => axios.get(`${BASE_URL}/projects/${id}`),
  submitContact: (data) => axios.post(`${BASE_URL}/contact`, data),
};
