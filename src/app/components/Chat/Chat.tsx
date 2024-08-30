"use client";

import { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { generate } from "../../actions";
import styles from "./Chat.module.scss";

export default function ChatComponent() {
    const [messages, setMessages] = useState<
        { role: string; content: string }[]
    >([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Add the user's message to the conversation
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "user", content: input },
        ]);
        setInput("");
        setIsLoading(true);

        try {
            const { output } = await generate(input);

            let aiMessage = "";
            for await (const delta of readStreamableValue(output)) {
                aiMessage += delta;
                // Clear the previous AI message and update it in the conversation as it streams
                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages];
                    const lastMessage = newMessages[newMessages.length - 1];

                    if (lastMessage?.role === "ai") {
                        newMessages[newMessages.length - 1] = {
                            ...lastMessage,
                            content: aiMessage,
                        };
                    } else {
                        newMessages.push({ role: "ai", content: aiMessage });
                    }

                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error generating response:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "ai", content: "Sorry, something went wrong." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles["main_chat"]}>
            <form className={styles["main_form"]} onSubmit={handleSubmit}>
                <input
                    className={styles["main_input"]}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    required
                />
                <button
                    className={styles["main_button"]}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Send"}
                </button>
            </form>{" "}
            {messages.length > 0 && (
                <div className={styles["main_messages"]}>
                    {messages.map((msg, index) => (
                        <p key={index} className={styles["main_message"]}>
                            {msg.content}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
