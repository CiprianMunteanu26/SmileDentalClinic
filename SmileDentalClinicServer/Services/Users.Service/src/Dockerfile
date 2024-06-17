FROM mcr.microsoft.com/dotnet/sdk:5.0 AS user-service-build
WORKDIR /app
COPY NuGet.Config .
COPY /packages/*.nupkg /app/packages/
COPY Users.Catalog.Service.csproj .
RUN dotnet restore --configfile NuGet.Config
COPY . .

WORKDIR /app
RUN dotnet publish -c Release -o /app/build

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=user-service-build /app/build .
ENTRYPOINT ["dotnet", "Users.Catalog.Service.dll"]=