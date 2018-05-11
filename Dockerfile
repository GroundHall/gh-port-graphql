FROM  nikolaik/python-nodejs
COPY . /var/www
RUN node -v
RUN cd /var/www; npm i yarn -g; yarn install; ls;
WORKDIR /var/www
RUN yarn add bcrypt
ENV SERVICE_PORT 80
EXPOSE ${SERVICE_PORT}
CMD yarn start