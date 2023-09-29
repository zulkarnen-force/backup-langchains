import bcrypt from 'bcrypt';

const passwordUtils = {

   comparePasswords: function (password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  },

  hash: function (plainPassword: string): string {
    let salt = bcrypt.genSaltSync(10);
    let hashed = bcrypt.hashSync(plainPassword, salt)
    return hashed;
  }
  
}

export default passwordUtils;