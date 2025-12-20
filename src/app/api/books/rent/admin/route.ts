import { ConnectDB } from "@/dbConfig/dbConfig";
import RentedBook from "@/models/RentedBooks.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDB();

    // Get all rented books with pending status
    const rentedBooks = await RentedBook.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean();

    // Format dates and add additional information
    const formattedBooks = rentedBooks.map((book) => ({
      id: book._id,
      bookId: book.bookId,
      bookTitle: book.bookTitle,
      renterName: book.renterName,
      renterEmail: book.renterEmail,
      status: book.status,
      rentDate: book.rentDate,
      dueDate: book.dueDate,
      returnDate: book.returnDate,
      fine: book.fine,
      approvedBy: book.approvedBy,
      approvedAt: book.approvedAt,
      createdAt: book.createdAt,
    }));

    return NextResponse.json({
      success: true,
      rentedBooks: formattedBooks,
    });
  } catch (error) {
    console.error("Error fetching rented books:", error);
    return NextResponse.json(
      { error:error instanceof Error ?  error.message || "Error fetching rented books !" : "An error Occured " },
      {status:500}
    )
  }
}
