import apiClient from "./apiClient";

export const getAllPosts = () => {
  return apiClient.get("/posts");
};

export const getPostById = (id) => {
  return apiClient.get(`/posts/${id}`);
};