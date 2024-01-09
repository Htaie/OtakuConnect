import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  login: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
});

const User = model('User', UserSchema);

export default User;
