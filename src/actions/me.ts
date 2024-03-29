import api from "@/lib/api";
import { CourseListResponse, Me } from "@/lib/types";

export async function getMe() {
  try {
    const { data } = await api.get<Me>("/current_user/me");
    return data;
  } catch (error) {
    return null;
  }
}

export async function getCourses() {
  try {
    const { data } = await api.get<CourseListResponse>("/current_user/courses");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getCourse(id: string) {
  try {
    const { data } = await api.get(`/current_user/courses/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}
