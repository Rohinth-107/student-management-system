import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // ✅ Django Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
