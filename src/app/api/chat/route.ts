import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		// Parse the request body
		const body = await request.json();
		const { messages } = body;

		if (!messages || !Array.isArray(messages)) {
			return NextResponse.json(
				{ error: "Invalid messages format" },
				{ status: 400 },
			);
		}

		// Forward the request to the local API
		const response = await fetch("http://127.0.0.1:1234/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ messages }),
		});

		// Check if the response was successful
		if (!response.ok) {
			const errorText = await response.text();
			try {
				const errorData = JSON.parse(errorText);
				return NextResponse.json(errorData, { status: response.status });
			} catch {
				return NextResponse.json(
					{ error: errorText || "Unknown error" },
					{ status: response.status },
				);
			}
		}

		// Return the response data
		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error processing chat request:", error);
		return NextResponse.json(
			{ error: "Failed to process request" },
			{ status: 500 },
		);
	}
}
