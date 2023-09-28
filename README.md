# [Owly](https://owly.lol)

![image](https://user-images.githubusercontent.com/3089863/166172425-7ac5bf00-a42b-453a-98d6-4305e32146e9.png)

Owly is a open source anonymous URL shortner with:
1. No Tracking, just redirection.
2. More memorable URLs with help of Word Urls.
3. Browser based History.

## ShortUrl Features
With Owly, generated shorturl will have following characteristics:
1. Case insensitive, No more confusion of upper and lowercase.
2. Can open with Words. Eg: `owly.lol/ci4dsio` can also be opened with `owly.lol/car-is-4-down-street-in-out` , `owly.lol/cat-is-44-damn-inside-out` or any other such combinations.

## Stack
1. NextJS for API & Frontend
2. MongoDB for Store
3. Deployed on Vercel

## Setup
1. Git clone.
2. Npm install.
3. Copy `.env.local.example` to `.env.local` and provide MongoDb credentials.
4. Start with `npm run dev`

## TODO
- [ ] Update words.json file.
- [x] Add SEO & Meta
- [x] Clear History Button
- [ ] Option to customize links.
- [x] Honeypot and Hidden Captcha if needed

## Deployed URL:
1. owly.lol
1. owly-alpha.vercel.app

## License
MIT License
