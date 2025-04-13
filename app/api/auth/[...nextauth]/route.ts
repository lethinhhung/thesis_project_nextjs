import { loginAPI } from "@/lib/services/auth.service";
import { access } from "fs";
import NextAuth, { AuthOptions } from "next-auth";
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
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Đây là nơi bạn xác thực thông tin đăng nhập
        const { username, password } = credentials as Record<string, string>;
        try {
          // Gọi API để xác thực thông tin đăng nhập
          const response = await loginAPI(username, password);
          if (response) {
            if (response.status == 200) {
              return {
                id: response.data.data.id,
                name: response.data.data.username,
                email: response.data.data.email,
                accessToken: response.data.data.accessToken,
              };
            }
          }
        } catch (error) {
          console.log("error", error);
        }
        // Ví dụ đơn giản (bạn có thể thay bằng gọi DB hoặc API backend)

        // Nếu thông tin sai, trả về null
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Gắn user info vào token nếu cần
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Truyền token vào session để frontend dùng
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
