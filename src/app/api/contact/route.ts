// src/app/api/contact/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, phone, description } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Formulario Web <contacto@mtsprz.org>",
      to: ["contacto@mtsprz.org"],
      subject: `[ArriendoPV] Nuevo mensaje de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong><br/>${description}</p>
      `,
    });

    if (error)
      return NextResponse.json({ success: false, error }, { status: 500 });

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
