import api from "./axios";

export const getTeams = async () => {
  const response = await api.get("/equipos");
  return response.data;
};

export const getTeamById = async (id) => {
  const response = await api.get(`/equipos/${id}`);
  return response.data;
};

export const getTeamMembers = async (id) => {
  const response = await api.get(`/equipos/${id}/integrantes`);
  return response.data;
};

export const createTeam = async (team) => {
  const response = await api.post("/equipos/crear-con-miembros", team);
  return response.data;
};

export const updateTeam = async (id, team) => {
  const response = await api.put(`/equipos/${id}`, team);
  return response.data;
};

export const deleteTeam = async (id) => {
  const response = await api.delete(`/equipos/${id}`);
  return response.data;
};