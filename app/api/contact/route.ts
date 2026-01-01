import { NextRequest, NextResponse } from "next/server";

const SENDCOMMS_API_KEY = process.env.sendcomms_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAILS;
const ADMIN_PHONE = process.env.ADMIN_PHONE;
const FROM_EMAIL = process.env.YOUR_EMAIL_DOMAIN;
const API_BASE_URL = "https://api.sendcomms.com";

export async function POST(request: NextRequest) {
  console.log("=== Contact Form Submission ===");
  console.log("API Key exists:", !!SENDCOMMS_API_KEY);
  console.log("Admin Email:", ADMIN_EMAIL);
  console.log("Admin Phone:", ADMIN_PHONE);
  console.log("From Email:", FROM_EMAIL);
  
  try {
    const body = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2));
    
    const { name, email, company, phone, message, services } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const results = {
      email: { success: false, error: null as string | null },
      sms: { success: false, error: null as string | null },
    };

    // Format the email content
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; margin-bottom: 4px; }
    .value { font-size: 16px; color: #111827; }
    .services { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .service-tag { background: #e0e7ff; color: #4338ca; padding: 4px 12px; border-radius: 9999px; font-size: 14px; }
    .message-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 8px; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone reached out via SendComms.com</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      ${company ? `
      <div class="field">
        <div class="label">Company</div>
        <div class="value">${company}</div>
      </div>
      ` : ''}
      ${phone ? `
      <div class="field">
        <div class="label">Phone</div>
        <div class="value"><a href="tel:${phone}">${phone}</a></div>
      </div>
      ` : ''}
      ${services && services.length > 0 ? `
      <div class="field">
        <div class="label">Interested In</div>
        <div class="services">
          ${services.map((s: string) => `<span class="service-tag">${s}</span>`).join('')}
        </div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      Sent from SendComms Contact Form • ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
    </div>
  </div>
</body>
</html>
    `;

    // Send email to admin
    if (SENDCOMMS_API_KEY && ADMIN_EMAIL && FROM_EMAIL) {
      try {
        console.log("Sending email to:", ADMIN_EMAIL);
        console.log("From:", FROM_EMAIL);
        
        const emailResponse = await fetch(`${API_BASE_URL}/api/v1/email/send`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${SENDCOMMS_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: ADMIN_EMAIL,
            from: `SendComms Contact <${FROM_EMAIL}>`,
            subject: `New Contact: ${name}${company ? ` from ${company}` : ''}`,
            html: emailHtml,
            replyTo: email,
          }),
        });

        const emailResult = await emailResponse.json();
        console.log("Email API response status:", emailResponse.status);
        console.log("Email API response:", JSON.stringify(emailResult, null, 2));
        
        if (emailResponse.ok && emailResult.success) {
          results.email.success = true;
        } else {
          results.email.error = emailResult.error || "Failed to send email";
        }
      } catch (err) {
        console.error("Email send error:", err);
        results.email.error = err instanceof Error ? err.message : "Email send failed";
      }
    } else {
      console.log("Email config missing - API Key:", !!SENDCOMMS_API_KEY, "Admin Email:", !!ADMIN_EMAIL, "From Email:", !!FROM_EMAIL);
      results.email.error = "Email configuration missing";
    }

    // Send SMS to admin
    if (SENDCOMMS_API_KEY && ADMIN_PHONE) {
      try {
        console.log("Sending SMS to:", ADMIN_PHONE);
        
        const smsMessage = `📬 New Contact!\n\nFrom: ${name}${company ? ` (${company})` : ''}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\n\n${message.slice(0, 100)}${message.length > 100 ? '...' : ''}\n\n- SendComms`;
        
        const smsResponse = await fetch(`${API_BASE_URL}/api/v1/sms/send`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${SENDCOMMS_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: ADMIN_PHONE,
            message: smsMessage,
          }),
        });

        const smsResult = await smsResponse.json();
        console.log("SMS API response status:", smsResponse.status);
        console.log("SMS API response:", JSON.stringify(smsResult, null, 2));
        
        if (smsResponse.ok && smsResult.success) {
          results.sms.success = true;
        } else {
          results.sms.error = smsResult.error || "Failed to send SMS";
        }
      } catch (err) {
        console.error("SMS send error:", err);
        results.sms.error = err instanceof Error ? err.message : "SMS send failed";
      }
    } else {
      console.log("SMS config missing - API Key:", !!SENDCOMMS_API_KEY, "Admin Phone:", !!ADMIN_PHONE);
      results.sms.error = "SMS configuration missing";
    }

    // Return success if at least one notification was sent
    const anySuccess = results.email.success || results.sms.success;
    console.log("Final results:", JSON.stringify(results, null, 2));
    console.log("Any success:", anySuccess);
    
    return NextResponse.json({
      success: anySuccess,
      message: anySuccess 
        ? "Thank you for your message! We'll get back to you soon."
        : "Failed to send your message. Please try again or contact us directly.",
      details: results,
    }, { status: anySuccess ? 200 : 500 });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "An unexpected error occurred. Please try again." 
      },
      { status: 500 }
    );
  }
}
