import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return new NextResponse(generateUnsubscribePage(false, "No email provided"), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update subscriber status
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ 
        subscribed: false, 
        unsubscribed_at: new Date().toISOString() 
      })
      .eq("email", email.toLowerCase());

    if (error) {
      console.error("Unsubscribe error:", error);
      return new NextResponse(generateUnsubscribePage(false, "Failed to unsubscribe. Please try again."), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }

    return new NextResponse(generateUnsubscribePage(true, email), {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });

  } catch (error) {
    console.error("Unsubscribe error:", error);
    return new NextResponse(generateUnsubscribePage(false, "An error occurred"), {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
}

function generateUnsubscribePage(success: boolean, message: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${success ? "Unsubscribed" : "Error"} - SendComms</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #0a0a0a;
      color: #ffffff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      max-width: 500px;
      text-align: center;
    }
    .logo {
      width: 80px;
      height: auto;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
      color: ${success ? "#5eead4" : "#ef4444"};
    }
    p {
      font-size: 16px;
      color: #a0a0a0;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .button {
      display: inline-block;
      background-color: #5eead4;
      color: #0a0a0a;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #2dd4bf;
    }
    .resubscribe {
      margin-top: 24px;
      font-size: 14px;
      color: #666;
    }
    .resubscribe a {
      color: #5eead4;
      text-decoration: none;
    }
    .resubscribe a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="https://sendcomms.com/sendcomms-logo.png" alt="SendComms" class="logo" />
    ${success ? `
      <h1>You've been unsubscribed</h1>
      <p>We're sorry to see you go! You've been successfully unsubscribed from our newsletter and will no longer receive emails from us.</p>
      <a href="https://sendcomms.com" class="button">Visit SendComms</a>
      <p class="resubscribe">Changed your mind? <a href="https://sendcomms.com/contact">Subscribe again</a></p>
    ` : `
      <h1>Something went wrong</h1>
      <p>${message}</p>
      <a href="https://sendcomms.com" class="button">Go to Homepage</a>
    `}
  </div>
</body>
</html>
  `;
}
