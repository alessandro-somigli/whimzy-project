import PostButton from "@/components/postButton";
import Scroll from "@/components/scroll";
import { auth } from "@clerk/nextjs";
import { ChangeEvent } from "react";

export default function User(context: { params: { id: string } }) {
    const { userId } = auth();

    const maxChars = 60;

    return (
        <main>
            <Scroll users={context.params.id? [context.params.id] : []} date={false}/>

            {context.params.id === userId? 
                <PostButton userId={userId} /> : <></>}
        </main>
    );
}