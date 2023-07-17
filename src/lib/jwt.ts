import jwt, { JwtPayload } from "jsonwebtoken"
import { jwtVerify } from "jose"

interface SignOption {
  expiresIn?: string | number
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
}

const secretKey = process.env.JWT_TOKEN!

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
): string {
  const token = jwt.sign(payload, secretKey, options)
  return token
}

// export function verifyJwt(token: string) {
//   try {
//     const secret_key = process.env.JWT_TOKEN
//     const decoded = jwt.verify(token, secret_key!)
//     return decoded as JwtPayload
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

export async function verifyJwt(token: string) {
  const secretKey = process.env.JWT_TOKEN!
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(secretKey))
    return verified.payload
  } catch (error) {
    throw new Error("Your token is expired")
  }
}
