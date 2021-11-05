FROM node:12-alpine
WORKDIR /dxf-serve
COPY ["package.json", "package-lock.json*", "./"]
RUN yarn install
COPY . .
CMD ["node", "index.js"]