import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext/AuthProvider";
import Navbar from "@/components/Nav/Navbar";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/components/Footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <AntdRegistry>
            <Navbar />
            {children}
            <Footer />
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
