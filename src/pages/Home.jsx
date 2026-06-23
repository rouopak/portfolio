import Hero from "../sections/hero"
import Showcase from "../sections/showcase"
import Experiences from "../sections/experiences"
import Skills from "../sections/skills"
import Contact from "../sections/contact"
import Navbar from "../components/navbar"
import Footer from "../sections/footer"

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Showcase />
      <Experiences />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
