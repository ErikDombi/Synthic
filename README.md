# Synthic

Synthic is a .NET Blazor application used to automate downloading music compilations from Youtube with an advanced metadata editor

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/products/docker-desktop)
- [OpenSSL](https://www.openssl.org/source)

## Getting Started

Follow these steps to clone the repository, build the Docker image, and run the application in a Docker container:

### 1. Clone the repository

Clone the repository using the following command:

```bash
git clone https://github.com/ErikDombi/Synthic.git
```

### 2. Change to the project directory

Navigate to the cloned repository:

```bash
cd Synthic
```

### 3. Build the Docker image

Build the Docker image using the following command:

```bash
docker build -t synthic .
```

This command will build a Docker image named `synthic` using the Dockerfile in the current directory.

### 4. Run the Docker container

Run the Docker container using the following command:

```bash
docker run -d --name synthic_container -p 80:80 -p 443:443 synthic
```

This command will run the Docker container in detached mode and map ports 80 and 443 from your host to the container.

### 5. Access the application

Open your browser and navigate to `http://localhost` to access the application.

## Stopping and Removing the Docker Container

To stop and remove the running Docker container, use the following command:

```bash
docker rm -f synthic_container
```