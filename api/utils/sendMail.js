// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');
const { MAIL_USER, MAIL_PASS } = require('./index');

async function main(order, user) {

    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS,
            }
        });

        // Message object
        let message = {
            from: 'Dream Cars <sender@example.com>',
            to: user.email,
            subject: `Congratulations ${user.name}! - PO #${order.id}`,
            text: `We hope you'll enjoy your new ${order.detail[0].brand} ${order.detail[0].model} ${order.detail[0].year} ${order.paymentMethod} ${order.totalPrice}`,
            html: `<p>We hope you'll enjoy your new ${order.detail[0].brand}</p>
            <ul>
            <li>Model: ${order.detail[0].model} </li>
            <li>Year: ${order.detail[0].year} </li>
            <li><italic>Payment Method: ${order.paymentMethod}</italic></li>
            <li><strong>Total Price: $${order.totalPrice}</strong></li>
            </ul>
            <br>`
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}
module.exports = main
