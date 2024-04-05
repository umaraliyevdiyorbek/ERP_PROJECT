import $http from "@/api/interceptors";
import { IGroup } from "@/types/groups.types";

export const getGroups = async (payload: IGroup): Promise<IGroup[] | undefined> => {
    try {
        const response = await $http.get("/group/all");
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}
export const getGroup = async (id: number) => {
    try {
        const response = await $http.get(`/group/${id}`);
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}
export const deleteGroup = async (id: number) => {
    try {
        const response = await $http.delete(`/group/${id}`);
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}
export const createGroup = async (payload: FormData) => {
    try {
        const response = await $http.post("/group/create", payload);
      if(response.status === 201){
        return response.data
      }
    } catch (error) {
        console.log(error);
    }
}

export const updateGroup = async (id: number, payload: FormData) => {
    try {
        const response = await $http.put(`/group/${id}`, payload);
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}