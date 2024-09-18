FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npm run build

CMD [ "npm", "run", "start:dev" ]