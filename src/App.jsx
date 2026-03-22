// App.jsx
import "./App.css";
import { supabase } from "./lib/supabase";

// Componentes
import Heather from "./Components/Heather/Heather";
import CardIntroduccion from "./Components/CardIntroduccion/CardIntroduccion";
import CardsCarrousel from "./Components/Carrousel/CardsCarrousel";
import TreasureCards from "./Components/TreasureCards/TreasureCards";
import Footer from "./Components/Footer/Footer";
import Constelacion from "./Components/Constelacion/Constelacion";
import Timeline from "./Components/Timeline/Timeline";

async function testConnection() {
  const { data, error } = await supabase.from("subscribers").select("*");
  console.log("DATA:", data);
  console.log("ERROR:", error);
}

testConnection();
function App() {
  return (
    <>
      <Heather />

      <main>
        <CardIntroduccion />

        <section>
          <Timeline />
        </section>

        <section>
          <CardsCarrousel loop showBullets />
        </section>
      </main>

      <TreasureCards />

      <section style={{ margin: "0", padding: "0" }}>
        <Constelacion
          density={85}
          color="#fff"
          linkColor="#b388ff"
          speed={0.35}
          height={320}
        />
      </section>

      <Footer />
    </>
  );
}

export default App;
