import axios from "axios";
import { toast } from "react-toastify";
// Create an Axios instance with a base URL
import { BASE_API_URL } from "./constant";
export const baseURL = BASE_API_URL;

if (!baseURL) {
  console.log(
    ">BaseURL error,please check your env file or visit api/ClientFunction.jsx file to see more details...,Thanks!..."
  );
}
const api = axios.create({
  baseURL: baseURL, // Add the protocol (http or https) before the hostname
});

const handleUserRequest = async (
  method,
  url,
  data = null,
  customHeaders = {}
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong!..."
    );
    return { success: false, err: error.message };
  }
};
const handleRequest = async (method, url, data = null, customHeaders = {}) => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get("token");
  const token = urlToken || localStorage.getItem("token");

  try {
    const response = await api({
      method,
      url,
      data,
      headers: {
        ...customHeaders,
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(response.message);
    return response.data;
  } catch (error) {
    if (error?.response?.data) {
      // if (
      //   error.response.data?.data?.jwt == "jwt expired" ||
      //   error.response.data?.data?.jwt == "invalid token"
      // ) {
      //   localStorage.removeItem("token");
      //   window.location.reload();
      //   <Navigate to="/login" replace={true} />;
      // }
      toast.error(error?.response.data?.message);
    }
    return {
      success: false,
      message: error?.response.data?.message || error.message,
    };
  }
};
export const fetchUserData = (url, customHeaders) =>
  handleUserRequest("get", url, null, customHeaders);
export const fetchData = (url) => handleRequest("get", url);
export const postData = (url, data) => handleRequest("post", url, data);
export const updateData = (url, data) => handleRequest("put", url, data);
export const deleteData = (url, data) => handleRequest("delete", url, data);
export const requestData = (method, url, data) => {
  return handleRequest(method, url, data);
};
export function generateTransactionId(phoneNumber) {
  phoneNumber = String(phoneNumber);
  const seed = Date.now();
  const combinedString = phoneNumber + seed;
  const hashCode = combinedString.split("").reduce((hash, char) => {
    const charCode = char.charCodeAt(0);
    return (hash << 5) - hash + charCode;
  }, 0);

  const positiveHashCode = Math.abs(hashCode) % 100000000;

  const transactionId = positiveHashCode.toString().padStart(8, "0");

  return transactionId;
}
export function formatTime(dateString) {
  const options = { hour: "numeric", minute: "numeric", hour12: true };

  const formattedTime = new Date(dateString).toLocaleTimeString([], options);

  return formattedTime;
}

export function generateRandomEmail() {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "example.com",
    "domain.com",
  ];
  const usernameLength = Math.floor(Math.random() * 10) + 5; // Random length between 5 and 14
  const username = Array.from({ length: usernameLength }, () =>
    getRandomChar()
  ).join("");
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${domain}`;
}

function getRandomChar() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

export function validateEmail(email) {
  const validTLDs = [
    ".cc",
    ".com",
    ".org",
    ".net",
    ".edu",
    ".gov",
    ".mil",
    ".co.uk",
    ".de",
    ".jp",
    ".fr",
    ".au",
    ".us",
    ".ru",
    ".ch",
    ".it",
    ".nl",
    ".se",
    ".no",
    ".es",
    ".ca",
    ".eu",
    ".nz",
    ".in",
    ".cn",
    ".br",
    ".za",
    ".ar",
    ".mx",
    ".asia",
    ".biz",
    ".info",
    ".mobi",
    ".name",
    ".online",
    ".pro",
    ".site",
    ".tech",
    ".website",
    ".xyz",
    ".club",
    ".email",
    ".store",
    ".shop",
    ".blog",
    ".io",
    ".me",
    ".app",
  ];

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (regex.test(email)) {
    // Extract the domain part and check if the TLD is in the list of valid TLDs
    const domain = email.substring(email.lastIndexOf("."));
    return validTLDs.includes(domain);
  }
  return false;
}
