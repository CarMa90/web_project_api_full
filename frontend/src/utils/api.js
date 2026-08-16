import { getToken } from "./token";

class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  getHeaders() {
    const token = getToken();

    return {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  getInitialCards() {
    // console.log(this.headers);
    return fetch(`${this.url}cards/`, { headers: this.getHeaders() }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      },
    );
  }

  getNewCard(data) {
    return fetch(`${this.url}cards/`, {
      headers: this.getHeaders(),
      body: JSON.stringify({ name: data.name, link: data.link }),
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  async handleCardLikes(card) {
    // console.log(card);
    const userInfo = await this.getUserInfo();

    if (card.likes.includes(userInfo.data._id)) {
      return fetch(`${this.url}cards/${card._id}/likes`, {
        method: "DELETE",
        headers: this.getHeaders(),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    } else if (!card.likes.includes(userInfo.data._id)) {
      return fetch(`${this.url}cards/${card._id}/likes`, {
        method: "PUT",
        headers: this.getHeaders(),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      });
    }
  }

  deleteCard(id) {
    return fetch(`${this.url}cards/${id}`, {
      headers: this.getHeaders(),
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this.url}users/me`, { headers: this.getHeaders() }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      },
    );
  }

  setUserInfo(data) {
    return fetch(`${this.url}users/me`, {
      headers: this.getHeaders(),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  changeProfilePicture(data) {
    return fetch(`${this.url}users/me/avatar`, {
      headers: this.getHeaders(),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const token = getToken();
// console.log(token);

export const api = new Api({
  url: "https://api.ils.heise.cl/",
  headers: {
    // Authorization: "288e77e1-cc55-482e-83a6-7664a6a338f5",
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  },
});
