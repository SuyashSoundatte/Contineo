import poolPromise from "../config/dbConnect.js";

export const executeQuery = async (query, params) => {
  const pool = await poolPromise;
  const request = pool.request();
  if (params) {
    params.forEach((param) => request.input(param.name, param.value));
  }
  return request.query(query);
};