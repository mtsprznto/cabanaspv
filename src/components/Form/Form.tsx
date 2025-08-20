"use client";
import Image from "next/image";
import { useState } from "react";

export function Form() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isValidInput = (value: string) => value.trim().length > 0;

  const handleSubmit = async () => {
    if (
      !isValidInput(name) ||
      !isValidInput(phone) ||
      !isValidInput(description)
    ) {
      alert("Por favor completa todos los campos antes de enviar.");
      
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, description }),
      });

      if (res.ok) {
        setSuccess(true);
        setName("");
        setPhone("");
        setDescription("");
      } else {
        alert("Hubo un error al enviar el mensaje");
      }
    } catch (error) {
      alert("Error de red o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 md:px-0 mt-3 md:mt-0">
      <div className="md:py-4 md:px-3 rounded-lg shadow-light p-3">
        <div className="flex gap-4">
          <Image
            src={`/assets/properties/arriendo1.png`}
            alt="Comercial"
            width={50}
            height={50}
            className="border-2 rounded-full border-secondary object-cover"
          ></Image>
          <div>
            <p>Contacto</p>
            <p className="text-secondary font-semibold">Margarita</p>
          </div>
        </div>
        <div className="my-5">
          <label htmlFor="" className="text-sm text-secondary">
            Nombre
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border-0 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset text-sm px-2"
            />
          </div>
        </div>
        <div className="my-5">
          <label htmlFor="" className="text-sm text-secondary">
            Telefono
          </label>
          <div className="mt-2">
            <input
              type="phone"
              name="phone"
              id="phone"
              autoComplete="phone"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border-0 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset text-sm px-2"
            />
          </div>
        </div>
        <div className="my-5">
          <label htmlFor="" className="text-sm text-secondary">
            Descripción
          </label>
          <div className="mt-2">
            <textarea
              name="description"
              rows={3}
              className="w-full rounded-md border-0 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-3"
              defaultValue={""}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/* Botones */}
          <div className="flex justify-between gap-5 my-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-secondary px-4 py-2 text-white rounded-lg text-sm"
            >
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>

          {/* Feedback */}
          {success && (
            <p className="text-green-600 text-sm mt-2">
              ✅ Tu mensaje fue enviado correctamente.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
