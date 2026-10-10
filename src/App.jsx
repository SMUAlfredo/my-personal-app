import { useEffect,useState } from "react";
import Weather from "./Weather.jsx"
import"./App.css"


const TOWN = {
  name: "Guadalajara, Jalisco, México",
  latitude: 20.6597,
  longitude: -103.3496,
};

function AboutMe(){
  return(
    <section className="myself">

      <h2>Hello, Im Alfredo</h2>
      <img src="/myself.png" alt="Alfredo photo" className="profile-photo" />
      
      <p className="intro">
          I'm a computer science engineer currently living in Dartmouth, Nova Scotia, and pursuing a master's degree in Computing and Data Analytics.      
      </p>


      </section>
  );
}

function MyTown(){
  return (
    <section className="town">
      <h2>
        Guadalajara
      </h2>
      <img src="/guadalajara.jpg" alt="Guadalajara Photo" className="city-photo" />


    <p>My Hometown is {TOWN.name}.</p>

    <p>{TOWN.name} is the city where I was born, and I spent my first 22 years living there. It is a beautiful city with amazing gastronomy and charming culture; the weather is normally warm and sunny.</p>

    <Weather
        latitude={20.6597}
        longitude={-103.3496}
      />

  </section>
  );
}

export default function App() {
  const [page, setPage] = useState("about");

  return (
    <div className="App">
      <header>
        
        <nav aria-label="Main navigation">
          <button 
          type="button"
          className={page === "about" ? "active" : ""}
          aria-pressed={page === "about"}
          onClick={() => setPage("about")}>About Me</button>

          <button
          type="button"
          className={page === "town" ? "active" : ""}
          aria-pressed={page === "town"}
          onClick={() => setPage("town")}>My Town</button>

        </nav>


      </header>
      
      <main>
        {page === "about" ? <AboutMe /> : <MyTown />}
      </main>
    </div>
  );

}
