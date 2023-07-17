import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { verifyJwt } from "@/lib/jwt"

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname === "/admin-dashboard" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!")
    }
  },
  {
    callbacks: {
      authorized: async params => {
        let { token: user } = params

        const verified = await verifyJwt(user?.accessToken)

        return verified ? true : false
      },
    },
  }
)
export const config = {
  matcher: ["/admin", "/dashboard"],
}
