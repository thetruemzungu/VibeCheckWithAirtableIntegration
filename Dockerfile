FROM node:12.18.1

WORKDIR /app

COPY ./ ./

RUN npm install airtable

CMD ["node", "./src/vibecheck.js"]