import Scroll from "@/components/scroll";
import { auth } from "@clerk/nextjs";

export default function User(context: { params: { id: string } }) {
    const { userId } = auth();

    return (
        <main>
            <Scroll users={context.params.id? [context.params.id] : []} date={false}/>

            {context.params.id === userId? <button>+</button> : null}
        </main>
    );
}