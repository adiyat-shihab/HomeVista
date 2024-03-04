import Banners from "@/components/ui-components/Home/Banner/Banners";
import Brand from "@/components/ui-components/Home/Brand/Brand";
import WhoWeAre from "@/components/ui-components/Home/Who we are/WhoWeAre";
import OurService from "@/components/ui-components/Home/Our Service/OurService";
import NavbarSignOut from "@/Garbage/Nav/NavbarSignOut";

export default async function Home() {
  return (
    <>
      <div className="">
        <Banners />
        <Brand />
        <WhoWeAre />

      </div>
    </>
  );
}
