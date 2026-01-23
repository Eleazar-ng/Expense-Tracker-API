import { ConflictError, UnauthorizedError } from "../errors";
import { LoginRequest, SignupRequest } from "../interfaces/requests";
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

  static login = async (data:LoginRequest) => {
    try {
      const user = await User.findUnique({email: data.email.toLowerCase()});
      if(!user){
        throw new UnauthorizedError('Invalid email or password');
      }

      const isValidPassword = await Helper.comparePassword(data.password, user.password);
      if(!isValidPassword){
        throw new UnauthorizedError('Invalid email or password');
      }

      const token = Helper.generateToken({userId: user.id});

      //send only relevent data
      const resData = {
        user:{
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        token
      }

      return resData;
    } catch (error) {
      throw error
    }
  }
}