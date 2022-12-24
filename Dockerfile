FROM node:17.7.2

# create dir
RUN mkdir -p /home/qreepex/eazyautodelete

WORKDIR /home/qreepex/eazyautodelete

# copy bot
COPY . ./

# install dependencies
RUN npm install

# start bot
CMD ["node", "sharder"]