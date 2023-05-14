import { baseAPIRequest } from "../utils/service";

export const getProxies = () => {
  return baseAPIRequest.get("proxy");
};

export const getProxyAnalytics = () => {
  return baseAPIRequest.get("proxy/analytics");
};

export const importProxies = (input: { file: string; isClean: boolean }) => {
  return baseAPIRequest.post("proxy/import_file", input, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
