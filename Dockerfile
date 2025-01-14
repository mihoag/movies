# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files and build
COPY . .
COPY .env .env
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a default Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
