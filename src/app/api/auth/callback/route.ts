import { TeachableTokenResponse } from "@/lib/types";
import axios from "axios";
import { cookies, headers } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const host = headers().get("host");

  try {
    // Exchange the authorization code for an access token and refresh token
    const response = await axios.post<TeachableTokenResponse>(
      "https://developers.teachable.com/v1/current_user/oauth2/token",
      {
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: `http://${host}/api/auth/callback`,
        code,
      }
    );

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = response.data;

    // Store the access token and refresh token in secure cookies
    cookies().set({
      name: "access_token",
      value: accessToken,
      path: "/",
      httpOnly: true,
      maxAge: parseInt(expiresIn),
    });

    cookies().set({
      name: "refresh_token",
      value: refreshToken,
      path: "/",
      httpOnly: true,
    });

    // Redirect the user to the desired page
    // return Response.json("OK");

    // redirect to page that user was trying to access
    return Response.redirect(`http://${host}/`);
  } catch (error: any) {
    return Response.json(
      { error: error.response.data },
      { status: error.response.status }
    );
  }
}
