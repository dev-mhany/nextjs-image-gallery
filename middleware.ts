import { NextRequest, NextResponse } from "next/server";
import {jwtVerify} from "jose"
export async function middleware(req: NextRequest){
  
  let isLoggedIn = false
    if(req.cookies.has("jwt")){
      try{
        const secret = new TextEncoder().encode(
          'cc7e0d44fd473002f3c42167459001140et6389b7353f8088f4d9a95f2f596f2',
        )
        const jwt = req.cookies.get("jwt").value
        
        await jwtVerify(jwt, secret, {
          issuer: 'urn:example:issuer',
          audience: 'urn:example:audience',
        })
        isLoggedIn = true
      }catch{
      }
    }
    const isPathPasswordProtect = req.nextUrl.pathname.startsWith("/password-protect")
    if(!isLoggedIn && !isPathPasswordProtect){
        return NextResponse.redirect(new URL("/password-protect", req.url))
    }
    return NextResponse.next()
}
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|favicon.ico|og-image.png|under-development.svg).*)',
    ],
  }