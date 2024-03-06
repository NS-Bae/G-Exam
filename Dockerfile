FROM mysql:8.1

COPY g-exam-db-dump.sql /docker-entrypoint-initdb.d/

CMD ["mysqld"]