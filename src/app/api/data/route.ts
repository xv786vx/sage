import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export const GET = auth(function GET(req) {
  if (req.auth) return NextResponse.json(req.auth);
  return NextResponse.json({ message: "Not Authenticated" }, { status: 400 });
});
