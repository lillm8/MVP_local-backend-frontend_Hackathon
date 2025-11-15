#!/bin/bash

# Docker Desktop helper script for Iris Frontend

echo "🌿 Iris Frontend - Docker Desktop Helper"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Docker is not running. Please start Docker Desktop first.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Docker is running${NC}"
}

# Function to build image
build_image() {
    echo -e "${BLUE}🔨 Building Docker image...${NC}"
    docker build -f Dockerfile.desktop -t iris-frontend:latest .
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Image built successfully${NC}"
        echo -e "${YELLOW}📋 You can now see the image in Docker Desktop → Images${NC}"
    else
        echo -e "${RED}❌ Build failed${NC}"
        exit 1
    fi
}

# Function to run with docker compose
run_compose() {
    echo -e "${BLUE}🚀 Starting with Docker Compose...${NC}"
    docker compose -f docker-compose.desktop.yml up --build -d
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Container started successfully${NC}"
        echo -e "${YELLOW}🌐 Application available at: http://localhost:3000${NC}"
        echo -e "${YELLOW}🏥 Health check: http://localhost:3000/api/health${NC}"
        echo -e "${YELLOW}📋 View in Docker Desktop → Containers${NC}"
    else
        echo -e "${RED}❌ Failed to start container${NC}"
        exit 1
    fi
}

# Function to stop containers
stop_containers() {
    echo -e "${BLUE}🛑 Stopping containers...${NC}"
    docker compose down
    echo -e "${GREEN}✅ Containers stopped${NC}"
}

# Function to show logs
show_logs() {
    echo -e "${BLUE}📋 Showing container logs...${NC}"
    docker compose logs -f
}

# Function to clean up
cleanup() {
    echo -e "${BLUE}🧹 Cleaning up...${NC}"
    docker compose down --volumes --rmi all
    docker system prune -f
    echo -e "${GREEN}✅ Cleanup complete${NC}"
}

# Function to show status
show_status() {
    echo -e "${BLUE}📊 Container Status:${NC}"
    docker compose ps
    
    echo -e "\n${BLUE}📊 Image Status:${NC}"
    docker images | grep iris-frontend
    
    echo -e "\n${BLUE}🌐 Application Status:${NC}"
    if curl -s http://localhost:3000/api/health > /dev/null; then
        echo -e "${GREEN}✅ Application is healthy${NC}"
    else
        echo -e "${RED}❌ Application is not responding${NC}"
    fi
}

# Function to show help
show_help() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  build     - Build Docker image"
    echo "  run       - Run with Docker Compose (recommended)"
    echo "  stop      - Stop containers"
    echo "  logs      - Show container logs"
    echo "  status    - Show container and application status"
    echo "  clean     - Clean up everything"
    echo "  help      - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 run    # Start the application"
    echo "  $0 logs   # View logs"
    echo "  $0 status # Check status"
}

# Main script logic
check_docker

case "${1:-run}" in
    build)
        build_image
        ;;
    run)
        run_compose
        ;;
    stop)
        stop_containers
        ;;
    logs)
        show_logs
        ;;
    status)
        show_status
        ;;
    clean)
        cleanup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}Unknown command: $1${NC}"
        show_help
        exit 1
        ;;
esac
