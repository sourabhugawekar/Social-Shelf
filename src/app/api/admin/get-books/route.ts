import { ConnectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/Book.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to database first
    await ConnectDB();

    const bookArray = await Book.find();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      bookArray,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error:error instanceof Error ?  error.message || "Error Getting the data of books " : "An error Occured " },
      { status: 500 }
    );
  }
}
