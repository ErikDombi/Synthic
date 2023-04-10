# Build Synthic Blazor app
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-webasm
WORKDIR /src
COPY ["Synthic/Synthic.csproj", "Synthic/"]
RUN dotnet restore "Synthic/Synthic.csproj"
COPY . .
WORKDIR "/src/Synthic"

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Run npm install
RUN npm install

# Build and publish .NET app
RUN dotnet build "Synthic.csproj" -c Release -o /app/build

FROM build-webasm AS publish-webasm
RUN dotnet publish "Synthic.csproj" -c Release -o /app/publish

# Build Synthic API
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-api
WORKDIR /src
COPY ["Synthic.Api/Synthic.Api.csproj", "Synthic.Api/"]
RUN dotnet restore "Synthic.Api/Synthic.Api.csproj"
COPY . .
WORKDIR "/src/Synthic.Api"
RUN dotnet build "Synthic.Api.csproj" -c Release -o /app/build

FROM build-api AS publish-api
RUN dotnet publish "Synthic.Api.csproj" -c Release -o /app/publish

# Final stage with NGINX
FROM nginx:stable-alpine AS final
WORKDIR /app
COPY --from=publish-webasm /app/publish/wwwroot ./Synthic-Client/
COPY --from=publish-api /app/publish ./Synthic-API/

# Setup NGINX logging files
RUN touch /app/access.log
RUN touch /app/error.log

# Install .NET runtime
RUN apk add --no-cache icu-libs
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

# Install .NET Core runtime dependencies
RUN apk add --no-cache ca-certificates \
    krb5-libs \
    libgcc \
    libintl \
    libssl1.1 \
    libstdc++ \
    zlib

# Install .NET Core runtime
RUN apk add aspnetcore7-runtime

# Remove the default NGINX configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Add the custom NGINX configuration file
# COPY ./setup/certs/ /app/certs/
COPY ./setup/nginx.conf /etc/nginx/conf.d/default.conf.unsafe
RUN cat /etc/nginx/conf.d/default.conf.unsafe > /etc/nginx/conf.d/default.conf

# Expose the ports for HTTP and HTTPS
EXPOSE 80 443 5059

# Run .NET app and NGINX
CMD ["sh", "-c", "dotnet ./Synthic-API/Synthic.Api.dll & nginx -g 'daemon off;'"]