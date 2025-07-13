import { loginAPI } from "@/lib/services/auth.service";
import { getProfileAPI } from "@/lib/services/user.service";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const response = await loginAPI(
            credentials.username,
            credentials.password
          );

          if (response?.status === 200 && response.data.success) {
            return {
              id: response.data.data.id,
              name: response.data.data.username,
              email: response.data.data.email,
              image: response.data.data.avatar,
              accessToken: response.data.data.accessToken,
              role: response.data.data.role,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      const updatedUser = await getProfileAPI(token.accessToken as string);
      if (updatedUser?.status === 200 && updatedUser.data) {
        if (session.user) {
          session.user.image = updatedUser.data.data.profile.avatar;
          session.user.role = updatedUser.data.data.role;
        }
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
