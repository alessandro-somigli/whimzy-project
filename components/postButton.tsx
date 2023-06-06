"use client";

import { ChangeEvent, useState } from "react";

type PostButtonProps = {
    userId: string
}

export default function PostButton(props: PostButtonProps) {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const maxTitleChars = 30;
    const maxTextChars = 60;

    const onSendPost = () => {
        fetch(`/api/posts/new`, {
            body: JSON.stringify({ title: title, text: text }),
            method: 'POST'
        });

        setText('')
        setTitle('')
    }

    const handleTitleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        evt.target.value.length <= maxTitleChars? setTitle(evt.target.value) : null
    }
    const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
        evt.target.value.length <= maxTextChars? setText(evt.target.value) : null
    }

    return (
        <>
            <div>
                <button onClick={() => onSendPost()}>post</button> <br />
                <span>title: ({maxTitleChars - title.length})</span>
                <input type="text" value={title} onChange={(evt) => handleTitleChange(evt)} />
                <br />
                <span>text: ({maxTextChars - text.length})</span>
                <input type="text" value={text} onChange={(evt) => handleTextChange(evt)} />
            </div>
        </>
    )
}