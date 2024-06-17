FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

# Copy the Common.csproj file to the working directory
COPY ./Common.csproj .

# Restore the dependencies for Common.csproj
RUN dotnet restore

# Copy the rest of the files to the working directory
COPY . .

# Publish the project
RUN dotnet publish -c Release -o out

# Create the Common image
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS common-image
WORKDIR /app

# Copy the published output from the build-env stage to the current stage
COPY --from=build-env /app/out .

ENTRYPOINT ["dotnet", "Common.dll"]

