# Use the official MySQL 8.1 image as the base image
FROM mysql:8.1

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=RooTUsEr!1020
ENV MYSQL_DATABASE=new_g-exam

# Expose the MySQL port
EXPOSE 3306

# Define a volume for persisting MySQL data
VOLUME /var/lib/mysql

# Specify the network
# Note: You might need to define the backend network if not done elsewhere in your Docker Compose setup
# NETWORKS should be defined in Docker Compose
# NETWORKS:
#   backend:
#     driver: bridge

# (Optional) Healthcheck for the container
HEALTHCHECK CMD ["mysqladmin", "ping", "-h", "localhost"]

# (Optional) Copy additional configuration files if needed
# COPY my-custom.cnf /etc/mysql/conf.d/
