import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("TOKEN", req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.url.split("/").pop() === "admin") {
          return token?.userRole === "ADMIN";
        }

        if (token) return true;

        return false;
      },
    },
  }
);

export const config = { matcher: ["/", "/admin", "/cu"] };
