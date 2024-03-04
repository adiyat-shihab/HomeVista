import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/context/authContext/AuthProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AdminNavBar from "@/components/admin-components/AdminNavBar/AdminNavBar";
import Navbar from "@/components/ui-components/Nav/Navbar";
import AdminTopNavBar from "@/components/admin-components/AdminTopNavBar/AdminTopNavBar";
import ProtectAdmin from "@/components/admin-components/ProtectAdmin/ProtectAdmin";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <AntdRegistry>
            <AdminTopNavBar />
            <div className="overflow-hidden flex gap-4">
              <div className="md:w-3/12 hidden md:flex min-h-[89vh]  justify-start   bg-gray-200">
                <AdminNavBar />
              </div>
              <ProtectAdmin>
                <div className="w-full md:w-9/12">{children}</div>
              </ProtectAdmin>
            </div>
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
