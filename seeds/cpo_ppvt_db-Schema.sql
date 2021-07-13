DROP DATABASE IF EXISTS cpo_ppvt_db;
CREATE database cpo_ppvt_db;

USE cpo_ppvt_db;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER NOT NULL auto_increment , 
  `username` VARCHAR(50) NOT NULL UNIQUE, 
  `email` VARCHAR(255) NOT NULL UNIQUE, 
  `password` VARCHAR(50) NOT NULL, 
  `created_at` DATETIME NOT NULL, 
  `updated_at` DATETIME NOT NULL, 
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS user_pets;
CREATE TABLE IF NOT EXISTS `user_pets` (
  `id` INTEGER NOT NULL auto_increment , 
  `petname` VARCHAR(255) NOT NULL, 
  `pet_license_no` TEXT, 
  `license_exp_date` DATE, 
  `breed` TEXT, 
  `dob` DATE, 
  `pet_photo` TEXT, 
  `pet_license_file` TEXT, 
  `date_created` DATE NOT NULL, 
  `user_id` INTEGER, 
  `created_at` DATETIME NOT NULL, 
  `updated_at` DATETIME NOT NULL, 
  PRIMARY KEY (`id`), 
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE);

DROP TABLE IF EXISTS pet_vaccines;
CREATE TABLE IF NOT EXISTS `pet_vaccines` (
  `id` INTEGER NOT NULL auto_increment , 
  `veterinarian` VARCHAR(255), 
  `vaccine_name` VARCHAR(255) NOT NULL, 
  `date_of_vaccine` DATE NOT NULL, 
  `vaccine_exp_date` DATE NOT NULL, 
  `vaccine_license_file` VARCHAR(255), 
  `user_id` INTEGER NOT NULL, 
  `pet_id` INTEGER NOT NULL, 
  `date_created` DATE NOT NULL, 
  `created_at` DATETIME NOT NULL, 
  `updated_at` DATETIME NOT NULL, 
  PRIMARY KEY (`id`), 
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE, 
  FOREIGN KEY (`pet_id`) REFERENCES `user_pets` (`id`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE);

-- ----------------------------------------------------------------------
-- Add 3 test USERS:
INSERT INTO `users` (
  `id`,`username`,`email`,`password`,`created_at`,`updated_at`) 
VALUES (
  1,"JohnD","john@idk.com","password1","2021-07-07","2021-07-07"
);
INSERT INTO `users` (
  `id`,`username`,`email`,`password`,`created_at`,`updated_at`) 
VALUES (
  2,"JaneD","jane@idk.com","password2","2021-07-07","2021-07-07"
);
INSERT INTO `users` (
  `id`,`username`,`email`,`password`,`created_at`,`updated_at`) 
VALUES (
  3,"JoeCool","joe@idk.com","password3","2021-07-07","2021-07-07"
);

-- With password encryption:

INSERT INTO `users` (
  `id`,`username`,`email`,`password`,`created_at`,`updated_at`) 
VALUES (
  1,"JohnD","john@idk.com","$2b$10$85Mb2GD2dE8iMI4Ljl/Ygeddd1PPkvyEx7Klzl4jIvIUF/4n731pC","2021-07-07","2021-07-07"
);
INSERT INTO `users` (
  `id`,`username`,`email`,`password`,`created_at`,`updated_at`) 
VALUES (
  2,"JaneD","jane@idk.com","$2b$10$IozOQmPJO/GgDLePhBkKbeZ.lnWIHb3X0OZ1oI4RGXNluNJswhqI6","2021-07-07","2021-07-07"
);
INSERT INTO `users` (
  `id`,`username`,`email`,`password`,`created_at`,`updated_at`) 
VALUES (
  3,"JoeCool","joe@idk.com","$2b$10$88v2evn5jMNCrDg2p3fBb.BC6euiJBhPJFin3.vNMbulKIvjdXwBO","2021-07-07","2021-07-07"
);

-- ----------------------------------------------------------------------
-- Add 3 test PETS for the 3 test user links:

INSERT INTO `user_pets` (
  `id`,`petname`,`pet_license_no`,`license_exp_date`,`breed`,`dob`,`pet_photo`,`pet_license_file`,`date_created`,`user_id`,`created_at`,`updated_at`) 
VALUES (
  1,"Puppino","12345","2021-08-01","Yellow Lab","2002-02-01","","","2021-07-03",1,"2021-07-03","2021-07-03"
);
INSERT INTO `user_pets` (
  `id`,`petname`,`pet_license_no`,`license_exp_date`,`breed`,`dob`,`pet_photo`,`pet_license_file`,`date_created`,`user_id`,`created_at`,`updated_at`) 
VALUES (
  2,"Shelby","895612","2022-05-15","Husky mix","2010-03-06","","","2021-07-03",2,"2021-07-03","2021-07-03"
);
INSERT INTO `user_pets` (
  `id`,`petname`,`pet_license_no`,`license_exp_date`,`breed`,`dob`,`pet_photo`,`pet_license_file`,`date_created`,`user_id`,`created_at`,`updated_at`) 
VALUES (
  3,"Rex","898563","2022-12-01","Black Labrador","2018-11-14","","","2021-07-03",3,"2021-07-03","2021-07-03"
);

-- ----------------------------------------------------------------------
-- Add 4 test VACCINES for the 3 test user/pet links:

INSERT INTO `pet_vaccines` (
  `id`,`veterinarian`,`vaccine_name`,`date_of_vaccine`,`vaccine_exp_date`,`vaccine_license_file`,`user_id`,`pet_id`,`date_created`,`created_at`,`updated_at`) 
VALUES (
  1,"Dr. Dolittle","Rabbies Vaccine","2018-08-01","2021-08-01","",1,1,"2021-07-03","2021-07-03","2021-07-03"
);
INSERT INTO `pet_vaccines` (
  `id`,`veterinarian`,`vaccine_name`,`date_of_vaccine`,`vaccine_exp_date`,`vaccine_license_file`,`user_id`,`pet_id`,`date_created`,`created_at`,`updated_at`) 
VALUES (
  2,"Dr. DoesItAll","Rabbies Vaccine","2020-05-15","2022-05-15","",2,2,"2021-07-03","2021-07-03","2021-07-03"
);
INSERT INTO `pet_vaccines` (
  `id`,`veterinarian`,`vaccine_name`,`date_of_vaccine`,`vaccine_exp_date`,`vaccine_license_file`,`user_id`,`pet_id`,`date_created`,`created_at`,`updated_at`) 
VALUES (
  3,"Dr. Bob","Rabbies Vaccine","2020-12-01","2023-12-01","",3,3,"2021-07-03","2021-07-03","2021-07-03"
);
INSERT INTO `pet_vaccines` (
  `id`,`veterinarian`,`vaccine_name`,`date_of_vaccine`,`vaccine_exp_date`,`vaccine_license_file`,`user_id`,`pet_id`,`date_created`,`created_at`,`updated_at`) 
VALUES (
  4,"Dr. Bob","Parvo Vaccine","2020-12-01","2022-12-01","",3,3,"2021-07-03","2021-07-03","2021-07-03"
);
