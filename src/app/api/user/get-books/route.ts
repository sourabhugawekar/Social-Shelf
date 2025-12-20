import { ConnectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/Book.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to database first
    await ConnectDB();

    const bookArray = await Book.find();

    return NextResponse.json({
      message: "Books Fetched successfully",
      success: true,
      bookArray,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: error instanceof Error ?  error.message : "An Error Occured " }, { status: 500 });
  }
}
