import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const access_token = request.cookies.get("access_token")?.value || "";
  const refresh_token = request.cookies.get("refresh_token")?.value || "";

  const isPublicPath = path === "/admin/login";
  console.log("access token: ", access_token);
  let auth;
  if (access_token) {
    const fetchAuth = async () => {
      try {
        const res = await fetch(process.env.API_V1 + "/check-aut", {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: `access_token=${access_token}`,
          },
        });

        if (res.status === 200) {
          auth = true;
        }
        if (res.status === 401 || res.status === 400) {
          auth = false;
        }
        if (res.status === 404) {
          auth = false;
          throw new Error("Resource not found");
        }
        if (res.status === 500) {
          throw new Error("Something wen't wrong on server");
        }
      } catch (error) {
        console.log("Server Error: ", error);
      }
    };
    await fetchAuth();
  }

  if (!auth && !isPublicPath) {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }
  if (auth && isPublicPath) {
    return NextResponse.redirect(
      new URL("/admin/dashboard/home", request.nextUrl)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
