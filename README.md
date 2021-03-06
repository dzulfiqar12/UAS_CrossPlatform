# UAS Cross-Platform

Final project for Mobile Cross-Platform Programming.

Live version is hosted with Firebase Hosting at [https://ayam-bebek-73e5e.web.app/app/home](https://ayam-bebek-73e5e.web.app/app/home).

## Notes

- Firebase API keys and app configurations are meant to be public. See [this](https://stackoverflow.com/questions/52100690/should-i-hide-firebase-api-keys-into-backend-not-due-to-data-security-but-proje), [this](https://stackoverflow.com/questions/61600373/what-is-the-best-way-to-secure-firebase-api-keys-in-a-react-app-so-it-is-not-acc), and [this](https://medium.com/@devesu/how-to-secure-your-firebase-project-even-when-your-api-key-is-publicly-available-a462a2a58843).
- Do not forget to use a different database on development and on production.

## Requirements

For development:

- [Node.js 16+](https://nodejs.org/en/)
- [Ionic CLI](https://ionicframework.com/docs/cli)

Please use the latest version (16 for `node` and 8 for `npm`).

For production:

- [Firebase](https://firebase.google.com)

You need to set up Firebase Authentication, Firebase Cloud Storage, Firebase Firestore, and Firebase Hosting in order for this application to work properly in production scenarios. You may have to set up service accounts if you want the CI to be working.

## Quick Start

- For quick setup, you need to perform the following commands. Clone the repo first.

```bash
git clone https://github.com/dzulfiqar12/UAS_CrossPlatform.git
```

- Switch to this repository.

```bash
cd UAS_CrossPlatform
```

- Install all dependencies.

```bash
npm i
```

- Run the app. Feel free to use the already setup Firebase as you see fit.

```bash
ionic serve
```

## Development

For development from scratch, you need to do the following commands.

- Clone this repository.

```bash
git clone https://github.com/dzulfiqar12/UAS_CrossPlatform.git
```

- Switch to this repository.

```bash
cd UAS_CrossPlatform
```

- Install this repository.

```bash
npm i
```

- You may run database migration by typing the following command. Keep in mind that this will remove all of the data in the `menu` and `transactions` collections. You need a Linux machine in order to run this migration.

```bash
export USERNAME=...
export PASSWORD=...
npm run migrate
```

- Do not forget to set security rules for Firebase Firestore.

```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /menu/{item} {
      allow write: if request.auth != null;
      allow read;
    }

    match /transactions/{transaction} {
      allow create;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

- Do not forget to set security rules for Firebase Cloud Storage.

```bash
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow write: if request.auth != null;
      allow read;
    }
  }
}
```

- Ask the author for the credentials for the Firebase Authentication user in order to implement the login system. You may have to create one user if it does not exist yet.

- Run this application in development mode.

```bash
ionic serve
```

- Before committing code to the repository, please format, lint, and type-check.

```bash
npm run lint
```

- You may run this script to clean up.

```bash
npm run clean
```

## QR Code

- To generate QR code to represent the website and to auto-fill the table name, you have to change the `tableName` and `websiteURL` variables in `qr/index.ts` file. After you have changed it, run the following script.

```bash
npm run genqr
```

- The QR code will be placed in `qr/qrcode.png`. You have to run this multiple times and you have to edit the variables in order to fill the restaurant (if you're using this in a restaurant) with unique QRs with autofilled table names.
