import { authMiddleware } from "@clerk/nextjs";

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

export default authMiddleware({
  publicRoutes: [
    "/api/(.*)",
    "/(api|trpc)(.*)",
    "/sign-in/[[...index]]",
    "/sign-up/[[...index]]",
  ],
  // ignoredRoutes: ["/"],
  // TODO: Remove before moving to production
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/"],
  // debug: false,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
