import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { name, email, message, number } = await req.json();

        if (!name || name.length < 3) {
            throw new Error('Name is required');
        }
        if (!number) throw new Error('Phone number is required');

        // Remove any non-digit characters
        const cleanedNumber = number.replace(/\D/g, '');

        // Check if the cleaned number is valid
        if (cleanedNumber.length < 10 || cleanedNumber.length > 15) {
            throw new Error('A valid phone number is required');
        }

        if (!message || message == '') {
            throw new Error('Message is required');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pacmyproduct@gmail.com', // replace with your email
                pass: 'jozl rqnx piqa lndi', // replace with your email password
            },
        });

        const mailOptions = {
            from: email,
            to: 'pacmyproduct@gmail.com',
            subject: `Contact Form Submission from ${name}`,
            text: `
            You have received a new message from your website contact form.

            Here are the details:
            Name: ${name}
            Email: ${email}
            Number: ${number}
            Message: ${message}
        `,
        };
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Thankyou, your message has been sent.' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
