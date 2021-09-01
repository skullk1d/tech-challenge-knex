FROM node:14

WORKDIR /service/
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./

EXPOSE 3000

CMD yarn start:cold
