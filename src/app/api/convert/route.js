import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();

  const files = data.getAll("files");
  const conversionType = data.get("conversionType");

  if (!files.length) {
    return NextResponse.json(
      { error: "No file uploaded" },
      { status: 400 }
    );
  }

  switch (conversionType) {
    case "pdf-to-word":
      return await convertPDFToWord(files);

    case "pdf-to-excel":
      return await convertPDFToExcel(files);

    case "pdf-to-ppt":
      return await convertPDFToPPT(files);

    case "pdf-to-jpg":
      return await convertPDFToImages(files);

    case "pdf-to-png":
      return await convertPDFToPNG(files);

    case "pdf-to-text":
      return await convertPDFToText(files);

    default:
      return NextResponse.json(
        { error: "Invalid conversion type" },
        { status: 400 }
      );
  }
}
