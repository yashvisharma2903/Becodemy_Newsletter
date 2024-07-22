import React from "react";
import Header from "@/shared/widgets/header/header";
import Banner from "./elements/banner";
import Branding from "@/modules/home/elements/branding";
import FeatureHighlight from "@/modules/home/elements/feature.highlight";
import Footer from "@/shared/widgets/footer/footer";
import Pricing from "./elements/pricing";
import Benefits from "./elements/benefits";



const Home = () =>{
    return(
        <div>
            <Header />
            <Banner />
            <Branding />
            <Benefits />
            <FeatureHighlight />
            <Pricing />
            <Footer />
        </div>
    )
}

export default Home;