import { NextResponse } from "next/server";

export const runtime = "edge";

/**
 * Endpoint mock del waitlist.
 *
 * Cuando definas el provider real (Resend / Mailchimp / Formspree)
 * reemplazá este handler. La respuesta es un código de invitación
 * estilo "NL-XXXXXX" para mostrarle al usuario.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      email?: string;
      city?: string;
      tier?: string;
      source?: string;
    };

    const email = (body.email || "").trim();
    const city = (body.city || "").trim();
    const tier = (body.tier || "FOUNDERS").trim().toUpperCase();
    const source = (body.source || "landing").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Email inválido" },
        { status: 400 }
      );
    }

    // Generar código mock (visual, no autoritativo)
    const code =
      "NL-" +
      Array.from({ length: 6 })
        .map(() =>
          "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".charAt(
            Math.floor(Math.random() * 32)
          )
        )
        .join("");

    // TODO: persistir / enviar a tu provider de email
    // await fetch("https://api.resend.com/emails", { ... })

    return NextResponse.json({
      ok: true,
      code,
      email,
      city,
      tier,
      source,
      message: "Estás en la lista. Bienvenido al sistema.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Algo salió mal. Intentá de nuevo." },
      { status: 500 }
    );
  }
}
