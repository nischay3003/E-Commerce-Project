FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# 👇 Install ALL dependencies, including devDependencies
RUN npm install

COPY . .

# 👇 Run using npm script that calls nodemon
CMD ["node", "index.js"]
