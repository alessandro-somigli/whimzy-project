import Scroll from "@/components/scroll";
import { auth } from "@clerk/nextjs";

export default function User() {
    const { userId } = auth();

    return (
        <main>
            <Scroll users={userId? [userId] : []} date={false}/>

            {userId? <button>+</button> : null}
        </main>
    );
}