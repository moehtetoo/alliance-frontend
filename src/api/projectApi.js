import request from "./base"

export const fetchProjects = async() => {
    return await request.get(import.meta.env.VITE_HOST + 'projects');
}

export const createProject = async () => {
    return await request.post(import.meta.env.VITE_HOST + 'projects');
}

export const updateProject = async (id) => {
    return await request.put(import.meta.env.VITE_HOST + 'projects/'+id);
}

export const deleteProject = async (id) => {
    return await request.delete(import.meta.env.VITE_HOST + 'projects/'+id)
}