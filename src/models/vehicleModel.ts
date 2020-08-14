export class VehicleModel {
  _id?: string = undefined;
  location: ILocation = undefined!;
  date: string = undefined!;
  price: number = undefined!;
  ownerId?: string = undefined;
}

export class ILocation {
  city?: string = undefined;
  latitude: number = undefined!;
  longitude: number = undefined!;
}

export interface IVehicle extends VehicleModel { };

export const Vehicle: IVehicle = new VehicleModel();