import style from "@/styles/pages/feed.module.scss";
import Scroll from "@/components/scroll";
import { auth } from "@clerk/nextjs";
import { getFollowedResponse } from "../api/followed/route";
import { connect } from "@planetscale/database";

export const runtime = "edge";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const getFriends = async (follower: string) => {
  const planetscale = connect(config);

  const followed = (await planetscale.execute(`
  SELECT * FROM Follow
  WHERE Follow.follower = '${follower}';
  `)).rows as getFollowedResponse;

  return followed.map(row => row.followed);
};

export default async function Page() {
  const { userId } = auth();

  const friends = userId? await getFriends(userId) : []

  return (
    <main className={style.feed}>
      <Scroll users={friends} />

      {userId ? <button>+</button> : null}
    </main>
  );
}
