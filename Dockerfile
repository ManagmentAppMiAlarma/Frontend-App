FROM node:19.2-alpine3.16
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "run", "dev"]