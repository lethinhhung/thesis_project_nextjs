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

        // Ví dụ đơn giản (bạn có thể thay bằng gọi DB hoặc API backend)
        if (username === "admin" && password === "123456") {
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
          };
        }

        // Nếu thông tin sai, trả về null
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Gắn user info vào token nếu cần
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Truyền token vào session để frontend dùng
      if (token) {
        console.log(token);
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
