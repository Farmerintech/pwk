import { About } from "./AboutUs"
import { HeroSection } from "./Hero"
import {NavBar} from "./NavBar"
import { PWKGalleries } from "./gallery"
import { Contact } from "./Contact"
import { Faq } from "./Faq"
import { Footer } from "./Footer"
import {ActivitiesSection} from "./Features"
import { Endorsements } from "./endorsements"

export const Home = () => {
    return(
        <section className=" ">
            <div className="md:px-5 lg:px-10  fixed md:top-5 left-0 w-full z-40 backdrop-blur-md">
               <NavBar/>
            </div>
            <HeroSection/>
            <ActivitiesSection/>
            <Endorsements/>
            <About/>
            <PWKGalleries/>
            <Faq/>
            <Contact/>
            <Footer/>
        </section>
    )
}