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

      
      <img src="/myself.png" alt="Alfredo photo" className="profile-photo" />

      <div className="presentation">
        <h2>Hello, Im Alfredo</h2>

        <p className="intro">
            I'm a computer science engineer currently living in Dartmouth, Nova Scotia, and pursuing a master's degree in Computing and Data Analytics. I'm 24 years old, I grew up in my hometown, Guaddalajara,Jalisco, Mexico. I graduated two years ago,but I haven't worked in the field, I really enjoy learning, and even though I dont know a lot, I will be happy to keep learning throught this class.      
        </p>
        <section className="hobbies">
            <h3>My Hobbies</h3>

            <ul>
              <li>Riding my bike</li>
              <li>Watching movies</li>
              <li>Playing video games</li>
              <li>Going for walks</li>
              <li>Spending time with my girlfriend</li>
              <li>Cooking</li>
              <li>Going to the gym</li>
              <li>Swimming</li>
            </ul>
          </section>
      </div>
      </section>
  );
}

function MyTown(){
  return (
    <section className="town">
      <div className="town-info">
      <img src="/guadalajara.jpg" alt="Guadalajara Photo" className="city-photo" />
    <div className="town-description">
      <h2>
          Guadalajara
      </h2>
      <p>My Hometown is {TOWN.name}.</p>

      <p>{TOWN.name} is the city where I was born, and I spent my first 22 years living there. It is a beautiful city with amazing gastronomy and charming culture; the weather is normally warm and sunny.</p>
      <section className="activities">
        <h3>Things to Do in Guadalajara</h3>

        <ul>
          <li>
            Explore the historic center and visit Guadalajara Cathedral.
          </li>
          <li>
            Visit Museo Cabañas and admire the murals by José Clemente Orozco.
          </li>
          <li>
            Try traditional dishes such as tortas ahogadas and birria.
          </li>
          <li>
            Take a relaxing walk through Bosque Los Colomos.
          </li>
          <li>
            Discover the architecture of Teatro Degollado.
          </li>
          <li>
            Explore the cafés, restaurants, and galleries in Colonia Americana.
          </li>
        </ul>
</section>
    </div>
    </div>
    <Weather />
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
