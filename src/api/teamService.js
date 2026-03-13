import api from "./axios";

export const getTeams = async () => {
  const response = await api.get("/equipos");
  return response.data;
};

export const createTeam = async (team) => {
  const response = await api.post("/equipos", team);
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