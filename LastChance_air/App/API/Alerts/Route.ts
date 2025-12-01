import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { alertSchema } from "@/lib/validation";
import { checkPrice } from "@/lib/priceCheck";

export async function GET() {
  const rows = await prisma.priceAlert.findMany({ where: { userId: "demo" }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ rows });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = alertSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  const { origin, destination, departDate, threshold } = parsed.data;
  const row = await prisma.priceAlert.create({
    data: { userId: "demo", origin: origin.toUpperCase(), destination: destination.toUpperCase(), departDate: new Date(departDate), threshold }
  });
  return NextResponse.json({ row }, { status: 201 });
}

// Manual check endpoint: /api/alerts?check=id
export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("check"));
  if (!id) return NextResponse.json({ error: "check id required" }, { status: 400 });
  const alert = await prisma.priceAlert.findUnique({ where: { id } });
  if (!alert) return NextResponse.json({ error: "not found" }, { status: 404 });
  const { bestPrice } = await checkPrice(alert.origin, alert.destination, alert.departDate.toISOString());
  const status = bestPrice <= alert.threshold ? "TRIGGERED" : "PENDING";
  const updated = await prisma.priceAlert.update({ where: { id }, data: { lastPrice: bestPrice, lastChecked: new Date(), status: status as any } });
  return NextResponse.json({ row: updated });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.priceAlert.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
