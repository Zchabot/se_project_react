const baseUrl = "http://localhost:3001";

export const processResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export function request(url, options) {
  return fetch(url, options).then(processResponse);
}

function updateUserInfo(data, token) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function getUserInfo(token) {
  return request(`${baseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

function addItem(item, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

function addCardLike(cardId, token) {
  return request(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}
function removeCardLike(cardId, token) {
  return request(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function deleteItem(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export {
  getItems,
  addItem,
  deleteItem,
  getUserInfo,
  updateUserInfo,
  addCardLike,
  removeCardLike,
};
