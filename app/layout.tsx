import Sidebar from "../components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 bg-zinc-900 text-white p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}