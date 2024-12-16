import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisation de Gmail (vous pouvez utiliser un autre service)
    auth: {
      user: 'hacenekatia99@gmail.com',
      pass: '@Katiakatia99@',
    },
  });

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'katiagmail.com',
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
