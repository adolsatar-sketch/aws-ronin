import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name) return NextResponse.json({ ok: false, field: "name" }, { status: 422 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, field: "email" }, { status: 422 });
  if (!message) return NextResponse.json({ ok: false, field: "message" }, { status: 422 });

  // No email/CRM provider is configured for this project yet — log server-side
  // so a submission is at least visible while a real integration is wired up.
  console.info("[contact] new submission", {
    name,
    email,
    projectType: body.projectType ?? "",
    budget: body.budget ?? "",
    message,
  });

  return NextResponse.json({ ok: true });
}
