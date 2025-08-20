import { Transition } from "../Transition";
import { FaRegPaperPlane, FaWhatsapp } from "react-icons/fa";

export function JoinCommunity() {
  return (
    <Transition className="grid items-center px-4 py-8 md:py-44 md:px-36 md:grid-cols-2 bg-secondary">
      <h3 className="max-w-lg text-4xl font-semibold text-white">
        ¿Interesado en arrendar o saber más?
        <br />
        Conversemos por WhatsApp
      </h3>

      <div className="mx-auto mt-5 md:mx-auto">
        <a
          href="https://wa.me/56999479312?text=Hola!%20Estoy%20interesado%20en%20los%20arriendos%20de%20Puerto%20Varas.%20¿Me%20puedes%20contar%20más?"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between py-5 text-white transition-all duration-100 bg-black rounded-lg px-7 w-fit hover:bg-black/80"
        >
          <FaWhatsapp size={20} />
          <span className="ml-3">Hablar por WhatsApp</span>
        </a>
      </div>
    </Transition>
  );
}
