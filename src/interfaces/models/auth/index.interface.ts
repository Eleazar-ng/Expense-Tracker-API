
export interface Email {
  email: string;
}

export interface UserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserId {
  userId: string;
}