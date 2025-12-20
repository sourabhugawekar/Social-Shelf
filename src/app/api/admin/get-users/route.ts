import { ConnectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to database first
    await ConnectDB();

    const users = await User.find({
      role: { $in: ["student", "volunteer"] },
    });

    return NextResponse.json({
      message: "Users fetched successfully",
      success: true,
      users,
    });
  } catch (error) {
    console.error("Users fetching error:", error);
    return NextResponse.json(
      { error:error instanceof Error ?  error.message || "Error Geting Users " : "An error Occured " },
     { status: 500 });
  }
}
