## Quick start

1. Clone this repository
2. `npm install` in the project root folder on local
3. `npm run dev` to start the studio and frontend locally
   - Your studio should be running on [http://localhost:3333](http://localhost:3333)
   - Your frontend should be running on [http://localhost:8000](http://localhost:8000)
4. `npm run build` to build to production locally

## Enable real-time content preview on development

1. Go to your [project’s API settings on manage.sanity.io](https://manage.sanity.io/projects/qhvu8ess/settings/api) and create a token with read rights.
2. Rename `.env.development.template` to `.env.development` and paste in the token: `SANITY_READ_TOKEN="yourTokenHere"`.
3. Restart the development server (`ctrl + C` and `npm run dev`).

If you want to turn off preview you can set `watchMode: false` in gatsby-config.js. If you just want to preview published changes you can set `overlayDrafts: false` in gatsby-config.js.

## Local development
You develop the templates in /template, and review your changes in /build.

1. Install dependencies with npm install in the **root folder**. This will install the template development tool that watches changes in the **/template** folder and output the template to **/build**.

2. Run **npm run dev** in root folder. This will build the template files to **/build**. This is how the code will look for those who install the project later.

3. Run **npm install** in **./build/web** and **sanity install** in **/build/studio** This will install the necessary dependencies for the Gatsby frontend and the Studio.

4. Run **npm run dev** in **./build/web** and **sanity start** in **/build/studio**. This will start the development servers for the Gatsby frontend and Sanity Studio.

## Deploy changes

Netlify automatically deploys new changes commited to master on GitHub. If you want to change deployment branch, do so in [build & deploy settings on Netlify](https://www.netlify.com/docs/continuous-deployment/#branches-deploys).