import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/context/authContext/AuthProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/components/ui-components/Nav/Navbar";
import Footer from "@/components/ui-components/Footer/Footer";

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
