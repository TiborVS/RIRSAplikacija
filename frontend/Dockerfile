FROM node:22
WORKDIR /server
COPY server/package.json .
COPY server/server.js .
COPY server/dist ./dist
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]
