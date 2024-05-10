
# Wecan

>
> Link to live site : https://wecan-ten.vercel.app/
>

Wecan adalah web application yang membantu seseorang menjaga kondisi mental dirinya. Wecan memiliki tujuan untuk membantu user mengekspresikan hal apa yang sedang dialaminya dalam keseharian dengan memberikan saran kegiatan yang mendukung mental dan emosional mereka. Fitur - fitur Wecan mencakup

* Diary Creator
* Mood Manager
* Productive Activity Recommendations
* *Wellness* Point System
* User Statistic Recap

Semua fitur Wecan dibuat menggunakan pendekatan gamification untuk menciptakan pengalaman user yang menyenangkan.

Video demo dilihat pada [link berikut](https://www.youtube.com/watch?feature=shared&v=u8pJh1pp2PU)


## Dokumentasi

Project ini dikembangkan menggunakan tech stack :
- [React](https://react.dev/)
- [NodeJS](https://nodejs.org)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Typescript](https://www.typescriptlang.org/)

> Project ini dapat dijalankan secara lokal menggunakan database mongodb atlas dan google auth mandiri. Berikut cara melakukan installasi project Wecan.

Pada masing - masing folder `/` (root),  `/client` dan `/server`, kita perlu menginstall `node_modules`
```
npm i
```

Untuk mejalankan aplikasi kita memerlukan file `.env` pada `/client` dan `/server`. Format enviroment variable adalah seperti Berikut

* `/client`

```
VITE_GOOGLE_ID=
VITE_GOOGLE_SECRET=
VITE_BASE_URL="http://localhost:8000"
VITE_BASE_ENDPOINT="/api"
```
* `/server`
```
DATABASE_URL=
PORT=8000
DATABASE_USERNAME=
DATABASE_PASSWORD=
GOOGLE_ID=
GOOGLE_SECRET=
JWT_STRING=
```

> Detail installasi database (`DATABASE_URL` dan `DATABASE_USERNAME`) dengan Atlas dapat dilihat di [link berikut](https://www.mongodb.com/docs/atlas). Untuk installasi google auth (`GOOGLE_ID` dan `GOOGLE_SECRET`) dapat dilakukan melalui [google cloud](https://cloud.google.com)

> `JWT_SECRET` Dapat menggunakan string bebas, namun dapat dibuat secara otomatis dengan menjalankan kode berikut dalam terminal

```
node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
```

Untuk menjalankan aplikasi jalankan command berikut pada terminal di `/` root directory
```
npm run dev
```
Dengan menggunakan package [concurrently](https://www.npmjs.com/package/concurrently) kita dapat menjalankan node di server dan client secara bersamaan
## Authors

- [@Joseph Christian Yusmita](https://github.com/Specticall)
- [@Alicia Felisha](https://github.com/aliciafelishaa)
- [@Rafael Marvin](https://github.com/rafaelmarvin)

Made by ©BNCChampion

