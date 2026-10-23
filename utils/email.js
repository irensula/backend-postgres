const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetEmail = async (email, resetUrl) => {
    const { data, error } = await resend.emails.send({
        from: "4Langs <support@irensula.dev>",
        to: email,
        subject: "Reset your password",
        html: `
            <html>
                <head>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
                        rel="stylesheet"
                    >
                </head>

                <body style="margin: 0; font-family: 'Open Sans', sans-serif;">
                    <div style="max-width: 600px;">
                        
                    <div style="width:100%; background-color: #8DD54F; display: flex; justify-content: flex-end; align-content: center;">
                            <img src="https://study-languages.up.railway.app/icon.png" style="width: 100px; height: 100px; border-radius: 15px; margin: 10px" />
                        </div>
                    
                        <h2 style="font-size: 25px;">Hello,</h2>

                        <p>You recently requested a password reset for your 4Langs account. Click on the link below to reset your password.</p>

                        <p style="margin: 30px 0;">
                            <a href="${resetUrl}"
                                style="
                                    background-color: #158fd4;
                                    color: white;
                                    padding: 12px 24px;
                                    text-decoration: none;
                                    border-radius: 8px;
                                    display: inline-block;
                                "
                            >
                                Reset password
                            </a>
                        </p>

                        <p>This link will expire in 30 minutes after this email was sent.</p>

                        <p>If you did not request a password reset, you can ignore this email.</p>

                        <p style="margin-top: 30px;">Sincerely,<br>
                            <span style="font-weight: 700; font-size: 18px; line-height: 18px">The 4Langs Team</span>
                        </p>
                    </div>
                </body>
            </html>
        `,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

const sendVerificationEmail = async (email, verificationUrl) => {
    const { data, error } = await resend.emails.send({
        from: "4Langs <support@irensula.dev>",
        to: email,
        subject: "Verify your 4Langs email address",
        html: `
            <html>
                <body style="margin: 0; font-family: Arial, sans-serif;">
                    <div style="max-width: 600px; margin: 0 auto;">
                        <div style="background-color: #8DD54F; padding: 20px;">
                            <img
                                src="https://study-languages.up.railway.app/icon.png"
                                alt="4Langs"
                                width="80"
                                height="80"
                                style="border-radius: 15px;"
                            />
                        </div>

                        <div style="padding: 20px;">
                            <h2>Welcome to 4Langs!</h2>

                            <p>
                                Thank you for creating your 4Langs account.
                                Please verify your email address to activate your account.
                            </p>

                            <p style="margin: 30px 0;">
                                <a href="${verificationUrl}"
                                    style="
                                        background-color: #158fd4;
                                        color: white;
                                        padding: 12px 24px;
                                        text-decoration: none;
                                        border-radius: 8px;
                                        display: inline-block;
                                    "
                                >
                                    Verify email address
                                </a>
                            </p>

                            <p>
                                If you did not create a 4Langs account,
                                you can ignore this email.
                            </p>

                            <p style="margin-top: 30px;">
                                Sincerely,<br />
                                <strong>The 4Langs Team</strong>
                            </p>
                        </div>
                    </div>
                </body>
            </html>
        `,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

module.exports = { sendPasswordResetEmail, sendVerificationEmail };