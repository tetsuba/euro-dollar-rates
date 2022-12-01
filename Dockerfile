FROM node:16-alpine
USER node
WORKDIR /client
COPY client .
RUN npm ci
RUN npm run build

WORKDIR /server
COPY server .
RUN mv ../client/build build
RUN npm ci
CMD ["npm", "start"]

