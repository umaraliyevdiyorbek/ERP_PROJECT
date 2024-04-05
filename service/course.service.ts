import $http from "@/api/interceptors";
import { ICourse } from "@/types/course.types";

export const getCourses = async (payload: ICourse): Promise<ICourse[] | undefined> => {
    try {
        const response = await $http.get("/course/all");
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}
export const getCourse = async (id: number) => {
    try {
        const response = await $http.get(`/course/${id}`);
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}
export const deleteCourse = async (id: number) => {
    try {
        const response = await $http.delete(`/course/${id}`);
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}
export const createCourse = async (payload: FormData) => {
    try {
        const response = await $http.post("/course/create", payload);
      if(response.status === 201){
        return response.data
      }
    } catch (error) {
        console.log(error);
    }
}

export const updateCourse = async (id: number, payload: FormData) => {
    try {
        const response = await $http.put(`/course/${id}`, payload);
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}