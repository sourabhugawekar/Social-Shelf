import { ConnectDB } from "@/dbConfig/dbConfig";
import Contact from "@/models/contact.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to database first
    await ConnectDB();

    const feedbackArray = await Contact.find();

    return NextResponse.json({
      message: "Feedback fetched successfully",
      success: true,
      feedbackArray,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error:error instanceof Error ?  error.message || "Registeration Errors !  " : "An error Occured " },
      {status:500}
    )
  }
}
