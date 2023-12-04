const host = 'https://wedev-api.sky.pro/api/v2/:olga-kuvichinskaya/comments';
const userUrl = 'https://wedev-api.sky.pro/api/user/login';

export let token;
export const setToken = (newToken) => {
  token = newToken;
}

export let userName;
export const setUserName = (newName) => {
  userName = newName;
}

export const getApi = () => {
  return fetch(host, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  }
    })
  .then((response) => {
    if (response.status === 500) {
        throw new Error("Неполадки с сервером");
    }
     // document.querySelector('.loading').style.display = "none";
     // document.querySelector('.add-form').style.display = "flex";
    return response.json();
  })
};

export const postApi = (textInputElement, nameInputElement) => {
  return  fetch(host, {
  method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      text: textInputElement.value
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;'),
      name: nameInputElement.value
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;'),
      forceError: true,
    }),
})
};

export function login({login, password}) {
  return  fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    })
  }) 
  .then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    } 
    return response.json();
  })
}