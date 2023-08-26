FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Synthic/Server/Synthic.Server.csproj", "Synthic/Server/"]
COPY ["Synthic/Client/Synthic.Client.csproj", "Synthic/Client/"]
COPY ["Synthic/Shared/Synthic.Shared.csproj", "Synthic/Shared/"]
RUN dotnet restore "Synthic/Server/Synthic.Server.csproj"
COPY . .
WORKDIR "/src/Synthic/Server"
RUN dotnet build "Synthic.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Synthic.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Synthic.Server.dll"]
