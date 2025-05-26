import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api", // Adjust this to match your backend URL
});

export interface Tutorial {
  id: number;
  title: string;
  description: string;
  content: string;
  difficulty: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export const tutorialApi = {
  getAllTutorials: async () => {
    const response = await api.get("/tutorials");
    return response.data;
  },

  getTutorialById: async (id: number) => {
    const response = await api.get(`/tutorials/${id}`);
    return response.data;
  },

  createTutorial: async (tutorial: Partial<Tutorial>) => {
    const response = await api.post("/tutorials", tutorial);
    return response.data;
  },

  updateTutorial: async (id: number, tutorial: Partial<Tutorial>) => {
    const response = await api.put(`/tutorials/${id}`, tutorial);
    return response.data;
  },

  deleteTutorial: async (id: number) => {
    const response = await api.delete(`/tutorials/${id}`);
    return response.data;
  },
};