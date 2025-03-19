"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
	role: "user" | "assistant";
	content: string;
	id?: string; // Add id for better keys
}

const ChatBot = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Scroll to bottom of chat whenever messages change
	useEffect(() => {
		if (messages.length > 0) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const handleSend = async () => {
		if (!input.trim()) return;

		// Add user message to chat
		const userMessage: Message = {
			role: "user",
			content: input,
			id: `user-${Date.now()}`, // Generate unique id
		};
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		try {
			// Send message to API
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					messages: [...messages, userMessage],
				}),
			});

			const data = await response.json();

			// Handle API response
			if (response.ok && data.choices && data.choices[0]) {
				const assistantMessage: Message = {
					role: "assistant",
					content: data.choices[0].message.content,
					id: `assistant-${Date.now()}`, // Generate unique id
				};
				setMessages((prev) => [...prev, assistantMessage]);
			} else {
				// Handle error
				const errorMessage =
					data.error || "Something went wrong. Please try again.";
				setMessages((prev) => [
					...prev,
					{
						role: "assistant",
						content: `Error: ${errorMessage}`,
						id: `error-${Date.now()}`, // Generate unique id
					},
				]);
			}
		} catch (error) {
			console.error("Failed to send message:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content: "Failed to communicate with the server. Please try again.",
					id: `error-${Date.now()}`, // Generate unique id
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4 text-center">AI Chat Assistant</h1>

			{/* Chat messages container */}
			<div className="flex-1 overflow-auto mb-4 p-4 border rounded-lg bg-gray-50">
				{messages.length === 0 ? (
					<div className="text-gray-500 text-center py-8">
						Send a message to start the conversation.
					</div>
				) : (
					messages.map((message) => (
						<div
							key={message.id || `msg-${Math.random()}`}
							className={`mb-4 ${
								message.role === "user" ? "text-right" : "text-left"
							}`}
						>
							<div
								className={`inline-block p-3 rounded-lg max-w-[80%] ${
									message.role === "user"
										? "bg-blue-500 text-white rounded-br-none"
										: "bg-gray-200 text-gray-800 rounded-bl-none"
								}`}
							>
								{message.content}
							</div>
						</div>
					))
				)}
				{isLoading && (
					<div className="text-left mb-4">
						<div className="inline-block p-3 rounded-lg max-w-[80%] bg-gray-200 text-gray-800 rounded-bl-none">
							<div className="flex space-x-2 items-center">
								<div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" />
								<div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-150" />
								<div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-300" />
							</div>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input area */}
			<div className="flex items-center border rounded-lg overflow-hidden">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type your message..."
					className="flex-1 p-3 focus:outline-none"
					disabled={isLoading}
				/>
				<button
					type="button"
					onClick={handleSend}
					disabled={isLoading || !input.trim()}
					className={`p-3 px-5 ${
						isLoading || !input.trim()
							? "bg-gray-300 text-gray-500"
							: "bg-blue-500 text-white hover:bg-blue-600"
					} transition-colors`}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatBot;
