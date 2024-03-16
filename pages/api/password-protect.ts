// api/password-protect.ts
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie';
import { SignJWT } from 'jose';

export default async function handler(req: NextApiRequest, res:NextApiResponse){
    if(req.method !== "POST"){
        res.status(405).send("Method Not Allowed")
    }
    const password = req.body.password;
    if(process.env.PASSWORD_PROTECT === password){
        const secret = new TextEncoder().encode(
            'cc7e0d44fd473002f3c42167459001140et6389b7353f8088f4d9a95f2f596f2',
          )
          const alg = 'HS256'
          
          const jwt = await new SignJWT({ 'urn:example:claim': true })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('2h')
            .sign(secret)
          
        const cookie = serialize('jwt', jwt, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 2 // 2 hour
        })
        res.setHeader('Set-Cookie', cookie)
        res.redirect(302, '/')
    } else {
        const url = new URL("/password-protect", req.headers["origin"])
        url.searchParams.append("error", "Incorrect Password")
        res.redirect(url.toString())
    }
}