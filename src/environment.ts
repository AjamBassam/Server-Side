const vehicle = "vehicle";

export const env = {
  // configurations
  CLIENT_URL: "http://localhost:4200",
  IP_URL: "http://127.0.0.1:4200",
  PORT: 3000,
  MONGO_URI: "mongodb+srv://Baajaa:c75Vw6LQ6WBLQsbo@cluster0.xxex5.mongodb.net/dataBaseName?retryWrites=true&w=majority",
  DATABASE_NAME: "dataBaseName",
  collection_users: "users",
  collection_vehicles: "vehicles",

  //SESSION
  SESSION_NAME: "sid",
  SESSION_SECRET: "secretSession",
  MAX_AGE: 1000 * 60 * 60,// 1 hour

  // routes
  LIST_YOUR_VEHICLE: `/list-your-${vehicle}-for-rent`,
  VEHICLE_RENTALS: `/${vehicle}-rentals`,
  VEHICLE: `/${vehicle}`,
  FAVORITES: "/favorites",

  // parameters
  ID: "id",
  CITY: "city",
  LAT: "latitude",
  LNG: "longitude",
  START_DATE: "startDate",
  END_DATE: "endDate",
};
