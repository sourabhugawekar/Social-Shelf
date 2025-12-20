import { ConnectDB } from "@/dbConfig/dbConfig";
import Book from "@/models/Book.model";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    await ConnectDB();

    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Find and delete the book
    const deletedBook = await Book.findOneAndDelete({ bookId });

    if (!deletedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Book deleted successfully",
      success: true,
      deletedBook,
    });
  } catch (error) {
    console.error("Book deletion error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message || "Error Deleting book" : "An error Occured " }
      ,{ status: 500 });
  }
}
