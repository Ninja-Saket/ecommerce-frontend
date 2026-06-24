# Stage 1: Build the React application
FROM node:20-alpine as build-stage

WORKDIR /app

# Build arguments for Vite environment variables
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID
ARG VITE_REGISTER_REDIRECT_URL
ARG VITE_FORGOT_PASSWORD_REDIRECT_URL
ARG VITE_APP_API
ARG VITE_APP_RAZORPAY_API_KEY

# Set them as environment variables for the build process
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
ENV VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
ENV VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID
ENV VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID
ENV VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID
ENV VITE_FIREBASE_MEASUREMENT_ID=$VITE_FIREBASE_MEASUREMENT_ID
ENV VITE_REGISTER_REDIRECT_URL=$VITE_REGISTER_REDIRECT_URL
ENV VITE_FORGOT_PASSWORD_REDIRECT_URL=$VITE_FORGOT_PASSWORD_REDIRECT_URL
ENV VITE_APP_API=$VITE_APP_API
ENV VITE_APP_RAZORPAY_API_KEY=$VITE_APP_RAZORPAY_API_KEY

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine as production-stage

# Copy the build output from the build stage to Nginx's html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration for SPA routing and API proxying
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
