export class UserModel {
  email: string = undefined!;
  password: string = undefined!;
  firstName?: string = undefined;
  lastName?: string = undefined;
  connected?: boolean = undefined;
  profilePic?: string = undefined;
  mobile?: number = undefined;
  favorites?: string[] = undefined;
}

export interface IUser extends UserModel { };

export const User: IUser = new UserModel();