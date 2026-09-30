const { Resend } = require("resend");

console.log(
        "RESEND_API_KEY at email function:",
        !!process.env.RESEND_API_KEY
    );

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetEmail = async (email, resetUrl) => {
    const { data, error } = await resend.emails.send({
        from: "4Langs <onboarding@resend.dev>",
        to: email,
        subject: "4Langs - Reset your password",
        html: `
            <h2>Reset your password</h2>

            <p>You requested a password reset for your 4Langs account.</p>

            <p>
                <a href="${resetUrl}">Reset password</a>
            </p>

            <p>This link will expire in 30 minutes.</p>

            <p>If you did not request a password reset, you can ignore this email.</p>
        `,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

module.exports = { sendPasswordResetEmail };