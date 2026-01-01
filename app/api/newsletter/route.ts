import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SENDCOMMS_API_KEY = process.env.sendcomms_API_KEY;
const FROM_EMAIL = process.env.YOUR_EMAIL_DOMAIN;
const API_BASE_URL = "https://api.sendcomms.com";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(request: NextRequest) {
  console.log("=== Newsletter Subscription ===");
  
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email address is required" },
        { status: 400 }
      );
    }

    console.log("Subscribing email:", email);

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if email already exists
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, subscribed")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json(
          { success: false, error: "You're already subscribed!" },
          { status: 400 }
        );
      } else {
        // Re-subscribe
        await supabase
          .from("newsletter_subscribers")
          .update({ subscribed: true, resubscribed_at: new Date().toISOString() })
          .eq("id", existing.id);
      }
    } else {
      // Insert new subscriber
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({
          email: email.toLowerCase(),
          subscribed: true,
          source: "website",
        });

      if (insertError) {
        console.error("Database insert error:", insertError);
        return NextResponse.json(
          { success: false, error: "Failed to subscribe. Please try again." },
          { status: 500 }
        );
      }
    }

    // Send welcome email
    if (SENDCOMMS_API_KEY && FROM_EMAIL) {
      const welcomeEmailHtml = generateWelcomeEmail(email);
      
      try {
        const emailResponse = await fetch(`${API_BASE_URL}/api/v1/email/send`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${SENDCOMMS_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: email,
            from: `SendComms <${FROM_EMAIL}>`,
            subject: "Welcome to SendComms! 🎉",
            html: welcomeEmailHtml,
          }),
        });

        const emailResult = await emailResponse.json();
        console.log("Welcome email sent:", emailResult.success);
      } catch (err) {
        console.error("Failed to send welcome email:", err);
        // Don't fail the subscription if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "You're subscribed! Check your inbox for a welcome email.",
    });

  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

function generateWelcomeEmail(email: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Welcome to SendComms</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      background-color: #f5f5f5;
      color: #333333;
    }
    
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1a1a1a !important;
      }
      .email-container {
        background-color: #0a0a0a !important;
      }
      .content-area {
        background-color: #0a0a0a !important;
      }
      h1, h2, p, .greeting {
        color: #ffffff !important;
      }
      .body-text {
        color: #a0a0a0 !important;
      }
      .footer-text {
        color: #666666 !important;
      }
      .footer-link {
        color: #5eead4 !important;
      }
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    
    .content-area {
      padding: 40px 40px 30px 40px;
      background-color: #ffffff;
    }
    
    .logo-area {
      margin-bottom: 30px;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .logo-dots {
      display: inline-flex;
      gap: 4px;
    }
    
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
    }
    
    .dot-red { background-color: #ef4444; }
    .dot-yellow { background-color: #eab308; }
    .dot-green { background-color: #22c55e; }
    
    .logo-text {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-left: 8px;
    }
    
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #111111;
      margin: 0 0 24px 0;
      line-height: 1.3;
    }
    
    .greeting {
      font-size: 16px;
      color: #333333;
      margin-bottom: 20px;
    }
    
    .body-text {
      font-size: 15px;
      color: #555555;
      margin-bottom: 20px;
      line-height: 1.7;
    }
    
    .cta-button {
      display: inline-block;
      background-color: #5eead4;
      color: #0a0a0a !important;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      margin: 20px 0 30px 0;
    }
    
    .cta-button:hover {
      background-color: #2dd4bf;
    }
    
    .footer-area {
      padding: 30px 40px;
      border-top: 1px solid #e5e5e5;
    }
    
    .app-stores {
      margin-bottom: 24px;
    }
    
    .app-stores p {
      font-size: 13px;
      color: #666666;
      margin: 0 0 12px 0;
    }
    
    .store-buttons {
      display: inline-flex;
      gap: 12px;
    }
    
    .store-badge {
      height: 36px;
      border-radius: 6px;
    }
    
    .footer-text {
      font-size: 13px;
      color: #666666;
      margin: 0 0 8px 0;
    }
    
    .footer-link {
      color: #5eead4;
      text-decoration: none;
    }
    
    .footer-link:hover {
      text-decoration: underline;
    }
    
    .unsubscribe-text {
      font-size: 12px;
      color: #999999;
      margin-top: 24px;
    }
    
    @media only screen and (max-width: 600px) {
      .content-area {
        padding: 30px 24px 20px 24px;
      }
      .footer-area {
        padding: 24px;
      }
      h1 {
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <div style="padding: 20px 10px; background-color: #f5f5f5;">
    <table class="email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden;">
      <tr>
        <td class="content-area" style="padding: 40px 40px 30px 40px;">
          <!-- Logo -->
          <div class="logo-area" style="margin-bottom: 30px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding-right: 10px; vertical-align: middle;">
                  <img src="https://sendcomms.com/sendcomms-logo.png" alt="SendComms" width="40" height="40" style="display: block; width: 40px; height: auto;" />
                </td>
                <td style="vertical-align: middle;">
                  <span style="font-size: 18px; font-weight: 600; color: #333333;">SendComms</span>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Heading -->
          <h1 style="font-size: 28px; font-weight: 700; color: #111111; margin: 0 0 24px 0; line-height: 1.3;">
            We're pleased<br>to meet you
          </h1>
          
          <!-- Greeting -->
          <p class="greeting" style="font-size: 16px; color: #333333; margin-bottom: 20px;">
            Hi there,
          </p>
          
          <!-- Body -->
          <p class="body-text" style="font-size: 15px; color: #555555; margin-bottom: 20px; line-height: 1.7;">
            Welcome to the SendComms community! Did you know that over 10,000 developers use our Email API every day? It's a great way to send transactional emails or explore new integrations.
          </p>
          
          <p class="body-text" style="font-size: 15px; color: #555555; margin-bottom: 20px; line-height: 1.7;">
            What are you going to build with yours? Follow the link below to create your very first API key and join thousands of other developers around the globe!
          </p>
          
          <!-- CTA Button -->
          <div style="margin: 30px 0;">
            <a href="https://console.sendcomms.com" class="cta-button" style="display: inline-block; background-color: #5eead4; color: #0a0a0a; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
              Let's go!
            </a>
          </div>
        </td>
      </tr>
      
      <!-- Footer -->
      <tr>
        <td class="footer-area" style="padding: 30px 40px; border-top: 1px solid #e5e5e5;">
          <!-- App description -->
          <p style="font-size: 13px; color: #666666; margin: 0 0 16px 0;">
            SendComms at the touch of a button! Access our dashboard:
          </p>
          
          <!-- Dashboard link -->
          <div style="margin-bottom: 24px;">
            <a href="https://console.sendcomms.com" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 500;">
              📱 Open Dashboard
            </a>
          </div>
          
          <!-- Contact -->
          <p style="font-size: 13px; color: #666666; margin: 0 0 8px 0;">
            Questions or concerns? Get in touch with us at 
            <a href="mailto:support@sendcomms.com" style="color: #5eead4; text-decoration: none;">support@sendcomms.com</a>.
          </p>
          <p style="font-size: 13px; color: #666666; margin: 0 0 16px 0;">
            Never miss a beat! Follow us on 
            <a href="https://twitter.com/sendcomms" style="color: #5eead4; text-decoration: none;">Twitter</a>, 
            <a href="https://linkedin.com/company/sendcomms" style="color: #5eead4; text-decoration: none;">LinkedIn</a> and 
            <a href="https://instagram.com/sendcomms" style="color: #5eead4; text-decoration: none;">Instagram</a>.
          </p>
          
          <!-- Unsubscribe -->
          <p style="font-size: 12px; color: #999999; margin-top: 24px;">
            Don't want any more emails from SendComms? 
            <a href="https://sendcomms.com/api/unsubscribe?email=${encodeURIComponent(email)}" style="color: #5eead4; text-decoration: none;">Unsubscribe</a>.
          </p>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
  `;
}
