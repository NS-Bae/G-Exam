-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema new_g-exam
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema new_g-exam
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `new_g-exam` DEFAULT CHARACTER SET utf8 ;
USE `new_g-exam` ;

-- -----------------------------------------------------
-- Table `new_g-exam`.`school_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`school_list` (
  `school_name` VARCHAR(30) NOT NULL,
  `school_grade` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`school_name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`user_student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`user_student` (
  `id` VARCHAR(12) NOT NULL,
  `pw` VARCHAR(20) NOT NULL,
  `name` VARCHAR(5) NOT NULL,
  `grade` INT NOT NULL,
  `ready` TINYINT NOT NULL DEFAULT 0,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_school_list_idx` (`school_list_school_name` ASC) VISIBLE,
  CONSTRAINT `fk_users_school_list`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`major_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`major_list` (
  `major_name` VARCHAR(10) NOT NULL,
  `major_id` INT NOT NULL,
  PRIMARY KEY (`major_name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`user_teacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`user_teacher` (
  `id` VARCHAR(12) NOT NULL,
  `pw` VARCHAR(20) NOT NULL,
  `name` VARCHAR(5) NOT NULL,
  `ready` TINYINT NOT NULL DEFAULT 0,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_teacher_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  CONSTRAINT `fk_user_teacher_major_list1`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`eng_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`eng_category` (
  `category_name` VARCHAR(2) NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`category_name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`elementary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`elementary` (
  `word_id` INT NOT NULL,
  `word` VARCHAR(255) NOT NULL,
  `word_mean1` VARCHAR(255) NOT NULL,
  `word_mean2` VARCHAR(255) NULL,
  `word_mean3` VARCHAR(255) NULL,
  `word_mean4` VARCHAR(255) NULL,
  `eng_category_category_name` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`word_id`),
  INDEX `fk_elementary_eng_category1_idx` (`eng_category_category_name` ASC) VISIBLE,
  CONSTRAINT `fk_elementary_eng_category1`
    FOREIGN KEY (`eng_category_category_name`)
    REFERENCES `new_g-exam`.`eng_category` (`category_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`middle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`middle` (
  `word_id` INT NOT NULL,
  `word` VARCHAR(255) NOT NULL,
  `word_mean1` VARCHAR(255) NOT NULL,
  `word_mean2` VARCHAR(255) NULL,
  `word_mean3` VARCHAR(255) NULL,
  `word_mean4` VARCHAR(255) NULL,
  `eng_category_category_name` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`word_id`),
  INDEX `fk_elementary_eng_category1_idx` (`eng_category_category_name` ASC) VISIBLE,
  CONSTRAINT `fk_elementary_eng_category10`
    FOREIGN KEY (`eng_category_category_name`)
    REFERENCES `new_g-exam`.`eng_category` (`category_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`toeic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`toeic` (
  `word_id` INT NOT NULL,
  `word` VARCHAR(255) NOT NULL,
  `word_mean1` VARCHAR(255) NOT NULL,
  `word_mean2` VARCHAR(255) NULL,
  `word_mean3` VARCHAR(255) NULL,
  `word_mean4` VARCHAR(255) NULL,
  `eng_category_category_name` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`word_id`),
  INDEX `fk_elementary_eng_category1_idx` (`eng_category_category_name` ASC) VISIBLE,
  CONSTRAINT `fk_elementary_eng_category100`
    FOREIGN KEY (`eng_category_category_name`)
    REFERENCES `new_g-exam`.`eng_category` (`category_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`high`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`high` (
  `word_id` INT NOT NULL,
  `word` VARCHAR(255) NOT NULL,
  `word_mean1` VARCHAR(255) NOT NULL,
  `word_mean2` VARCHAR(255) NULL,
  `word_mean3` VARCHAR(255) NULL,
  `word_mean4` VARCHAR(255) NULL,
  `eng_category_category_name` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`word_id`),
  INDEX `fk_elementary_eng_category1_idx` (`eng_category_category_name` ASC) VISIBLE,
  CONSTRAINT `fk_elementary_eng_category101`
    FOREIGN KEY (`eng_category_category_name`)
    REFERENCES `new_g-exam`.`eng_category` (`category_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`word_record`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`word_record` (
  `word_record_id` INT NOT NULL,
  `user_student_id` VARCHAR(12) NOT NULL,
  `exam_info` VARCHAR(255) NOT NULL,
  `score` INT NULL,
  `record_info` TEXT NOT NULL,
  PRIMARY KEY (`word_record_id`, `user_student_id`),
  INDEX `fk_word_record_user_student1_idx` (`user_student_id` ASC) VISIBLE,
  CONSTRAINT `fk_word_record_user_student1`
    FOREIGN KEY (`user_student_id`)
    REFERENCES `new_g-exam`.`user_student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`exam_record`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`exam_record` (
  `record_id` INT NOT NULL,
  `exam_info` VARCHAR(255) NOT NULL,
  `user_student_id` VARCHAR(12) NOT NULL,
  `record_info` TEXT NOT NULL,
  `score` INT NOT NULL,
  PRIMARY KEY (`record_id`, `user_student_id`),
  INDEX `fk_exam_record_user_student1_idx` (`user_student_id` ASC) VISIBLE,
  CONSTRAINT `fk_exam_record_user_student1`
    FOREIGN KEY (`user_student_id`)
    REFERENCES `new_g-exam`.`user_student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`korean`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`korean` (
  `exam_id` INT NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL,
  `image` TEXT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL,
  `choice2` VARCHAR(255) NULL,
  `choice3` VARCHAR(255) NULL,
  `choice4` VARCHAR(255) NULL,
  `choice5` VARCHAR(255) NULL,
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  PRIMARY KEY (`exam_id`),
  CONSTRAINT `fk_korean_major_list1`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_korean_school_list1`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`social`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`social` (
  `exam_id` INT NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL,
  `image` TEXT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL,
  `choice2` VARCHAR(255) NULL,
  `choice3` VARCHAR(255) NULL,
  `choice4` VARCHAR(255) NULL,
  `choice5` VARCHAR(255) NULL,
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  PRIMARY KEY (`exam_id`),
  CONSTRAINT `fk_korean_major_list11`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_korean_school_list11`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`english`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`english` (
  `exam_id` INT NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL,
  `image` TEXT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL,
  `choice2` VARCHAR(255) NULL,
  `choice3` VARCHAR(255) NULL,
  `choice4` VARCHAR(255) NULL,
  `choice5` VARCHAR(255) NULL,
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  PRIMARY KEY (`exam_id`),
  CONSTRAINT `fk_korean_major_list12`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_korean_school_list12`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`math`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`math` (
  `exam_id` INT NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL,
  `image` TEXT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL,
  `choice2` VARCHAR(255) NULL,
  `choice3` VARCHAR(255) NULL,
  `choice4` VARCHAR(255) NULL,
  `choice5` VARCHAR(255) NULL,
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  PRIMARY KEY (`exam_id`),
  CONSTRAINT `fk_korean_major_list13`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_korean_school_list13`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`science`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`science` (
  `exam_id` INT NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL,
  `image` TEXT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL,
  `choice2` VARCHAR(255) NULL,
  `choice3` VARCHAR(255) NULL,
  `choice4` VARCHAR(255) NULL,
  `choice5` VARCHAR(255) NULL,
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  PRIMARY KEY (`exam_id`),
  CONSTRAINT `fk_korean_major_list14`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_korean_school_list14`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `new_g-exam`.`etc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`etc` (
  `exam_id` INT NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL,
  `image` TEXT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL,
  `choice2` VARCHAR(255) NULL,
  `choice3` VARCHAR(255) NULL,
  `choice4` VARCHAR(255) NULL,
  `choice5` VARCHAR(255) NULL,
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  PRIMARY KEY (`exam_id`),
  CONSTRAINT `fk_korean_major_list140`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_korean_school_list140`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `new_g-exam` ;

-- -----------------------------------------------------
-- Placeholder table for view `new_g-exam`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`user` (`id` INT, `pw` INT);

-- -----------------------------------------------------
-- View `new_g-exam`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `new_g-exam`.`user`;
USE `new_g-exam`;
CREATE  OR REPLACE VIEW `user` AS
select a.id, a.pw, a.`id`, b.id, b.pw
from user_student as a, user_teacher as b;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
