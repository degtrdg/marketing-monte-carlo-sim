import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { UserProvider } from "./utils/user-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SalesSim",
  description: "SalesSim",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Providers>{children}</Providers>
        </UserProvider>
      </body>
    </html>
  );
}
