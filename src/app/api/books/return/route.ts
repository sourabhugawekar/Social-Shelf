import { ConnectDB } from "@/dbConfig/dbConfig";
import RentedBook from "@/models/RentedBooks.model";
import Book from "@/models/Book.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await ConnectDB();

    // Get auth session
    const authSession = await getServerSession(authOptions);

    if (!authSession?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Find the rented book
    const rentedBook = await RentedBook.findOne({
      bookId,
      renterEmail: authSession.user.email,
      status: { $in: ["active", "overdue"] },
    });

    if (!rentedBook) {
      return NextResponse.json(
        { error: "Book not found or already returned" },
        { status: 404 }
      );
    }

    // Start a session for transaction
    const dbSession = await mongoose.startSession();
    dbSession.startTransaction();

    try {
      // Update the rented book status
      rentedBook.status = "returned";
      rentedBook.returnDate = new Date();
      await rentedBook.save({ session: dbSession });

      // Find and update the book in the Book collection using bookId
      const book = await Book.findOne({ bookId });

      if (book) {
        // Increase the stock by 1
        book.stock += 1;
        await book.save({ session: dbSession });
      } else {
        console.warn(`Book with ID ${bookId} not found in Book collection`);
      }

      // Commit the transaction
      await dbSession.commitTransaction();
      dbSession.endSession();

      return NextResponse.json({
        success: true,
        message: "Book returned successfully",
      });
    } catch (error) {
      // If an error occurs, abort the transaction
      await dbSession.abortTransaction();
      dbSession.endSession();
      throw error;
    }
  } catch (error: unknown) {
    console.error("Error returning book:", error);
    return NextResponse.json(
      { error: "Failed to return book" },
      { status: 500 }
    );
  }
}
