export interface Me {
  name: string;
  email: string;
  role: string;
}

export interface User extends Omit<Me, "role"> {
  id: number;
}

export interface Course {
  id: number;
  description: any;
  name: string;
  heading: string;
  is_published: boolean;
  image_url: string | null;
}

export interface Meta {
  total: number;
  page: number;
  from: number;
  to: number;
  per_page: number;
  number_of_pages: number;
}

export interface CourseDetail extends Course {
  lecture_sections: LectureSection[];
  author_bio: AuthorBio;
}

export interface LectureSection {
  id: number;
  name: string;
  is_published: boolean;
  position: number;
  lectures: Lecture[];
}

export interface Lecture {
  id: number;
  position: number;
  is_published: boolean;
}

export interface AuthorBio {
  profile_image_url: string | null;
  bio: string | null;
  name: string;
  user_id: number;
}

export interface PricingPlan {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  price: number;
  currency: string;
  course_id: number;
  free_trial_length: number | null;
}

export interface TeachableTokenResponse {
  refresh_token: string;
  token_type: string;
  access_token: string;
  expires_in: string;
}

export interface PricingPlanResponse {
  pricing_plans: PricingPlan[];
  meta: Meta;
}

export interface CourseListResponse {
  courses: Course[];
  meta: Meta;
}

export interface CourseDetailResponse {
  course: CourseDetail;
}

export interface UsersResponse {
  users: User[];
  meta: Meta;
}
