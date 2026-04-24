import Footer from "../_components/Footer";
import LoadingGate from "../_components/LoadingGate";
import Navbar from "../_components/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingGate />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
