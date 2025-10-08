import Cookies from "js-cookie";

export function GetToken() {
  try {
    const token = Cookies.get("JwtToken");

    if (!token) {
      return null;
    }

    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}
