const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetEmail = async (email, resetUrl) => {
    const { data, error } = await resend.emails.send({
        from: "4Langs <onboarding@resend.dev>",
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
                        <img src="https://study-languages.up.railway.app/assets/icon.png" style="width: 100px; height: 100px; border-radius: 15px; margin: 10px" />
                    </div>
                
                    <h2 style="font-size: 25px;">Hello,</h2>

                    <p>You recently requested a password reset for your 4Langs account. Click the link below to reset your password. Click on the link below to reset your password.</p>

                    <p>
                        <a href="${resetUrl}">Reset password</a>
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

module.exports = { sendPasswordResetEmail };