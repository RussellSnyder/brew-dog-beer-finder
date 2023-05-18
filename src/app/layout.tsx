import { api } from "./api";
import { quickSandFont } from "./fonts";
import "./globals.css";
import { Footer } from "./ui/footer";
import { HeaderNavigation } from "./ui/headerNavigation";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Preload data
  await api.preloadData();

  return (
    <html lang="en">
      <body className={quickSandFont.className}>
        <main className="max-w-screen-lg m-auto">
          <HeaderNavigation />
          <div className="p-8">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
