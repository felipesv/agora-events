export const constructHeader = () => {
  if (localStorage.getItem("nn")) {
    return {
      headers: {'x-auth-token': localStorage.getItem("token")}
    };
  };
  return {}   
};