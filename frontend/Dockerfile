# Etapa 1: Construcción de la app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Nginx para servir la app
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser /var/www/app/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
