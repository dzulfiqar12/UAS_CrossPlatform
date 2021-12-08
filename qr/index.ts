import fs from 'fs';
import qr from 'qrcode';

async function main() {
  const tableName = '1A';
  const websiteURL = 'https://ayam-bebek-73e5e.web.app/app/home';

  try {
    const base64String = await qr.toDataURL(`${websiteURL}/${tableName}`);
    const base64Image = base64String.split(';base64').pop();

    fs.writeFileSync(`${__dirname}/qrcode.png`, base64Image, { encoding: 'base64' });
  } catch (err) {
    throw err;
  }
}

if (require.main === module) {
  main()
    .then(() => {
      console.log("QR code generated successfully and stored in 'qrcode.png'!");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
