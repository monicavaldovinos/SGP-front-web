import api from "./axios";

export const getProjects = async () => {
  const response = await api.get("/proyectos");
  return response.data;
};

export const createProject = async (project) => {
  const response = await api.post("/proyectos", project);
  return response.data;
};

export const updateProject = async (id, project) => {
  const response = await api.put(`/proyectos/${id}`, project);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/proyectos/${id}`);
  return response.data;
};