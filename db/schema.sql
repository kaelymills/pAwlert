CREATE DATABASE IF NOT EXISTS pAwlert;
USE pAwlert;

# table to authenticate users
DROP TABLE IF EXISTS users;

CREATE TABLE `pAwlert`.`users` (
  id int NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL);

