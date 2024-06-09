FROM node:20.14.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src .
CMD ["npm", "start"]
# EXPOSE 3000