
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export class Helper {
  static hashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }
}