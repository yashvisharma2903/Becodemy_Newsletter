"use server";

import axios from "axios";
import jwt from "jsonwebtoken";

export const generateApiKey = async (email: string) => {
  try {
    const response = await axios.get(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users-by-email?email=${email}`, {
      headers: {
        authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`
      }
    })
    const token = jwt.sign(response.data[0], process.env.JWT_SECRET_KEY!);
    return token;
  } catch (error) {
    console.log(error)
    return ""
  }
};

// export const regenerateApiKey = async () => {
//   const user = await currentUser();
//   const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY!);
//   return token;
// };
