# UAS Cross-Platform

Final project for Mobile Cross-Platform Programming, developed for Ayam Bebek Pak Boss as a part of a study-case.

## Notes

- Firebase API keys and app configurations are meant to be public. See [this](https://stackoverflow.com/questions/52100690/should-i-hide-firebase-api-keys-into-backend-not-due-to-data-security-but-proje), [this](https://stackoverflow.com/questions/61600373/what-is-the-best-way-to-secure-firebase-api-keys-in-a-react-app-so-it-is-not-acc), and [this](https://medium.com/@devesu/how-to-secure-your-firebase-project-even-when-your-api-key-is-publicly-available-a462a2a58843).
- Do not forget to use a different database on development and on production.

## Requirements

- [Node.js 16+](https://nodejs.org/en/)
- [Ionic CLI](https://ionicframework.com/docs/cli)

Please use the latest version (16 for `node` and 8 for `npm`).

## Development

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

- You may run database migration by typing the following command. Keep in mind that this will remove all of the data in the `menu` and `transactions` collections.

```bash
npm run migrate
```

- Run this application in development mode.

```bash
ionic serve
```
