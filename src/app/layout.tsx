import "instantsearch.css/themes/satellite.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Algolia's InstantSearch infinite hits with persistent scroll position",
  description:
    "Demo of Algolia's InstantSearch using <InfiniteHits/> with scroll persistence",
};

type RootLayoutProps = React.PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
