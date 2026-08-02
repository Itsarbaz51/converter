import { Conversion } from "@/models/conversions.model";
import { NextResponse } from "next/server";

export async function GET(req, { params}) {
    const conversions = await Conversion.find(params.id);

    return NextResponse.json(conversions);
}