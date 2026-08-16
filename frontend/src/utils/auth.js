export const BASE_URL = "https://api.ils.heise.cl/";

export const register = (password, email) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    }

    const error = await res.json();
    return Promise.reject(error);
  });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    }

    const error = await res.json();
    return Promise.reject(error);
  });
};

export const tokenValidation = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    }

    const error = await res.json();
    return Promise.reject(error);
  });
};
