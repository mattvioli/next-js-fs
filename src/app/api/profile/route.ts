import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, username, jobTitle } = (await req.json()) as {
      id: string;
      username: string;
      jobTitle: string;
    };

    const user = await prisma.user.update({
      data: {
        username,
        jobTitle
      },
      where: { id }
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        jobTitle: user.jobTitle
      }
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message
      }),
      { status: 500 }
    );
  }
}
