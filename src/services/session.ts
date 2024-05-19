async function getShareSession(secret) {
  return await fetch("https://api.cc-visual.dev/api/share/" + secret, {
    method: "GET", // Метод запроса
    headers: {
      "Content-Type": "application/json", // Заголовок, указывающий тип передаваемых данных
    },
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Not found");
      }

      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

async function shareSession(json) {
  return await fetch("https://api.cc-visual.dev/api/share", {
    method: "POST", // Метод запроса
    body: JSON.stringify({
      json: json,
    }),
    headers: {
      "Content-Type": "application/json", // Заголовок, указывающий тип передаваемых данных
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

async function generateSession() {
  return await fetch("https://api.cc-visual.dev/api/session/generate", {
    method: "POST", // Метод запроса
    headers: {
      "Content-Type": "application/json", // Заголовок, указывающий тип передаваемых данных
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

export default {
  generateSession,
  shareSession,
  getShareSession,
};