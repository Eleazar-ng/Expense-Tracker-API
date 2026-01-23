import { ConflictError } from "../errors";
import { SignupRequest } from "../interfaces/requests";
import { User } from "../repositories";
import { Helper } from "../utils/helper";

export class AuthService {
  static signup = async (data:SignupRequest) => {
    try {
      const existingUser = await User.findUnique({email: data.email.toLowerCase()});
      if(existingUser){
        throw new ConflictError('Email is already in use by another user');
      }

      const hashedPassword = await Helper.hashPassword(data.password);

      const updatedData = { ...data, 
        email: data.email.toLowerCase(), 
        password: hashedPassword
      }

      const user =  await User.create(updatedData);

      return user;
    } catch (error) {
      throw error
    }
  }
}