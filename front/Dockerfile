FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
ARG REACT_APP_SERVER_DOMAIN=/api
ENV REACT_APP_SERVER_DOMAIN=$REACT_APP_SERVER_DOMAIN
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
RUN npm run build

FROM nginx:1.25-alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
