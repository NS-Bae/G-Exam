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
CREATE SCHEMA IF NOT EXISTS `new_g-exam` DEFAULT CHARACTER SET utf8mb3 ;
USE `new_g-exam` ;

-- -----------------------------------------------------
-- Table `new_g-exam`.`eng_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`eng_category` (
  `category_name` VARCHAR(255) NOT NULL,
  `category_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`category_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`eng_word_elementary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`eng_word_elementary` (
  `word_id` VARCHAR(255) NOT NULL,
  `word` VARCHAR(255) NOT NULL,
  `word_mean1` VARCHAR(255) NOT NULL,
  `word_mean2` VARCHAR(255) NULL DEFAULT NULL,
  `word_mean3` VARCHAR(255) NULL DEFAULT NULL,
  `word_mean4` VARCHAR(255) NULL DEFAULT NULL,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`word_id`),
  INDEX `fk_elementary_eng_category1` (`category_name` ASC) VISIBLE,
  CONSTRAINT `fk_elementary_eng_category1`
    FOREIGN KEY (`category_name`)
    REFERENCES `new_g-exam`.`eng_category` (`category_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`eng_word_high`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`eng_word_high` (
  `word_id` VARCHAR(255) NOT NULL,
  `word` VARCHAR(255) NOT NULL,
  `word_mean1` VARCHAR(255) NOT NULL,
  `word_mean2` VARCHAR(255) NULL DEFAULT NULL,
  `word_mean3` VARCHAR(255) NULL DEFAULT NULL,
  `word_mean4` VARCHAR(255) NULL DEFAULT NULL,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`word_id`),
  INDEX `fk_elementary_eng_category101` (`category_name` ASC) VISIBLE,
  CONSTRAINT `fk_elementary_eng_category101`
    FOREIGN KEY (`category_name`)
    REFERENCES `new_g-exam`.`eng_category` (`category_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`eng_word_middle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`eng_word_middle` (
  `word_id` VARCHAR(255) NOT NULL,
  `word` VARCHAR(255) NOT NULL,
  `word_mean1` VARCHAR(255) NOT NULL,
  `word_mean2` VARCHAR(255) NULL DEFAULT NULL,
  `word_mean3` VARCHAR(255) NULL DEFAULT NULL,
  `word_mean4` VARCHAR(255) NULL DEFAULT NULL,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`word_id`),
  INDEX `fk_elementary_eng_category10` (`category_name` ASC) VISIBLE,
  CONSTRAINT `fk_elementary_eng_category10`
    FOREIGN KEY (`category_name`)
    REFERENCES `new_g-exam`.`eng_category` (`category_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`eng_word_toeic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`eng_word_toeic` (
  `word_id` VARCHAR(255) NOT NULL,
  `word` VARCHAR(255) NOT NULL,
  `word_mean1` VARCHAR(255) NOT NULL,
  `word_mean2` VARCHAR(255) NULL DEFAULT NULL,
  `word_mean3` VARCHAR(255) NULL DEFAULT NULL,
  `word_mean4` VARCHAR(255) NULL DEFAULT NULL,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`word_id`),
  INDEX `fk_elementary_eng_category100` (`category_name` ASC) VISIBLE,
  CONSTRAINT `fk_elementary_eng_category100`
    FOREIGN KEY (`category_name`)
    REFERENCES `new_g-exam`.`eng_category` (`category_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`major_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`major_list` (
  `major_name` VARCHAR(10) NOT NULL,
  `major_id` INT NOT NULL,
  PRIMARY KEY (`major_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`school_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`school_list` (
  `school_name` VARCHAR(30) NOT NULL,
  `school_grade` VARCHAR(2) NOT NULL,
  PRIMARY KEY (`school_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`pre_exam_etc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`pre_exam_etc` (
  `exam_id` VARCHAR(255) NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list140`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list140`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`user_student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`user_student` (
  `id` VARCHAR(12) NOT NULL,
  `pw` VARCHAR(20) NOT NULL,
  `name` VARCHAR(5) NOT NULL,
  `grade` INT NOT NULL,
  `ready` TINYINT NOT NULL DEFAULT '0',
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `user_type` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_school_list_idx` (`school_list_school_name` ASC) VISIBLE,
  CONSTRAINT `fk_users_school_list`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


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
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`pre_exam_english`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`pre_exam_english` (
  `exam_id` VARCHAR(255) NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list12`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list12`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`pre_exam_korean`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`pre_exam_korean` (
  `exam_id` VARCHAR(255) NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list1`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list1`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`pre_exam_math`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`pre_exam_math` (
  `exam_id` VARCHAR(255) NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list13`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list13`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`pre_exam_science`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`pre_exam_science` (
  `exam_id` VARCHAR(255) NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list14`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list14`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`pre_exam_social`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`pre_exam_social` (
  `exam_id` VARCHAR(255) NOT NULL,
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `school_list_school_name` VARCHAR(30) NOT NULL,
  `semester` VARCHAR(45) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  INDEX `fk_korean_school_list1_idx` (`school_list_school_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list11`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list11`
    FOREIGN KEY (`school_list_school_name`)
    REFERENCES `new_g-exam`.`school_list` (`school_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`user_teacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`user_teacher` (
  `id` VARCHAR(12) NOT NULL,
  `pw` VARCHAR(20) NOT NULL,
  `name` VARCHAR(5) NOT NULL,
  `ready` TINYINT NOT NULL DEFAULT '0',
  `major_list_major_name` VARCHAR(10) NOT NULL,
  `user_type` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_teacher_major_list1_idx` (`major_list_major_name` ASC) VISIBLE,
  CONSTRAINT `fk_user_teacher_major_list1`
    FOREIGN KEY (`major_list_major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`word_record`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`word_record` (
  `word_record_id` INT NOT NULL,
  `user_student_id` VARCHAR(12) NOT NULL,
  `exam_info` VARCHAR(255) NOT NULL,
  `score` INT NULL DEFAULT NULL,
  `record_info` TEXT NOT NULL,
  PRIMARY KEY (`word_record_id`, `user_student_id`),
  INDEX `fk_word_record_user_student1_idx` (`user_student_id` ASC) VISIBLE,
  CONSTRAINT `fk_word_record_user_student1`
    FOREIGN KEY (`user_student_id`)
    REFERENCES `new_g-exam`.`user_student` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`classification_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`classification_list` (
  `classification_name` VARCHAR(255) NOT NULL,
  `classification_id` INT NOT NULL,
  PRIMARY KEY (`classification_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`workbook_korean`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`workbook_korean` (
  `exam_id` VARCHAR(255) NOT NULL,
  `classification_name` VARCHAR(255) NOT NULL,
  `major_name` VARCHAR(10) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_name` ASC) VISIBLE,
  INDEX `fk_pre_exam_korean_copy1_classification_list1_idx` (`classification_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list10`
    FOREIGN KEY (`major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_pre_exam_korean_copy1_classification_list1`
    FOREIGN KEY (`classification_name`)
    REFERENCES `new_g-exam`.`classification_list` (`classification_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`workbook_english`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`workbook_english` (
  `exam_id` VARCHAR(255) NOT NULL,
  `classification_name` VARCHAR(255) NOT NULL,
  `major_name` VARCHAR(10) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_name` ASC) VISIBLE,
  INDEX `fk_pre_exam_korean_copy1_classification_list1_idx` (`classification_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list100`
    FOREIGN KEY (`major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_pre_exam_korean_copy1_classification_list10`
    FOREIGN KEY (`classification_name`)
    REFERENCES `new_g-exam`.`classification_list` (`classification_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`workbook_social`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`workbook_social` (
  `exam_id` VARCHAR(255) NOT NULL,
  `classification_name` VARCHAR(255) NOT NULL,
  `major_name` VARCHAR(10) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_name` ASC) VISIBLE,
  INDEX `fk_pre_exam_korean_copy1_classification_list1_idx` (`classification_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list1000`
    FOREIGN KEY (`major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_pre_exam_korean_copy1_classification_list100`
    FOREIGN KEY (`classification_name`)
    REFERENCES `new_g-exam`.`classification_list` (`classification_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`workbook_math`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`workbook_math` (
  `exam_id` VARCHAR(255) NOT NULL,
  `classification_name` VARCHAR(255) NOT NULL,
  `major_name` VARCHAR(10) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_name` ASC) VISIBLE,
  INDEX `fk_pre_exam_korean_copy1_classification_list1_idx` (`classification_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list101`
    FOREIGN KEY (`major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_pre_exam_korean_copy1_classification_list11`
    FOREIGN KEY (`classification_name`)
    REFERENCES `new_g-exam`.`classification_list` (`classification_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`workbook_science`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`workbook_science` (
  `exam_id` VARCHAR(255) NOT NULL,
  `classification_name` VARCHAR(255) NOT NULL,
  `major_name` VARCHAR(10) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_name` ASC) VISIBLE,
  INDEX `fk_pre_exam_korean_copy1_classification_list1_idx` (`classification_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list1010`
    FOREIGN KEY (`major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_pre_exam_korean_copy1_classification_list110`
    FOREIGN KEY (`classification_name`)
    REFERENCES `new_g-exam`.`classification_list` (`classification_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `new_g-exam`.`workbook_etc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`workbook_etc` (
  `exam_id` VARCHAR(255) NOT NULL,
  `classification_name` VARCHAR(255) NOT NULL,
  `major_name` VARCHAR(10) NOT NULL,
  `type` VARCHAR(3) NOT NULL,
  `paragraph` LONGTEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  `question` VARCHAR(255) NOT NULL,
  `choice1` VARCHAR(255) NULL DEFAULT NULL,
  `choice2` VARCHAR(255) NULL DEFAULT NULL,
  `choice3` VARCHAR(255) NULL DEFAULT NULL,
  `choice4` VARCHAR(255) NULL DEFAULT NULL,
  `choice5` VARCHAR(255) NULL DEFAULT NULL,
  `answer` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  INDEX `fk_korean_major_list1_idx` (`major_name` ASC) VISIBLE,
  INDEX `fk_pre_exam_korean_copy1_classification_list1_idx` (`classification_name` ASC) VISIBLE,
  CONSTRAINT `fk_korean_major_list10100`
    FOREIGN KEY (`major_name`)
    REFERENCES `new_g-exam`.`major_list` (`major_name`),
  CONSTRAINT `fk_pre_exam_korean_copy1_classification_list1100`
    FOREIGN KEY (`classification_name`)
    REFERENCES `new_g-exam`.`classification_list` (`classification_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

USE `new_g-exam` ;

-- -----------------------------------------------------
-- Placeholder table for view `new_g-exam`.`total_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new_g-exam`.`total_user` (`id` INT, `pw` INT, `name` INT, `ready` INT, `user_type` INT);

-- -----------------------------------------------------
-- View `new_g-exam`.`total_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `new_g-exam`.`total_user`;
USE `new_g-exam`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `new_g-exam`.`total_user` AS select `new_g-exam`.`user_student`.`id` AS `id`,`new_g-exam`.`user_student`.`pw` AS `pw`,`new_g-exam`.`user_student`.`name` AS `name`,`new_g-exam`.`user_student`.`ready` AS `ready`,`new_g-exam`.`user_student`.`user_type` AS `user_type` from `new_g-exam`.`user_student` union select `new_g-exam`.`user_teacher`.`id` AS `id`,`new_g-exam`.`user_teacher`.`pw` AS `pw`,`new_g-exam`.`user_teacher`.`name` AS `name`,`new_g-exam`.`user_teacher`.`ready` AS `ready`,`new_g-exam`.`user_teacher`.`user_type` AS `user_type` from `new_g-exam`.`user_teacher`;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
