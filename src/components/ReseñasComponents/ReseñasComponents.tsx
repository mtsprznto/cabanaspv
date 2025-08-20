type Reseña = {
  id: number;
  nombre: string;
  fecha_publicacion: string;
  puntuacion: number;
  comentario: string;
  url_img: string;
};

type House = {
  reseñas: Reseña[];
};

export function ResenasComponents({ house }: { house: House }) {
  return (
    <div className="rounded-lg shadow-light mt-6 border border-gray-200">
      <div className="p-4 text-lg font-semibold text-gray-800">Reseñas</div>
      <div className="divide-y divide-gray-200">
        {house.reseñas
          .slice()
          .reverse()
          .map((reseña) => (
            <div key={reseña.id} className="flex gap-4 p-4 items-start">
              {/* Avatar */}
              <img
                src={reseña.url_img}
                alt={reseña.nombre}
                className="w-12 h-12 rounded-full object-cover border"
              />

              {/* Contenido */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">
                    {reseña.nombre}
                  </span>
                  <span className="text-sm text-gray-500">
                    {reseña.fecha_publicacion}
                  </span>
                </div>

                {/* Estrellas */}
                <div className="flex items-center mt-1 text-yellow-500 text-sm">
                  {"★".repeat(reseña.puntuacion)}
                  {"☆".repeat(5 - reseña.puntuacion)}
                </div>

                {/* Comentario */}
                <p className="mt-2 text-gray-700 text-sm whitespace-pre-line">
                  {reseña.comentario}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
