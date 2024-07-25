import { URL } from "../helpers/constants.js";

// Cookie section

export const getCookies = () => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.includes("token=")
      ? document.cookie
      : "token=;id=;";
    return ["token", "id"].map((x) => cookies.split(x + "=")[1].split(";")[0]);
  }
};
export const setCookies = (obj) => {
  if (typeof obj !== "object" || !obj.token || !obj.user_id) {
    throw new Error("Cannot set cookies, Invalid object in HTTP response");
  }
  const { token, user_id } = obj;
  if (typeof token !== "string" || typeof user_id !== "number") {
    throw new Error("Cannot set cookies, Invalid type of token or user_id");
  }
  const after_X_hours = (num) =>
    new Date(Date.now() + num * 1000 * 3600).toUTCString();

  document.cookie = `id=${user_id}; expires=${after_X_hours(8)}`;
  document.cookie = `token=${token}; expires=${after_X_hours(8)}`;
};
export const eraseCookies = () => {
  ["token", "id"].map(
    (x) => (document.cookie = `${x}=; expires=Thu, 01 Jan 1970 00:00:01 GMT`),
  );
};

// HTTP Request section

export const getURL = (endpoint, order, query) => {
  // Construct URL with query paramethers (order == "id" by default)
  const nonDefaultOrder = order && order !== "id";
  let URL = endpoint + (query || nonDefaultOrder ? "?" : "");

  if (query) {
    URL += `_search=${encodeURIComponent(query)}`;
  }
  if (query && nonDefaultOrder) {
    URL += "&";
  }
  if (nonDefaultOrder) {
    URL += `o=${order}`;
  }
  return URL;
};

export const handleC_UDrequest = async (formType, method, id, formData) => {
  const rules = [
    ["POST", "PUT", "DELETE"].includes(method),
    ["author", "book"].includes(formType),
    typeof +id === "number",
    !formData || typeof formData == "object",
  ];
  const failedTests = rules.map((x, i) => (!x ? i + 1 : 0)).filter((x) => x);

  if (rules.includes(false)) {
    alert("Sorry, submit failed");
    throw new Error(
      `Invalid handleCUDsubmit arguments: rules[${failedTests.join(", ")}]`,
    );
  }

  const token = document.cookie.split("token=")[1].split(";")[0];
  if (!token) {
    throw new Error(`Token not found while performing ${method} request`);
  }

  const url = `${URL}/api/${formType}s${id ? "/" + id : ""}/`;

  let body = {};
  if (formData instanceof FormData) {
    formData.forEach((value, key) => (body[key] = value));
  } else {
    body = formData;
  }
  const { data, error } = await performCRUD(token, url, method, body);
  if (error) {
    return { data, error, info: "An attempt failed. " + error.message };
  }
  return { data, error, info: "Data on the server has been changed!" };
};

async function performCRUD(token, url, method, body) {
  let [data, error] = [{}, null];
  let res = { status: "Error" };

  try {
    if (typeof (token + url + method) !== "string") {
      throw new Error("Request was not sent. Invalid arguments");
    }
    res = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        Authorization: `Token ${token}`,
        "Content-type": "application/json",
      },
    });
    if (method !== "DELETE") {
      data = await res.json();
    }

    if (!res.ok) {
      throw new Error("Response not Ok.");
    }
  } catch (err) {
    error = {
      ...err,
      message: res.status + ": " + (data.detail ?? err.message),
    };
  }

  return { data, error };
}
