import axios from "axios";

const axiosInstance = axios.create({
  // baseURL:
    // import.meta.env.VITE_BACKEND_URL ||
    // "http://127.0.0.1:5001/clone-6181a/us-central1/api",
  baseURL: "https://us-central1-clone-6181a.cloudfunctions.net/api"
});

export { axiosInstance };
