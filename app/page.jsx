import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import NewsEventSection from "@/components/home/NewsEventSection";
import AnnouncementSection from "@/components/home/AnnouncementSection";
import Footer from "@/components/home/Footer";


export default function Home() {
  return (
    <div className="h-full">
      <Header />
      <HeroSection heading={"Welcome to"} sub={"Colegio de Montalban"}/>
      <NewsEventSection />
      <AnnouncementSection />
      <Footer />
      
    </div>
  );
}
