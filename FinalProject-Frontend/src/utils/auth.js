import { getResponse } from "../utils/api";

//for later use in a fullstack environment :)

// export function signUp({ name, email, password }) {
//   return fetch(`${newsApiBaseUrl}/signup`, {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify({ name, email, password }),
//   }).then(getResponse);
// }

// export function signin({ email, password }) {
//   return fetch(`${baseUrl}/signin`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   }).then(getResponse);
// }

export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "JOE MAMA" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      userData: {
        firstName: "Himothy",
        lastName: "Jones",
        email: "himothy.jones@example.com",
        _id: "fake-id",
      },
    });
  });
};
