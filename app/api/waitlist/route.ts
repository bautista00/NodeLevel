import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return (
    "NL-" +
    Array.from({ length: 6 })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("")
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      email?: string;
      tier?: string;
      source?: string;
    };

    const email = (body.email || "").trim().toLowerCase();
    const tier = (body.tier || "FOUNDERS").trim().toUpperCase();
    const source = (body.source || "landing").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Email inválido" },
        { status: 400 }
      );
    }

    // Verificar si el email ya está registrado
    const { data: existing } = await supabase
      .from("waitlist")
      .select("code")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { ok: false, error: "Este email ya está registrado" },
        { status: 409 }
      );
    }

    // Generar código único
    const code = generateCode();

    // Guardar en Supabase
    const { error: dbError } = await supabase.from("waitlist").insert({
      email,
      tier,
      source,
      code,
    });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { ok: false, error: dbError.message },
        { status: 500 }
      );
    }

    // Enviar email de bienvenida con Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: "Tu 15% OFF está reservado — NODE LEVEL",
      html: buildEmail({ code, tier }),
    });

    return NextResponse.json({ ok: true, code, email, tier, source });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { ok: false, error: "Algo salió mal. Intentá de nuevo." },
      { status: 500 }
    );
  }
}

function buildEmail({ code, tier }: { code: string; tier: string }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NODE LEVEL — Estás en la lista</title>
</head>
<body style="margin:0;padding:0;background:#050505;font-family:'Courier New',monospace;color:#f1f1ec;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Header -->
          <tr>
            <td style="border-top:2px solid #c6ff3d;padding-top:32px;">
              <p style="margin:0;font-size:10px;letter-spacing:0.3em;color:#c6ff3d;">▸ NODE LEVEL</p>
              <h1 style="margin:12px 0 0;font-size:36px;letter-spacing:0.2em;font-weight:400;color:#f1f1ec;font-family:'Courier New',monospace;">
                ESTÁS EN<br/>LA LISTA.
              </h1>
            </td>
          </tr>

          <!-- Código -->
          <tr>
            <td style="padding:32px 0;">
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.2em;color:#9a9a92;">TU CÓDIGO FOUNDERS</p>
              <div style="display:inline-block;border:1px dashed #c6ff3d;padding:16px 32px;">
                <span style="font-size:32px;letter-spacing:0.4em;color:#c6ff3d;">${code}</span>
              </div>
            </td>
          </tr>

          <!-- Descuento -->
          <tr>
            <td style="background:#0c0c0c;border:1px solid #2a2a2a;padding:24px;">
              <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.25em;color:#c6ff3d;">TU BENEFICIO RESERVADO</p>
              <p style="margin:0;font-size:28px;letter-spacing:0.15em;font-weight:400;color:#f1f1ec;">
                15% OFF
              </p>
              <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.1em;color:#9a9a92;line-height:1.8;">
                Plan ${tier} — Precio de lanzamiento bloqueado.<br/>
                Te avisamos cuando abramos el acceso al beta privado.
              </p>
            </td>
          </tr>

          <!-- Qué sigue -->
          <tr>
            <td style="padding:32px 0 0;">
              <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.25em;color:#9a9a92;">QUÉ SIGUE</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:0 0 12px;">
                    <span style="color:#c6ff3d;margin-right:12px;">01</span>
                    <span style="font-size:12px;letter-spacing:0.1em;color:#f1f1ec;">Te mandamos acceso al beta cuando abramos</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 12px;">
                    <span style="color:#c6ff3d;margin-right:12px;">02</span>
                    <span style="font-size:12px;letter-spacing:0.1em;color:#f1f1ec;">Usás el código al suscribirte y el 15% se aplica</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="color:#c6ff3d;margin-right:12px;">03</span>
                    <span style="font-size:12px;letter-spacing:0.1em;color:#f1f1ec;">Acceso prioritario antes que el público general</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:40px 0 0;border-top:1px solid #2a2a2a;margin-top:40px;">
              <p style="margin:0;font-size:10px;letter-spacing:0.15em;color:#4a4a44;">
                NODE LEVEL — Verified by Node<br/>
                Argentina / LATAM<br/><br/>
                Recibiste este email porque te registraste en nodelevel.ar.<br/>
                No te vamos a mandar spam. Punto.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
