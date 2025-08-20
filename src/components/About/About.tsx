import Image from "next/image";
import { Transition } from "../Transition";

export function About() {
  return (
    <Transition className="grid gap-4 px-4 py-8 md:py-44 md:px-36 md:grid-cols-2">
      <div
        className="flex flex-col items-center justify-center max-w-xl mb-7"
        id="about"
      >
        <h4 className="text-secondary">Sobre nosotros</h4>
        <h2 className="my-4 text-3xl font-semibold">Más información</h2>
        <p className="mb-10 mt-7">
          Desde el año 2019 nos dedicamos al arriendo de departamentos y casas
          en Puerto Varas, principalmente durante la temporada de verano.
          Nuestra experiencia comenzó a través de plataformas como Airbnb y
          Facebook, donde hemos construido una sólida reputación basada en la
          confianza, la hospitalidad y la calidad de nuestros espacios.
          <br />
          <br />
          Cada propiedad ha sido cuidadosamente equipada para ofrecer comodidad
          y tranquilidad a nuestros huéspedes. Las reseñas verificadas en Airbnb
          respaldan nuestro compromiso con el buen servicio y la atención
          personalizada. Si estás buscando un lugar acogedor para tus
          vacaciones, estás en el sitio correcto.
        </p>
        {/* <button className="px-4 py-3 text-white transition-all duration-200 rounded-lg bg-secondary hover:bg-black">
          Cargar más
        </button> */}
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={`/assets/pv.jpg`}
          alt="About"
          width={350}
          height={450}
          className="w-auto h-auto"
          priority
        ></Image>
      </div>
    </Transition>
  );
}
