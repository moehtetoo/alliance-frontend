import request from "./base"

export const fetchProjects = async(page) => {
    return await request.get(`${import.meta.env.VITE_HOST}projects?page=${page}`);
}

export const createProject = async (params) => {
    return await request.post(`${import.meta.env.VITE_HOST}projects`,params);
}

export const updateProject = async (id, params) => {
    return await request.put(`${import.meta.env.VITE_HOST}projects/${id}`, params);
}

export const deleteProject = async (id) => {
    return await request.delete(`${import.meta.env.VITE_HOST}projects/${id}`);
}