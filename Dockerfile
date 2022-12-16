FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --force

# Bundle app source
COPY . .

RUN npm run build
RUN npm install -g serve

EXPOSE 8080
CMD serve -s build