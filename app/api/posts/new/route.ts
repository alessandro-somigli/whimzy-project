import { getAuth } from "@clerk/nextjs/dist/server/getAuth";
import { connect } from "@planetscale/database";
import { NextRequest, NextResponse } from "next/server";

const config = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
}

export async function POST(request: NextRequest) {
    const body = (await request.json()) as { 
      title: string,
      text: string
    };

    const { userId } = getAuth(request);

    const planetscale = connect(config);

    await planetscale.execute(`
        INSERT INTO Posts (post_title, post_text, post_publish_date, post_user) VALUES (
            '${body.title}',
            '${body.text}',
            NOW(),
            '${userId}'
        );
    `);


    return NextResponse.json({});
}
  