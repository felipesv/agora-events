import { number } from "prop-types";

export const constructHeader = () => {
  if (localStorage.getItem("token")) {
    return {
      headers: {'x-auth-token': localStorage.getItem("token")}
    };
  };
  return {}   
};

export const userFormat = (newUser) => {
  return {
    username: newUser.username,
    lastName: newUser.lastName,
    firstName: newUser.firstName,
    email: newUser.email
  }
};