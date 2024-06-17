
# Stage 2: Build Users microservice
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS messenger-service-build
WORKDIR /app/Services/Messenger.Service/src
COPY Messenger.Catalog.Service.csproj .
RUN dotnet restore Messenger.Catalog.Service.csproj
COPY . ./
RUN dotnet build -c Release -o /app/build

# Stage 3: Create the final image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=messenger-service-build /app/build .
COPY --from=common-build /app/Common /app/Common
COPY --from=common-build /app/out .

ENTRYPOINT ["dotnet", "bin/Debug/net5.0/Messenger.Catalog.Service.dll"]