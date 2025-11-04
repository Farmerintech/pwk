import { About } from "./AboutUs"
import { HeroSection } from "./Hero"
import {NavBar} from "./NavBar"
import { Team } from "./team"
import { Contact } from "./Contact"
import { Faq } from "./Faq"
import { Footer } from "./Footer"
import {ActivitiesSection} from "./Features"
import { Endorsements } from "../pricing"

export const Home = () => {
    return(
        <section className=" ">
            <div className="md:px-5 fixed md:top-5 left-0 w-full z-40">
            <NavBar/>
            </div>
        <HeroSection/>
        <ActivitiesSection/>
        <Endorsements/>
                <About/>
                <Team/>
                <Faq/>
                <Contact/>
                <Footer/>
        </section>
    )
}