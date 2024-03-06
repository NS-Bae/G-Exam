-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: new_g-exam
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `classification_list`
--

DROP TABLE IF EXISTS `classification_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classification_list` (
  `classification_name` varchar(255) NOT NULL,
  `workbook_count` int NOT NULL,
  `major_name` varchar(10) NOT NULL,
  PRIMARY KEY (`classification_name`),
  KEY `fk_classification_list_major_list1_idx` (`major_name`),
  CONSTRAINT `fk_classification_list_major_list1` FOREIGN KEY (`major_name`) REFERENCES `major_list` (`major_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classification_list`
--

LOCK TABLES `classification_list` WRITE;
/*!40000 ALTER TABLE `classification_list` DISABLE KEYS */;
INSERT INTO `classification_list` VALUES ('援?뼱_2024_?섎뒫_援?뼱_??섑삎',0,'援?뼱'),('援?뼱_怨듯넻_遺?뺥몴??,0,'援?뼱'),('?곸뼱_test1',0,'?곸뼱');
/*!40000 ALTER TABLE `classification_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_record`
--

DROP TABLE IF EXISTS `exam_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_record` (
  `user_student_id` varchar(12) NOT NULL,
  `exam_info` varchar(255) NOT NULL,
  `score` int NOT NULL,
  `record_info` text NOT NULL,
  PRIMARY KEY (`user_student_id`,`exam_info`),
  KEY `fk_exam_record_user_student1_idx` (`user_student_id`),
  CONSTRAINT `fk_exam_record_user_student1` FOREIGN KEY (`user_student_id`) REFERENCES `user_student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_record`
--

LOCK TABLES `exam_record` WRITE;
/*!40000 ALTER TABLE `exam_record` DISABLE KEYS */;
INSERT INTO `exam_record` VALUES ('kanin','留덉뒪?고븰??援?뼱_24-02-27-23-26-28',0,'..?쒗뿕寃곌낵 ?곸꽭?뺣낫留덉뒪?고븰??援?뼱_24-02-27-23-26-28.txt'),('kanin','留덉뒪?고븰??援?뼱_24-02-27-23-47-27',0,'C:\\Users\\USER\\G-Exam\\?쒗뿕寃곌낵_?곸꽭?뺣낫\\留덉뒪?고븰??援?뼱_24-02-27-23-47-27.txt'),('kanin','留덉뒪?고븰??援?뼱_24-02-29-22-09-06',0,'C:\\Users\\USER\\G-Exam\\?쒗뿕寃곌낵_?곸꽭?뺣낫\\留덉뒪?고븰??援?뼱_24-02-29-22-09-06.txt'),('kanin','留덉뒪?고븰??援?뼱_24-02-29-22-14-42',40,'C:\\Users\\USER\\G-Exam\\?쒗뿕寃곌낵_?곸꽭?뺣낫\\留덉뒪?고븰??援?뼱_24-02-29-22-14-42.txt'),('kanin','留덉뒪?고븰??援?뼱_24-02-29-22-24-36',0,'C:\\Users\\USER\\G-Exam\\?쒗뿕寃곌낵_?곸꽭?뺣낫\\留덉뒪?고븰??援?뼱_24-02-29-22-24-36.txt'),('kanin','留덉뒪?고븰??援?뼱_24-02-29-22-25-46',50,'C:\\Users\\USER\\G-Exam\\?쒗뿕寃곌낵_?곸꽭?뺣낫\\留덉뒪?고븰??援?뼱_24-02-29-22-25-46.txt'),('kanin','留덉뒪?고븰??援?뼱_24-02-29-22-27-30',50,'C:\\Users\\USER\\G-Exam\\?쒗뿕寃곌낵_?곸꽭?뺣낫\\留덉뒪?고븰??援?뼱_24-02-29-22-27-30.txt'),('kanin','留덉뒪?고븰??援?뼱_24-02-29-22-30-36',29,'C:\\Users\\USER\\G-Exam\\?쒗뿕寃곌낵_?곸꽭?뺣낫\\留덉뒪?고븰??援?뼱_24-02-29-22-30-36.txt'),('kanin','留덉뒪?고븰??援?뼱_24-02-29-22-44-22',60,'C:\\Users\\USER\\G-Exam\\?쒗뿕寃곌낵_?곸꽭?뺣낫\\留덉뒪?고븰??援?뼱_24-02-29-22-44-22.txt'),('kanin','留덉뒪?고븰??援?뼱_24-02-29-22-49-02',0,'C:\\Users\\USER\\G-Exam\\?쒗뿕寃곌낵_?곸꽭?뺣낫\\留덉뒪?고븰??援?뼱_24-02-29-22-49-02.txt');
/*!40000 ALTER TABLE `exam_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_word_record`
--

DROP TABLE IF EXISTS `exam_word_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_word_record` (
  `user_student_id` varchar(12) NOT NULL,
  `exam_info` varchar(255) NOT NULL,
  `score` int DEFAULT NULL,
  `record_info` text NOT NULL,
  PRIMARY KEY (`user_student_id`,`exam_info`),
  KEY `fk_word_record_user_student1_idx` (`user_student_id`),
  CONSTRAINT `fk_word_record_user_student1` FOREIGN KEY (`user_student_id`) REFERENCES `user_student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_word_record`
--

LOCK TABLES `exam_word_record` WRITE;
/*!40000 ALTER TABLE `exam_word_record` DISABLE KEYS */;
INSERT INTO `exam_word_record` VALUES ('kanin','留덉뒪?고븰???쒕Ц_24-02-27-23-29-23',20,'..?쒗뿕寃곌낵_?곸꽭?뺣낫留덉뒪?고븰???쒕Ц_24-02-27-23-29-23.txt'),('kanin','留덉뒪?고븰???쒕Ц_24-02-27-23-31-04',0,'..?쒗뿕寃곌낵_?곸꽭?뺣낫留덉뒪?고븰???쒕Ц_24-02-27-23-31-04.txt'),('kanin','留덉뒪?고븰???쒕Ц_24-02-27-23-38-01',0,'C:UsersUSERG-Exam?쒗뿕寃곌낵_?곸꽭?뺣낫留덉뒪?고븰???쒕Ц_24-02-27-23-38-01.txt'),('kanin','留덉뒪?고븰???쒕Ц_24-02-27-23-39-39',0,'C:UsersUSERG-Exam?쒗뿕寃곌낵_?곸꽭?뺣낫留덉뒪?고븰???쒕Ц_24-02-27-23-39-39.txt');
/*!40000 ALTER TABLE `exam_word_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major_list`
--

DROP TABLE IF EXISTS `major_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `major_list` (
  `major_name` varchar(10) NOT NULL,
  `major_id` int NOT NULL,
  PRIMARY KEY (`major_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major_list`
--

LOCK TABLES `major_list` WRITE;
/*!40000 ALTER TABLE `major_list` DISABLE KEYS */;
INSERT INTO `major_list` VALUES ('怨쇳븰',5),('援?뼱',1),('湲고?',6),('?ы쉶',4),('?섑븰',3),('?곸뼱',2);
/*!40000 ALTER TABLE `major_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pre_exam_classification_list`
--

DROP TABLE IF EXISTS `pre_exam_classification_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pre_exam_classification_list` (
  `classification_name` varchar(255) NOT NULL,
  `workbook_count` int NOT NULL,
  `major_name` varchar(10) NOT NULL,
  PRIMARY KEY (`classification_name`),
  KEY `fk_classification_list_major_list1_idx` (`major_name`),
  CONSTRAINT `fk_classification_list_major_list10` FOREIGN KEY (`major_name`) REFERENCES `major_list` (`major_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pre_exam_classification_list`
--

LOCK TABLES `pre_exam_classification_list` WRITE;
/*!40000 ALTER TABLE `pre_exam_classification_list` DISABLE KEYS */;
INSERT INTO `pre_exam_classification_list` VALUES ('2012_援?썝怨좊벑?숆탳_援?뼱_1?숇뀈_1?숆린_以묎컙怨좎궗',0,'援?뼱'),('2012_異⑹＜?덉꽦?ъ옄以묓븰援?援?뼱_1?숇뀈_1?숆린_以묎컙怨좎궗',0,'援?뼱');
/*!40000 ALTER TABLE `pre_exam_classification_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pre_exam_english`
--

DROP TABLE IF EXISTS `pre_exam_english`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pre_exam_english` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `major_name` varchar(10) NOT NULL,
  `school_name` varchar(30) NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_korean_major_list1_idx` (`major_name`),
  KEY `fk_korean_school_list1_idx` (`school_name`),
  KEY `fk_pre_exam_korean_pre_exam_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_korean_major_list10` FOREIGN KEY (`major_name`) REFERENCES `major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list10` FOREIGN KEY (`school_name`) REFERENCES `school_list` (`school_name`),
  CONSTRAINT `fk_pre_exam_korean_pre_exam_classification_list10` FOREIGN KEY (`classification_name`) REFERENCES `pre_exam_classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pre_exam_english`
--

LOCK TABLES `pre_exam_english` WRITE;
/*!40000 ALTER TABLE `pre_exam_english` DISABLE KEYS */;
/*!40000 ALTER TABLE `pre_exam_english` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pre_exam_etc`
--

DROP TABLE IF EXISTS `pre_exam_etc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pre_exam_etc` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `major_name` varchar(10) NOT NULL,
  `school_name` varchar(30) NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_korean_major_list1_idx` (`major_name`),
  KEY `fk_korean_school_list1_idx` (`school_name`),
  KEY `fk_pre_exam_korean_pre_exam_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_korean_major_list14` FOREIGN KEY (`major_name`) REFERENCES `major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list14` FOREIGN KEY (`school_name`) REFERENCES `school_list` (`school_name`),
  CONSTRAINT `fk_pre_exam_korean_pre_exam_classification_list14` FOREIGN KEY (`classification_name`) REFERENCES `pre_exam_classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pre_exam_etc`
--

LOCK TABLES `pre_exam_etc` WRITE;
/*!40000 ALTER TABLE `pre_exam_etc` DISABLE KEYS */;
/*!40000 ALTER TABLE `pre_exam_etc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pre_exam_korean`
--

DROP TABLE IF EXISTS `pre_exam_korean`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pre_exam_korean` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `major_name` varchar(10) NOT NULL,
  `school_name` varchar(30) NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_korean_major_list1_idx` (`major_name`),
  KEY `fk_korean_school_list1_idx` (`school_name`),
  KEY `fk_pre_exam_korean_pre_exam_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_korean_major_list1` FOREIGN KEY (`major_name`) REFERENCES `major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list1` FOREIGN KEY (`school_name`) REFERENCES `school_list` (`school_name`),
  CONSTRAINT `fk_pre_exam_korean_pre_exam_classification_list1` FOREIGN KEY (`classification_name`) REFERENCES `pre_exam_classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pre_exam_korean`
--

LOCK TABLES `pre_exam_korean` WRITE;
/*!40000 ALTER TABLE `pre_exam_korean` DISABLE KEYS */;
INSERT INTO `pre_exam_korean` VALUES ('2012_援?썝怨좊벑?숆탳_援?뼱_1?숇뀈_1?숆린_以묎컙怨좎궗',1,'援?뼱','援?썝怨좊벑?숆탳','媛앷???,'??,'','??,'鍮?,'??,'??,'??,'??,'5'),('2012_援?썝怨좊벑?숆탳_援?뼱_1?숇뀈_1?숆린_以묎컙怨좎궗',2,'援?뼱','援?썝怨좊벑?숆탳','媛앷???,'q','','q','q','q','q','q','q','111111111111'),('2012_援?썝怨좊벑?숆탳_援?뼱_1?숇뀈_1?숆린_以묎컙怨좎궗',3,'援?뼱','援?썝怨좊벑?숆탳','媛앷???,'??,'','??,'??,'??,'??,'??,'??,'12345'),('2012_援?썝怨좊벑?숆탳_援?뼱_1?숇뀈_1?숆린_以묎컙怨좎궗',4,'援?뼱','援?썝怨좊벑?숆탳','媛앷???,'q','','q','q','q','q','q','q','44444444444444'),('2012_援?썝怨좊벑?숆탳_援?뼱_1?숇뀈_1?숆린_以묎컙怨좎궗',5,'援?뼱','援?썝怨좊벑?숆탳','媛앷???,'q','','q','q','q','q','q','q','q'),('2012_援?썝怨좊벑?숆탳_援?뼱_1?숇뀈_1?숆린_以묎컙怨좎궗',6,'援?뼱','援?썝怨좊벑?숆탳','媛앷???,'q','','q','q','q','q?곥뀅?곥뀅??,'?쀣뀠?쀣뀠?쀣뀠?쀣뀠?쀣뀠?쀣뀠?쀣뀠','q','6666666666666666666666');
/*!40000 ALTER TABLE `pre_exam_korean` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pre_exam_math`
--

DROP TABLE IF EXISTS `pre_exam_math`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pre_exam_math` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `major_name` varchar(10) NOT NULL,
  `school_name` varchar(30) NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_korean_major_list1_idx` (`major_name`),
  KEY `fk_korean_school_list1_idx` (`school_name`),
  KEY `fk_pre_exam_korean_pre_exam_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_korean_major_list11` FOREIGN KEY (`major_name`) REFERENCES `major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list11` FOREIGN KEY (`school_name`) REFERENCES `school_list` (`school_name`),
  CONSTRAINT `fk_pre_exam_korean_pre_exam_classification_list11` FOREIGN KEY (`classification_name`) REFERENCES `pre_exam_classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pre_exam_math`
--

LOCK TABLES `pre_exam_math` WRITE;
/*!40000 ALTER TABLE `pre_exam_math` DISABLE KEYS */;
/*!40000 ALTER TABLE `pre_exam_math` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pre_exam_science`
--

DROP TABLE IF EXISTS `pre_exam_science`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pre_exam_science` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `major_name` varchar(10) NOT NULL,
  `school_name` varchar(30) NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_korean_major_list1_idx` (`major_name`),
  KEY `fk_korean_school_list1_idx` (`school_name`),
  KEY `fk_pre_exam_korean_pre_exam_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_korean_major_list13` FOREIGN KEY (`major_name`) REFERENCES `major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list13` FOREIGN KEY (`school_name`) REFERENCES `school_list` (`school_name`),
  CONSTRAINT `fk_pre_exam_korean_pre_exam_classification_list13` FOREIGN KEY (`classification_name`) REFERENCES `pre_exam_classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pre_exam_science`
--

LOCK TABLES `pre_exam_science` WRITE;
/*!40000 ALTER TABLE `pre_exam_science` DISABLE KEYS */;
/*!40000 ALTER TABLE `pre_exam_science` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pre_exam_social`
--

DROP TABLE IF EXISTS `pre_exam_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pre_exam_social` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `major_name` varchar(10) NOT NULL,
  `school_name` varchar(30) NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_korean_major_list1_idx` (`major_name`),
  KEY `fk_korean_school_list1_idx` (`school_name`),
  KEY `fk_pre_exam_korean_pre_exam_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_korean_major_list12` FOREIGN KEY (`major_name`) REFERENCES `major_list` (`major_name`),
  CONSTRAINT `fk_korean_school_list12` FOREIGN KEY (`school_name`) REFERENCES `school_list` (`school_name`),
  CONSTRAINT `fk_pre_exam_korean_pre_exam_classification_list12` FOREIGN KEY (`classification_name`) REFERENCES `pre_exam_classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pre_exam_social`
--

LOCK TABLES `pre_exam_social` WRITE;
/*!40000 ALTER TABLE `pre_exam_social` DISABLE KEYS */;
/*!40000 ALTER TABLE `pre_exam_social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_list`
--

DROP TABLE IF EXISTS `school_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_list` (
  `school_name` varchar(30) NOT NULL,
  `school_grade` varchar(2) NOT NULL,
  PRIMARY KEY (`school_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_list`
--

LOCK TABLES `school_list` WRITE;
/*!40000 ALTER TABLE `school_list` DISABLE KEYS */;
INSERT INTO `school_list` VALUES ('媛?μ큹?깊븰援?,'珥덈벑'),('援?썝怨좊벑?숆탳','怨좊벑'),('援?썝珥덈벑?숆탳','珥덈벑'),('湲덇?珥덈벑?숆탳','珥덈벑'),('?몄?以묓븰援?,'以묐벑'),('?몄?珥덈벑?숆탳','珥덈벑'),('?⑥썡珥덈벑?숆탳','珥덈벑'),('?ъ쿇珥덈벑?숆탳','珥덈벑'),('?誘몄큹?깊븰援?,'珥덈벑'),('?뺤떊珥덈벑?숆탳','珥덈벑'),('?숇씫珥덈벑?숆탳','珥덈벑'),('?숇웾珥덈벑?숆탳','珥덈벑'),('紐⑺뻾珥덈벑?숆탳','珥덈벑'),('誘몃뜒以묓븰援?,'以묐벑'),('遺곸뿬?먯쨷?숆탳','以묐벑'),('?곗쿃以묓븰援?,'以묐벑'),('?곗쿃珥덈벑?숆탳','珥덈벑'),('?몄꽦珥덈벑?숆탳','珥덈벑'),('?뚰깭珥덈벑?숆탳','珥덈벑'),('?섏븞蹂댁쨷?숆탳','以묐벑'),('?섏븞蹂댁큹?깊븰援?,'珥덈벑'),('?섑쉶珥덈벑?숆탳','珥덈벑'),('?좊땲以묓븰援?,'以묐벑'),('?좊챸以묓븰援?,'以묐벑'),('?숈꽦以묓븰援?,'以묐벑'),('?숈꽦珥덈벑?숆탳','珥덈벑'),('?꾩젙珥덈벑?숆탳','珥덈벑'),('?곗닔珥덈벑?숆탳','珥덈벑'),('?ㅼ꽍珥덈벑?숆탳','珥덈벑'),('?⑹썝珥덈벑?숆탳','珥덈벑'),('二쇰뜒以묓븰援?,'以묐벑'),('二쇰뜒珥덈벑?숆탳','珥덈벑'),('以묒븰?묒쨷?숆탳','以묐벑'),('以묒썝以묓븰援?,'以묐벑'),('異⑹썝怨좊벑?숆탳','怨좊벑'),('異⑹씪以묓븰援?,'以묐벑'),('異⑹＜怨좊벑?숆탳','怨좊벑'),('異⑹＜怨듭뾽怨좊벑?숆탳','怨좊벑'),('異⑹＜援먰쁽珥덈벑?숆탳','珥덈벑'),('異⑹＜湲덈쫱珥덈벑?숆탳','珥덈벑'),('異⑹＜?⑥궛珥덈벑?숆탳','珥덈벑'),('異⑹＜?⑦븳媛뺤큹?깊븰援?,'珥덈벑'),('異⑹＜?由쇱큹?깊븰援?,'珥덈벑'),('異⑹＜??뚯썝以묓븰援?,'以묐벑'),('異⑹＜??뚯썝珥덈벑?숆탳','珥덈벑'),('異⑹＜??먭퀬?깊븰援?,'怨좊벑'),('異⑹＜?쇱썝珥덈벑?숆탳','珥덈벑'),('異⑹＜?곸뾽怨좊벑?숆탳','怨좊벑'),('異⑹＜?깅궓珥덈벑?숆탳','珥덈벑'),('異⑹＜?ъ옄怨좊벑?숆탳','怨좊벑'),('異⑹＜?ъ옄以묓븰援?,'以묐벑'),('異⑹＜?덉꽦?ъ옄怨좊벑?숆탳','怨좊벑'),('異⑹＜?덉꽦?ъ옄以묓븰援?,'以묐벑'),('異⑹＜?덉꽦珥덈벑?숆탳','珥덈벑'),('異⑹＜?⑹궛珥덈벑?숆탳','珥덈벑'),('異⑹＜以묒궛怨좊벑?숆탳','怨좊벑'),('異⑹＜以묒븰以묓븰援?,'以묐벑'),('異⑹＜以묒븰珥덈벑?숆탳','珥덈벑'),('異⑹＜以묒븰?묒큹?깊븰援?,'珥덈벑'),('異⑹＜以묓븰援?,'以묐벑'),('移좉툑以묓븰援?,'以묐벑'),('移좉툑珥덈벑?숆탳','珥덈벑'),('?꾧툑以묓븰援?,'以묐벑'),('?꾧툑珥덈벑?숆탳','珥덈벑'),('?쒕┝?붿옄?멸퀬?깊븰援?,'怨좊벑');
/*!40000 ALTER TABLE `school_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `total_user`
--

DROP TABLE IF EXISTS `total_user`;
/*!50001 DROP VIEW IF EXISTS `total_user`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `total_user` AS SELECT 
 1 AS `id`,
 1 AS `pw`,
 1 AS `name`,
 1 AS `ready`,
 1 AS `user_type`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_student`
--

DROP TABLE IF EXISTS `user_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_student` (
  `id` varchar(12) NOT NULL,
  `pw` varchar(20) NOT NULL,
  `name` varchar(10) NOT NULL,
  `grade` int NOT NULL,
  `ready` tinyint NOT NULL DEFAULT '0',
  `school_list_school_name` varchar(30) NOT NULL,
  `user_type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_school_list_idx` (`school_list_school_name`),
  CONSTRAINT `fk_users_school_list` FOREIGN KEY (`school_list_school_name`) REFERENCES `school_list` (`school_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_student`
--

LOCK TABLES `user_student` WRITE;
/*!40000 ALTER TABLE `user_student` DISABLE KEYS */;
INSERT INTO `user_student` VALUES ('kanin','lier1020','留덉뒪?고븰??,1,1,'異⑹＜?덉꽦?ъ옄怨좊벑?숆탳','?숈깮'),('test100','Alpha102030','?뚯뒪?몄엯?덈떎',2,1,'異⑹＜以묓븰援?,'?숈깮');
/*!40000 ALTER TABLE `user_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_teacher`
--

DROP TABLE IF EXISTS `user_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_teacher` (
  `id` varchar(12) NOT NULL,
  `pw` varchar(20) NOT NULL,
  `name` varchar(5) NOT NULL,
  `ready` tinyint NOT NULL DEFAULT '0',
  `major_list_major_name` varchar(10) NOT NULL,
  `user_type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_teacher_major_list1_idx` (`major_list_major_name`),
  CONSTRAINT `fk_user_teacher_major_list1` FOREIGN KEY (`major_list_major_name`) REFERENCES `major_list` (`major_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_teacher`
--

LOCK TABLES `user_teacher` WRITE;
/*!40000 ALTER TABLE `user_teacher` DISABLE KEYS */;
INSERT INTO `user_teacher` VALUES ('ansgytkd11','anstjgn1','臾명슚??,1,'援?뼱','?좎깮'),('testest','alpha1020','?뚯뒪??',0,'?곸뼱','?좎깮');
/*!40000 ALTER TABLE `user_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_category`
--

DROP TABLE IF EXISTS `word_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_category` (
  `word_category` varchar(255) NOT NULL,
  `word_count` varchar(45) NOT NULL,
  `major_name` varchar(45) NOT NULL,
  PRIMARY KEY (`word_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_category`
--

LOCK TABLES `word_category` WRITE;
/*!40000 ALTER TABLE `word_category` DISABLE KEYS */;
INSERT INTO `word_category` VALUES ('援?뼱_怨듯넻_?믪엫踰?,'0','援?뼱'),('援?뼱_怨듯넻_?믪엫踰뺥몴??,'0','援?뼱'),('援?뼱_怨듯넻_遺?뺥몴??,'0','援?뼱'),('?곸뼱_蹂댁뭅異?8','0','?곸뼱'),('?쒕Ц_以묐벑_1?⑥썝','0','?쒕Ц'),('?쒕Ц_以묐벑_2?⑥썝','0','?쒕Ц');
/*!40000 ALTER TABLE `word_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_chinese_character`
--

DROP TABLE IF EXISTS `word_chinese_character`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_chinese_character` (
  `word_category` varchar(255) NOT NULL,
  `word_id` int NOT NULL,
  `word` varchar(255) NOT NULL,
  `word_mean1` varchar(255) NOT NULL,
  `word_mean2` varchar(255) DEFAULT NULL,
  `word_mean3` varchar(255) DEFAULT NULL,
  `word_mean4` varchar(255) DEFAULT NULL,
  `word_mean5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`word_id`,`word_category`),
  KEY `fk_word_chinese_character_word_category1_idx` (`word_category`),
  CONSTRAINT `fk_word_chinese_character_word_category1` FOREIGN KEY (`word_category`) REFERENCES `word_category` (`word_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_chinese_character`
--

LOCK TABLES `word_chinese_character` WRITE;
/*!40000 ALTER TABLE `word_chinese_character` DISABLE KEYS */;
INSERT INTO `word_chinese_character` VALUES ('?쒕Ц_以묐벑_1?⑥썝',1,'燁뗥쨻','?쒓???,'以묒텛??,'異붿꽍','?뚮젰8??5??,''),('?쒕Ц_以묐벑_2?⑥썝',1,'??,'?뚯븘????,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_2?⑥썝',2,'??,'鍮쏅궇 ??,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',4,'腰?,'留?留?,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',5,'鸚?,'???',NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',6,'亦?,'臾???,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',7,'??,'?녹쓣 媛',NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',8,'黎?,'媛?媛?,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',9,'藥?,'?μ씤 怨?,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',10,'鴉?,'????,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',11,'雅?,'?щ엺 ??,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',12,'??,'?섑? 由?,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',13,'訝?,'?꾨옒 ??,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',14,'訝?,'????,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',15,'??,'????,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',16,'??,'?섎Т 紐?,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',17,'麗?,'臾???,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',18,'??,'遺???,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',19,'??,'????,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',20,'??,'????,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',21,'邀?,'臾쇨퀬湲???,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',22,'??,'?대쫫 紐?,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',23,'??,'????,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',24,'麗?,'?깆뵪 ??,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',25,'冶?,'?깆뵪 ??,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',26,'耶?,'湲????,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',27,'??,'湲??臾?,NULL,NULL,NULL,NULL),('?쒕Ц_以묐벑_1?⑥썝',28,'轢?,'?쒕굹????,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `word_chinese_character` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_english`
--

DROP TABLE IF EXISTS `word_english`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_english` (
  `word_category` varchar(255) NOT NULL,
  `word_id` int NOT NULL,
  `word` varchar(255) NOT NULL,
  `word_mean1` varchar(255) NOT NULL,
  `word_mean2` varchar(255) DEFAULT NULL,
  `word_mean3` varchar(255) DEFAULT NULL,
  `word_mean4` varchar(255) DEFAULT NULL,
  `word_mean5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`word_id`,`word_category`),
  KEY `fk_word_chinese_character_word_category1_idx` (`word_category`),
  CONSTRAINT `fk_word_chinese_character_word_category13` FOREIGN KEY (`word_category`) REFERENCES `word_category` (`word_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_english`
--

LOCK TABLES `word_english` WRITE;
/*!40000 ALTER TABLE `word_english` DISABLE KEYS */;
INSERT INTO `word_english` VALUES ('?곸뼱_蹂댁뭅異?8',1,'test','test','test','update',NULL,NULL);
/*!40000 ALTER TABLE `word_english` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_etc`
--

DROP TABLE IF EXISTS `word_etc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_etc` (
  `word_category` varchar(255) NOT NULL,
  `word_id` int NOT NULL,
  `word` varchar(255) NOT NULL,
  `word_mean1` varchar(255) NOT NULL,
  `word_mean2` varchar(255) DEFAULT NULL,
  `word_mean3` varchar(255) DEFAULT NULL,
  `word_mean4` varchar(255) DEFAULT NULL,
  `word_mean5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`word_id`,`word_category`),
  KEY `fk_word_chinese_character_word_category1_idx` (`word_category`),
  CONSTRAINT `fk_word_chinese_character_word_category12` FOREIGN KEY (`word_category`) REFERENCES `word_category` (`word_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_etc`
--

LOCK TABLES `word_etc` WRITE;
/*!40000 ALTER TABLE `word_etc` DISABLE KEYS */;
/*!40000 ALTER TABLE `word_etc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_history`
--

DROP TABLE IF EXISTS `word_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_history` (
  `word_category` varchar(255) NOT NULL,
  `word_id` int NOT NULL,
  `word` varchar(255) NOT NULL,
  `word_mean1` varchar(255) NOT NULL,
  `word_mean2` varchar(255) DEFAULT NULL,
  `word_mean3` varchar(255) DEFAULT NULL,
  `word_mean4` varchar(255) DEFAULT NULL,
  `word_mean5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`word_id`,`word_category`),
  KEY `fk_word_chinese_character_word_category1_idx` (`word_category`),
  CONSTRAINT `fk_word_chinese_character_word_category14` FOREIGN KEY (`word_category`) REFERENCES `word_category` (`word_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_history`
--

LOCK TABLES `word_history` WRITE;
/*!40000 ALTER TABLE `word_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `word_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_korean`
--

DROP TABLE IF EXISTS `word_korean`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_korean` (
  `word_category` varchar(255) NOT NULL,
  `word_id` int NOT NULL,
  `word` varchar(255) NOT NULL,
  `word_mean1` varchar(255) NOT NULL,
  `word_mean2` varchar(255) DEFAULT NULL,
  `word_mean3` varchar(255) DEFAULT NULL,
  `word_mean4` varchar(255) DEFAULT NULL,
  `word_mean5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`word_id`,`word_category`),
  KEY `fk_word_chinese_character_word_category1_idx` (`word_category`),
  CONSTRAINT `fk_word_chinese_character_word_category15` FOREIGN KEY (`word_category`) REFERENCES `word_category` (`word_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_korean`
--

LOCK TABLES `word_korean` WRITE;
/*!40000 ALTER TABLE `word_korean` DISABLE KEYS */;
INSERT INTO `word_korean` VALUES ('援?뼱_怨듯넻_?믪엫踰?,1,'??,'??,NULL,'??,NULL,NULL),('援?뼱_怨듯넻_遺?뺥몴??,1,'??,'??,'??,'??,NULL,NULL),('援?뼱_怨듯넻_遺?뺥몴??,2,'燁뗥쨻','?쒓???,'以묒텛??,'異붿꽍','',''),('援?뼱_怨듯넻_遺?뺥몴??,3,'??,'??,NULL,NULL,NULL,NULL),('援?뼱_怨듯넻_遺?뺥몴??,4,'??,'??,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `word_korean` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_science`
--

DROP TABLE IF EXISTS `word_science`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word_science` (
  `word_category` varchar(255) NOT NULL,
  `word_id` int NOT NULL,
  `word` varchar(255) NOT NULL,
  `word_mean1` varchar(255) NOT NULL,
  `word_mean2` varchar(255) DEFAULT NULL,
  `word_mean3` varchar(255) DEFAULT NULL,
  `word_mean4` varchar(255) DEFAULT NULL,
  `word_mean5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`word_id`,`word_category`),
  KEY `fk_word_chinese_character_word_category1_idx` (`word_category`),
  CONSTRAINT `fk_word_chinese_character_word_category11` FOREIGN KEY (`word_category`) REFERENCES `word_category` (`word_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_science`
--

LOCK TABLES `word_science` WRITE;
/*!40000 ALTER TABLE `word_science` DISABLE KEYS */;
/*!40000 ALTER TABLE `word_science` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workbook_english`
--

DROP TABLE IF EXISTS `workbook_english`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workbook_english` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_workbook_korean_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_workbook_korean_classification_list14` FOREIGN KEY (`classification_name`) REFERENCES `classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workbook_english`
--

LOCK TABLES `workbook_english` WRITE;
/*!40000 ALTER TABLE `workbook_english` DISABLE KEYS */;
INSERT INTO `workbook_english` VALUES ('?곸뼱_test1',1,'媛앷???,'?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪?몄엯?덈떎?뚯뒪','','?뚯뒪?몄엯?덈떎','?뚯뒪?몄엯?덈떎','?뚯뒪?몄엯?덈떎','?뚯뒪?몄엯?덈떎','?뚯뒪?몄엯?덈떎','?뚯뒪?몄엯?덈떎','1');
/*!40000 ALTER TABLE `workbook_english` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workbook_etc`
--

DROP TABLE IF EXISTS `workbook_etc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workbook_etc` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_workbook_korean_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_workbook_korean_classification_list12` FOREIGN KEY (`classification_name`) REFERENCES `classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workbook_etc`
--

LOCK TABLES `workbook_etc` WRITE;
/*!40000 ALTER TABLE `workbook_etc` DISABLE KEYS */;
/*!40000 ALTER TABLE `workbook_etc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workbook_korean`
--

DROP TABLE IF EXISTS `workbook_korean`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workbook_korean` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_workbook_korean_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_workbook_korean_classification_list1` FOREIGN KEY (`classification_name`) REFERENCES `classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workbook_korean`
--

LOCK TABLES `workbook_korean` WRITE;
/*!40000 ALTER TABLE `workbook_korean` DISABLE KEYS */;
INSERT INTO `workbook_korean` VALUES ('援?뼱_2024_?섎뒫_援?뼱_??섑삎',1,'媛앷???,'?낆꽌???낆옄媛 紐⑺몴??寃곌낵???꾨떖?섍린 ?꾪빐 湲???쎄퀬 ?섎?瑜?援ъ꽦?섎뒗 ?몄? ?됱쐞?대떎. ?깃났?곸씤 ?낆꽌瑜??꾪빐?쒕뒗 珥덉씤吏媛 以묒슂?섎떎. ?낆꽌?먯꽌??珥덉씤吏???낆옄媛 ?먯떊???낆꽌 ?됱쐞??????몄??섎뒗 寃껋쑝濡쒖꽌 ?먯떊???낆꽌 怨쇱젙???먭??섍퀬 議곗젙?섎뒗 ??븷???쒕떎.\n<A>珥덉씤吏??湲???쎄린 ?쒖옉????吏?띿쟻?쇰줈 ?대（?댁????먭? 怨쇱젙???숈썝?쒕떎. ?낆옄??媛???곸젅?섎떎怨??먮떒???낆꽌 ?꾨왂???ъ슜?섏뿬 ?낆꽌瑜?吏꾪뻾?섎뒗?? 洹??꾨왂???④낵?곸씠怨?臾몄젣媛 ?녿뒗吏瑜??됯??섎ŉ ?먭??쒕떎. ?④낵?곸씠吏 ?딄굅??臾몄젣媛 ?덈떎怨??먮떒?섎㈃ ?대? ?닿껐?댁빞 ?쒕떎. 臾몄젣媛 臾댁뾿 ?몄? 遺꾨챸?섏? ?딆? 寃쎌슦?먮뒗 ?낆꽌 以묒뿉 ?좎삤瑜대뒗 ?앷컖?ㅼ쓣 ?댄렣蹂닿퀬 洹몄쨷 ?낆꽌??吏꾪뻾??諛⑺빐?섎뒗 ?앷컖?ㅼ쓣 遺꾨쪟??蹂대뒗 諛⑸쾿?쇰줈 臾몄젣?먯씠 臾댁뾿?몄? ?뚯븙?????덈떎. ?낆꽌媛 以묐떒 ?놁씠 ?댁뼱吏???곹깭?댁?留?臾몄젣媛 諛쒖깮??寃껋쓣 ?낆옄 ?먯떊???몄??섏? 紐삵븯??寃쎌슦???덈떎. ?섎룄??紐⑺몴??遺?⑺븯吏 ?딅뒗 諛⑸쾿?쇰줈 ?쎄린瑜?吏꾪뻾?섍굅???먯떊???댄빐???뺣룄瑜??먮떒?섏? 紐삵븯???덇? 洹멸쾬?대떎. 臾몄젣 諛쒖깮 ?щ????먭????꾪빐?쒕뒗 ?낆꽌 吏꾪뻾 以묎컙以묎컙???댄빐???댁슜???뺣━?섎뒗 諛⑸쾿???ъ슜?????덈떎.<A>\n珥덉씤吏??臾몄젣瑜??닿껐?섍린 ?꾪빐 ?낆꽌 ?꾨왂??議곗젙?섎뒗 怨쇱젙 ?먮룄 ?숈썝?쒕떎. ?낆꽌 紐⑺몴瑜?怨좊젮?섏뿬, ?낆옄???좎?湲??ъ슜?섍퀬 ?덈뒗 ?꾨왂??怨꾩냽 ?ъ슜??寃껋씤吏瑜??먮떒?댁빞 ?쒕떎. ????臾몄젣 ?닿껐???꾪븳 ?ㅻⅨ ?꾨왂?먮뒗 臾댁뾿???덈뒗吏, ??컖 ?꾨왂???뱀쭠怨??ъ슜 ?덉감, 議곌굔 ?깆? 臾댁뾿?몄? ?뚯븘???쒕떎. ?먰븳 ?낆옄 ?먯떊???ъ슜?????덈뒗 ?꾨왂??臾댁뾿?몄?, ???꾨왂?ㅼ쓽 ?곸젅???곸슜 ?쒖꽌媛 臾댁뾿?몄?, ???꾩옱???곹솴?먯꽌 理쒖쟻???꾨왂??臾댁뾿?몄? ?먮떒?섏뿬 ?덈줈???꾨왂???좏깮?쒕떎. ?좏깮???꾨왂???섑뻾?섎뒗 怨쇱젙?먯꽌 ?낆옄??珥덉씤吏瑜??쒖슜?섏뿬 ?먭?怨?議곗젙???섑??댄븯硫??λ룞?곸쑝濡??섎?瑜?援ъ꽦??媛꾨떎.',NULL,'?쀪????댄빐???댁슜?쇰줈 ?곸젅?섏? ?딆? 寃껋??','?낆꽌 ?꾨왂???좏깮?????낆꽌??紐⑺몴瑜?怨좊젮???꾩슂媛 ?덈떎','?낆꽌 ?꾨왂???좏깮???꾪빐 媛쒕퀎 ?꾨왂?ㅼ뿉 ???吏?앹씠 ?꾩슂?섎떎.','?낆꽌 紐⑺몴???ъ꽦???꾪빐 ?낆옄???먯떊???낆꽌 ?됱쐞??????몄??댁빞 ?쒕떎.','?낆꽌 臾몄젣???닿껐???꾪빐 ?낆옄???먯떊???ъ슜?????덈뒗 ?꾨왂??臾댁뾿?몄? ?뚯븘???쒕떎.','?낆꽌 臾몄젣瑜??닿껐?섍린 ?꾪빐 ?덈줈 ?좏깮???꾨왂? ?먭?怨?議곗젙????곸뿉???쒖쇅???꾩슂媛 ?덈떎.','5'),('援?뼱_2024_?섎뒫_援?뼱_??섑삎',2,'媛앷???,'?낆꽌???낆옄媛 紐⑺몴??寃곌낵???꾨떖?섍린 ?꾪빐 湲???쎄퀬 ?섎?瑜?援ъ꽦?섎뒗 ?몄? ?됱쐞?대떎. ?깃났?곸씤 ?낆꽌瑜??꾪빐?쒕뒗 珥덉씤吏媛 以묒슂?섎떎. ?낆꽌?먯꽌??珥덉씤吏???낆옄媛 ?먯떊???낆꽌 ?됱쐞??????몄??섎뒗 寃껋쑝濡쒖꽌 ?먯떊???낆꽌 怨쇱젙???먭??섍퀬 議곗젙?섎뒗 ??븷???쒕떎.\n<A>珥덉씤吏??湲???쎄린 ?쒖옉????吏?띿쟻?쇰줈 ?대（?댁????먭? 怨쇱젙???숈썝?쒕떎. ?낆옄??媛???곸젅?섎떎怨??먮떒???낆꽌 ?꾨왂???ъ슜?섏뿬 ?낆꽌瑜?吏꾪뻾?섎뒗?? 洹??꾨왂???④낵?곸씠怨?臾몄젣媛 ?녿뒗吏瑜??됯??섎ŉ ?먭??쒕떎. ?④낵?곸씠吏 ?딄굅??臾몄젣媛 ?덈떎怨??먮떒?섎㈃ ?대? ?닿껐?댁빞 ?쒕떎. 臾몄젣媛 臾댁뾿 ?몄? 遺꾨챸?섏? ?딆? 寃쎌슦?먮뒗 ?낆꽌 以묒뿉 ?좎삤瑜대뒗 ?앷컖?ㅼ쓣 ?댄렣蹂닿퀬 洹몄쨷 ?낆꽌??吏꾪뻾??諛⑺빐?섎뒗 ?앷컖?ㅼ쓣 遺꾨쪟??蹂대뒗 諛⑸쾿?쇰줈 臾몄젣?먯씠 臾댁뾿?몄? ?뚯븙?????덈떎. ?낆꽌媛 以묐떒 ?놁씠 ?댁뼱吏???곹깭?댁?留?臾몄젣媛 諛쒖깮??寃껋쓣 ?낆옄 ?먯떊???몄??섏? 紐삵븯??寃쎌슦???덈떎. ?섎룄??紐⑺몴??遺?⑺븯吏 ?딅뒗 諛⑸쾿?쇰줈 ?쎄린瑜?吏꾪뻾?섍굅???먯떊???댄빐???뺣룄瑜??먮떒?섏? 紐삵븯???덇? 洹멸쾬?대떎. 臾몄젣 諛쒖깮 ?щ????먭????꾪빐?쒕뒗 ?낆꽌 吏꾪뻾 以묎컙以묎컙???댄빐???댁슜???뺣━?섎뒗 諛⑸쾿???ъ슜?????덈떎.<A>\n珥덉씤吏??臾몄젣瑜??닿껐?섍린 ?꾪빐 ?낆꽌 ?꾨왂??議곗젙?섎뒗 怨쇱젙 ?먮룄 ?숈썝?쒕떎. ?낆꽌 紐⑺몴瑜?怨좊젮?섏뿬, ?낆옄???좎?湲??ъ슜?섍퀬 ?덈뒗 ?꾨왂??怨꾩냽 ?ъ슜??寃껋씤吏瑜??먮떒?댁빞 ?쒕떎. ????臾몄젣 ?닿껐???꾪븳 ?ㅻⅨ ?꾨왂?먮뒗 臾댁뾿???덈뒗吏, ??컖 ?꾨왂???뱀쭠怨??ъ슜 ?덉감, 議곌굔 ?깆? 臾댁뾿?몄? ?뚯븘???쒕떎. ?먰븳 ?낆옄 ?먯떊???ъ슜?????덈뒗 ?꾨왂??臾댁뾿?몄?, ???꾨왂?ㅼ쓽 ?곸젅???곸슜 ?쒖꽌媛 臾댁뾿?몄?, ???꾩옱???곹솴?먯꽌 理쒖쟻???꾨왂??臾댁뾿?몄? ?먮떒?섏뿬 ?덈줈???꾨왂???좏깮?쒕떎. ?좏깮???꾨왂???섑뻾?섎뒗 怨쇱젙?먯꽌 ?낆옄??珥덉씤吏瑜??쒖슜?섏뿬 ?먭?怨?議곗젙???섑??댄븯硫??λ룞?곸쑝濡??섎?瑜?援ъ꽦??媛꾨떎.',NULL,'[A]?먯꽌 ?????덈뒗 ?댁슜?쇰줈 媛???곸젅??寃껋??','?낆꽌 吏꾪뻾 以??댄빐???댁슜???뺣━?섎뒗 寃껋? ?낆옄 ?ㅼ뒪濡??낆꽌 吏꾪뻾??臾몄젣瑜??먭??섎뒗 ?곗뿉 ?곹빀?섏? ?딅떎.','?낆꽌 吏꾪뻾 以??낆옄媛 ?먯떊???쇰쭏???댄빐?섍퀬 ?덈뒗吏 ?뚯븙?섏? 紐삵븷 ?뚯뿉???먭????좎떆 蹂대쪟?댁빞 ?쒕떎.','?낆꽌 吏꾪뻾??臾몄젣媛 ?놁뼱 蹂댁씠?붾씪??紐⑺몴??遺?⑺븯吏 ?딅뒗 ?낆꽌媛 ?대（?댁???寃쎌슦媛 ?덈떎.','?낆꽌 以묒뿉 ?좎삤瑜대뒗 ?앷컖??遺꾨쪟?섎뒗 寃껋? ?낆꽌 臾몄젣??諛쒖깮??留됰뒗??','?낆꽌媛 硫덉텛吏 ?딄퀬 吏꾪뻾???뚯뿉??珥덉씤吏????븷???꾩슂 ?녿떎','3'),('援?뼱_怨듯넻_遺?뺥몴??,1,'媛앷???,'??,NULL,'??,'??,'??,'??,'??,'','1'),('援?뼱_怨듯넻_遺?뺥몴??,2,'媛앷???,'?뚰듃由ъ뒪','{}','?뚰듃由ъ뒪','?뚰듃由ъ뒪','?뚰듃由ъ뒪','?뚰듃由ъ뒪','v','?뚰듃由ъ뒪','4'),('援?뼱_怨듯넻_遺?뺥몴??,4,'媛앷???,'','','??,'a','a','a','??,'??,'4'),('援?뼱_怨듯넻_遺?뺥몴??,5,'媛앷???,'','','?곥뀅?곥뀅?곥뀅','??,'??,'??,'??,'?담뀅','5'),('援?뼱_怨듯넻_遺?뺥몴??,6,'媛앷???,'','','?곥뀅?곥뀅?곥뀅?곥뀅','??,'??,'??,'g','??,'4'),('援?뼱_怨듯넻_遺?뺥몴??,7,'媛앷???,'','','?ｃ뀬?뤵뀚?쀣뀕??딇룷?졼뀚??,'??,'??,'??,'?곥뀅?곥뀅?곥뀅?곥뀅?곥뀅','?곥뀅?곥뀅?곥뀅?곥뀅?곥뀅?곥뀅','4'),('援?뼱_怨듯넻_遺?뺥몴??,8,'媛앷???,'','','?곥뀅?곥뀅','??,'??,'??,'?룔꽬','?룔꽬?룔꽬','4'),('援?뼱_怨듯넻_遺?뺥몴??,9,'媛앷???,'','','a','2','2','2','2','a','5'),('援?뼱_怨듯넻_遺?뺥몴??,10,'二쇨???,NULL,NULL,'aaaaaaaaaa',NULL,NULL,NULL,NULL,NULL,'aaaaaaaaaaaaaa'),('援?뼱_怨듯넻_遺?뺥몴??,11,'二쇨???,NULL,NULL,'ssssssssssssssss',NULL,NULL,NULL,NULL,NULL,'ss'),('援?뼱_怨듯넻_遺?뺥몴??,12,'二쇨???,NULL,NULL,'ssssssssssssssssssssf',NULL,NULL,NULL,NULL,NULL,'fffffffffff');
/*!40000 ALTER TABLE `workbook_korean` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workbook_math`
--

DROP TABLE IF EXISTS `workbook_math`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workbook_math` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_workbook_korean_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_workbook_korean_classification_list13` FOREIGN KEY (`classification_name`) REFERENCES `classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workbook_math`
--

LOCK TABLES `workbook_math` WRITE;
/*!40000 ALTER TABLE `workbook_math` DISABLE KEYS */;
/*!40000 ALTER TABLE `workbook_math` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workbook_science`
--

DROP TABLE IF EXISTS `workbook_science`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workbook_science` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_workbook_korean_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_workbook_korean_classification_list11` FOREIGN KEY (`classification_name`) REFERENCES `classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workbook_science`
--

LOCK TABLES `workbook_science` WRITE;
/*!40000 ALTER TABLE `workbook_science` DISABLE KEYS */;
/*!40000 ALTER TABLE `workbook_science` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workbook_social`
--

DROP TABLE IF EXISTS `workbook_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workbook_social` (
  `classification_name` varchar(255) NOT NULL,
  `exam_id` int NOT NULL,
  `type` varchar(3) NOT NULL,
  `paragraph` longtext,
  `image` text,
  `question` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `choice4` varchar(255) DEFAULT NULL,
  `choice5` varchar(255) DEFAULT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`classification_name`,`exam_id`),
  KEY `fk_workbook_korean_classification_list1_idx` (`classification_name`),
  CONSTRAINT `fk_workbook_korean_classification_list10` FOREIGN KEY (`classification_name`) REFERENCES `classification_list` (`classification_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workbook_social`
--

LOCK TABLES `workbook_social` WRITE;
/*!40000 ALTER TABLE `workbook_social` DISABLE KEYS */;
/*!40000 ALTER TABLE `workbook_social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `total_user`
--

/*!50001 DROP VIEW IF EXISTS `total_user`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `total_user` AS select `user_student`.`id` AS `id`,`user_student`.`pw` AS `pw`,`user_student`.`name` AS `name`,`user_student`.`ready` AS `ready`,`user_student`.`user_type` AS `user_type` from `user_student` union select `user_teacher`.`id` AS `id`,`user_teacher`.`pw` AS `pw`,`user_teacher`.`name` AS `name`,`user_teacher`.`ready` AS `ready`,`user_teacher`.`user_type` AS `user_type` from `user_teacher` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-06 15:01:40
