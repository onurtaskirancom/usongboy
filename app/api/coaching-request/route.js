import nodemailer from 'nodemailer';

export async function POST(req) {
  const {
    name,
    email,
    age,
    gender,
    experience,
    dailyTrainingDuration,
    weeklyTrainingDays,
    currentProgram,
    nutrition,
    goals,
    message,
    phone, 
  } = await req.json();

  if (
    !name ||
    !email ||
    !age ||
    !gender ||
    !experience ||
    !dailyTrainingDuration ||
    !weeklyTrainingDays ||
    !currentProgram ||
    !nutrition ||
    !goals ||
    !message ||
    !phone 
  ) {
    return new Response(
      JSON.stringify({ message: 'Tüm alanlar gereklidir.' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Usongboy Danışmanlık Talebi - ${name}`,
    text: `İsim: ${name}\nE-posta: ${email}\nTelefon: ${phone}\nYaş: ${age}\nCinsiyet: ${gender}\nAntrenman Tecrübesi: ${experience} yıl\nGünlük Antrenman Süresi: ${dailyTrainingDuration} saat\nHaftalık Antrenman Günleri: ${weeklyTrainingDays} gün\nMevcut Program: ${currentProgram}\nBeslenme Bilgileri: ${nutrition}\nHedefler: ${goals}\nMesaj: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: 'Talebiniz başarıyla gönderildi!' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return new Response(
      JSON.stringify({
        message: 'Talep gönderilemedi.',
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
