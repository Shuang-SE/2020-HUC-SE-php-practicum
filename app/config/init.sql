CREATE SCHEMA `php_practicum` CHAR SET 'utf8';

use `php_practicum`;

-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: php_practicum
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book`
(
    `ISBN`             varchar(20)  NOT NULL,
    `name`             varchar(60)           DEFAULT NULL,
    `author`           varchar(50)           DEFAULT NULL,
    `press`            varchar(50)           DEFAULT NULL,
    `publication_date` date                  DEFAULT NULL,
    `unit_price`       decimal(10, 2)        DEFAULT NULL,
    `sales`            int(11)      NOT NULL DEFAULT '0',
    `type_id`          int(11)      NOT NULL DEFAULT '1',
    `brief`            text,
    `cover`            varchar(255) NOT NULL,
    PRIMARY KEY (`ISBN`),
    KEY `book_type_id_fk` (`type_id`),
    CONSTRAINT `book_type_id_fk` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book`
    DISABLE KEYS */;
INSERT INTO `book` (`ISBN`, `name`, `author`, `press`, `publication_date`, `unit_price`, `sales`, `type_id`, `brief`,
                    `cover`)
VALUES ('9787208061644', '追风筝的人', '卡勒德·胡赛尼', '上海人民出版社', NULL, 18.00, 0, 3,
        '“许多年过去了，人们说陈年旧事可以被埋葬，然而我终于明白这是错的，因为往事会自行爬上来。回首前尘，我意识到在过去二十六年里，自己始终在窥视着那荒芜的小径。”\n　　12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。\n　　成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？\n　　小说如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。',
        '../asset/upload/book/追风筝的人.png'),
       ('9787221148025', '向上生长', '九边', '贵州人民出版社', NULL, 45.00, 0, 7,
        '百万读者称赞口碑作者，九边首部力作。\n本书从多个角度，阐述我们在生活中遇到的各种困惑、难题，然后逐个进行深层分析，从而告诉你如何精准选择，抓住每一次出现的机会，拥有一条一路向前的人生路径。',
        '../asset/upload/book/向上生长.png'),
       ('9787502274849', '汤家凤 2021考研数学接力题典1800数学一\n', '汤家凤', '原子能出版社', NULL, 62.60, 0, 5,
        '本书分基础篇和提高篇，包括高等数学、线性代数、概率统计。基础篇是针对基础复习阶段而设计的，注重对基本概念的理解，基本原理和基本方法的掌握，为复习打下坚实的基础；强化综合篇适用于复习的强化阶段，注重基本概念的深化、原理的拓展、同时训练计算能力、综合分析能力、证明问题的能力、利用数学知识解决实际问题的能力。本书设计问题的难度和综合性比考试的要求略高，从这些年的使用情况看，达到了非常好的效果。',
        '../asset/upload/book/汤家凤 2021考研数学接力题典1800数学一.png'),
       ('9787504186256', '5年高考3年模拟（2020B版）高考理数', '曲一线主编', '教育科学出版社', NULL, 63.10, 0, 5,
        '五年高考三年模拟 数学五三高考练习册 五三高中同步53全练全解', '../asset/upload/book/5年高考3年模拟（2020B版）高考理数.png'),
       ('9787504186263', '5年高考3年模拟（2021B版）高考文数', '曲一线主编', '教育科学出版社', NULL, 63.10, 0, 5,
        '五年高考三年模拟 数学五三高考练习册 五三高中同步54全练全解', '../asset/upload/book/5年高考3年模拟（2021B版）高考文数.png'),
       ('9787506365437', '活着', '余华', '作家出版社', NULL, 19.30, 0, 3,
        '《活着》是一部充满血泪的小说。余华通过一位中国农民的苦难生活 讲述了人如何去承受巨大的苦难；讲述了眼泪的丰富和宽广；讲述了*望 的不存在：讲述了人是为了活着本身而活着…… 《活着》这部小说荣获意大利格林扎纳·卡佛文学奖*高奖项(1998年 )，台湾《中国时报》10本好书奖(1994年)，香港“博益”15本好书奖 (1990年)；并入选香港《亚洲周刊》评选的“20世纪中文小说百年百强” ；入选中国百位批评家和文学编辑评选的“九十年代*有影响的10部作品 ”。',
        '../asset/upload/book/活着.png'),
       ('9787508649719', '从0到1：开启商业与未来的秘密', '蒂儿、马斯特斯', '中信出版社', NULL, 31.50, 0, 8,
        '在传统时代，成功企业的商业模式是一个从1到N的过程，也就是在现有基础上，复制之前的经验，通过竞争不断扩大自己的市场影响力。而在互联网时代，成功的企业却是一个从无到有，即从0到1创造市场的过程。 \n《从0到1》为你开启创新的秘密。PayPal公司创始人、Facebook*位外部投资者彼得蒂尔在本书中详细阐述了自己的创业历程与心得，包括如何避免竞争、如何进行垄断、如何发现新的市场。《从0到1》还将带你穿越哲学、历史、经济等多元领域，解读世界运行的脉络，分享商业与未来发展的逻辑，帮助你思考从0到1的秘密，在意想不到之处发现价值与机会。 ',
        '../asset/upload/book/从0到1.png'),
       ('9787508684031', '原则', '雷·达里奥', '中信出版社', NULL, 64.50, 0, 8,
        '瑞·达利欧（Ray Dalio）：对冲基金公司桥水创始人。他出生于纽约长岛一个非常普通的中产阶级家庭，26岁时在自己的两居室公寓内创办了桥水。经过42年的发展，桥水位列美国最重要的私营公司榜单第五位（《财富》杂志）。他入选《时代周刊》世界100位*影响力人物，并跻身《福布斯》世界前100名富豪行列。由于他独到的投资准则改变了基金业，美国CIO经理人杂志称其为“投资界的史蒂夫·乔布斯”。',
        '../asset/upload/book/原则.png'),
       ('9787520809917', '逆向思维:如何化解你内心的焦虑', '少卿', '中国商业出版社', NULL, 34.30, 0, 7,
        '焦虑，在社会人群中普遍存在着，人们一边焦虑着，一边陷入对它的恐慌之中。但是我们真的就无法改变了么？正是由于焦虑情绪可能导致的可怕后果，我们一定要找到抑止焦虑的办法。《逆向思维》在对应焦虑方面，只是一种启迪，一种指引，指引你彻底地自我解放，清楚地认识到自己到底需要的是什么，不会再为一些无谓的事情变得焦虑不安。拥有一颗淡定的平常心，从容地去面对生活中的一切。',
        '../asset/upload/book/逆向思维.png'),
       ('9787521708769', '孤独的150个信念', '松浦弥太郎', '中信出版社', NULL, 36.00, 0, 7,
        '有时候，我们会被孤独感裹挟，感到孑然一身，孤零零面对着这个巨大的世界。\n被困于孤独中的我们，如何在脆弱时安慰自己？怎样拓宽社交的边界？如何增加生活的幸福感？怎样喜欢，甚至爱一个人？ 如何遵循内心，找到属于自己的道路？\n松浦弥太郎将孤独深处的语言，真诚地袒露出来。这令人安心的150段话，教会我们与孤独为友，拥有守护自己的强大力量。',
        '../asset/upload/book/孤独的150个信念.png'),
       ('9787523579654', '三体（全套）', '刘慈欣', '重庆出版社', NULL, 87.10, 0, 3,
        '文化大革命如火如荼进行的同时，军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。\n地球文明向宇宙发出的*声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……\n \n四光年外，“三体文明”正苦苦挣扎——三颗无规则运行的太阳主导下的百余次毁灭与重生逼迫他们逃离母星。而恰在此时，他们接收到了地球发来的信息。\n在运用超技术锁死地球人的基础科学之后，三体人庞大的宇宙舰队开始向地球进发……人类的末日悄然来临。',
        '../asset/upload/book/三体（全套）.png'),
       ('9787532649372', '宋词鉴赏辞典', '上海辞书出版社文学鉴赏辞典编纂中心\n', '上海辞书出版社', NULL, 195.70, 0, 4,
        '正逢国家大力倡导传承发展中华优秀传统文化之际，以此为契机，上海辞书出版社文学鉴赏辞典编纂中心为拓展我社文学鉴赏辞典的风格和品牌，推出分卷本中国文学鉴赏辞典系列。本套书以入选国家“首届向全国推荐中华优秀传统文化普及图书”的《宋词鉴赏辞典》（新一版）为基础，分为六卷，汇编成《分卷本中国文学鉴赏辞典•宋词鉴赏辞典》。共收录宋词名作1200余篇，选目涵盖各家各派，全面精到。每篇词作由古典文学领域的专家学者夏承焘、唐圭璋、缪钺、叶嘉莹、周汝昌、宛敏灏、万云骏、钟振振等撰写鉴赏文章，讲解详尽，深入浅出，帮助读者领略宋词之美。书中插配有关宋人词意的书画作品。第六卷后附有宋词书目、词学名词解释、词牌简介等资料供读者参考。全套书进行重新设计包装，使之更加赏心悦目，全面提升本书的档次和品位，以满足读者需要。',
        '../asset/upload/book/宋词鉴赏辞典.png'),
       ('9787533673253', '安徒生童话', '安徒生', '安徽教育出版社', NULL, 16.00, 0, 2,
        '一部真正可以从小读到老的书。世界童话文学创始人安徒生历时近40年创作而成。 \n　　其中著名的故事包括《海的女儿》、《皇帝的新装》、《丑小鸭》、《卖火柴的小女孩》等经典故事。这些故事流传百年，经久不衰。 \n　　安徒生童话追求真、善、美，处处体现着爱的真谛。它不仅能让人感受到童话世界的纯真和美好，还会让人明白许多道理。在生活中，我们也要拥有那些主人公们的优秀品质，如积极乐观、坚持不懈、真诚博爱、谦逊勤勉等。',
        '../asset/upload/book/安徒生童话.png'),
       ('9787550277861', '爱丽丝漫游奇境记', '刘易斯·卡罗尔', '北京联合出版公司', NULL, 15.30, 0, 2,
        '     《爱丽丝漫游奇境记》讲述的是小女孩爱丽丝追随一只会说话的白兔掉进兔子洞，进入一个神奇国度，遇到了许多会说话的生物以及像人一般活动的纸牌，后发现原来是一场梦的奇幻故事。\n      作者通过奇幻荒诞的情节，大量的英式幽默，描绘了童趣横生的世界；他的数学及逻辑学专业背景又使本书充满了逻辑思辨意味和理趣。这是一本值得反复阅读的经典名著。\n      现在， 让我们放飞想象力，跟随会说话的白兔，进入这个蘑菇可以使人随意变大变小、猫咪可以随时隐身和出现、毛毛虫会抽水烟袋、火烈鸟可以当槌球棒的神奇国度，开启你的奇幻之旅吧！',
        '../asset/upload/book/爱丽丝漫游奇境记.png'),
       ('9787556122721', '古色之美', '青简', '湖南人民出版社', NULL, 74.70, 0, 6,
        '《古色之美》选取中国传统五正色和三间色：青红黄白黑紫绿褐，详析八大色系七十一种传统颜色（胭脂、藤黄、月白、藕荷……）的源流与现状。\n每个色系分三篇论述：言色、物色、行色，从字源、国宝器物，和作者旅行途中捕捉的景色三个角度，分享古色之美。分析色彩的文化隐喻，解读古人的文化生活、审美情趣，一本读懂色彩背后的中国文化。\n七十一种经典古色、两百张绝美摄影，精选纸张、四色印刷，完美呈现中国传统色彩与文化之美。',
        '../asset/upload/book/古色之美.png'),
       ('9787805019192', '浮世绘三杰：喜多川歌磨、葛饰北斋、歌川广重', '弗朗西斯科·莫雷纳', '北京美术摄影出版社', NULL, 160.90, 0, 6,
        '   本书向读者介绍了日本的浮世绘艺术。浮世绘的诞生、发展和代表作标志着17世纪至19世纪整个日本艺术史。浮世绘艺术简洁并优雅地描绘了日本的服饰和文化，尤其是江户地区，即过去的东京，当地的人民为了摆脱日常生活的痛苦，沉迷于世俗的享乐之中。喜多川歌麿、葛饰北斋和歌川广重是浮世绘的主要代表人物，从19世纪晚期开始，他们的作品在西方受到了极大的推崇，对欧洲的先驱艺术家们产生了深远的影响。',
        '../asset/upload/book/浮世绘三杰：喜多川歌磨、葛饰北斋、歌川广重.png');
/*!40000 ALTER TABLE `book`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order`
(
    `id`              int(11)                       NOT NULL AUTO_INCREMENT,
    `user_id`         int(11)                       NOT NULL,
    `book_ISBN`       varchar(20)                   NOT NULL,
    `date`            timestamp                     NULL     DEFAULT CURRENT_TIMESTAMP,
    `amount`          int(11)                       NOT NULL,
    `total_price`     decimal(10, 2)                NOT NULL,
    `payment_terms`   enum ('支付宝','微信','银联','visa') NOT NULL DEFAULT '支付宝',
    `delivery_method` enum ('爽通','正通','权通')         NOT NULL DEFAULT '爽通',
    `order_status`    enum ('未付款','已付款','已退货')      NOT NULL DEFAULT '未付款',
    PRIMARY KEY (`id`),
    KEY `order_book_ISBN_fk` (`book_ISBN`),
    KEY `order_user_id_fk` (`user_id`),
    CONSTRAINT `order_book_ISBN_fk` FOREIGN KEY (`book_ISBN`) REFERENCES `book` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `order_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `order`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type`
(
    `id`   int(11)     NOT NULL AUTO_INCREMENT,
    `name` varchar(30) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 9
  DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type`
    DISABLE KEYS */;
INSERT INTO `type` (`id`, `name`)
VALUES (1, '未分类'),
       (2, '儿童读物'),
       (3, '小说'),
       (4, '文学'),
       (5, '教辅资料'),
       (6, '艺术'),
       (7, '成功励志'),
       (8, '管理');
/*!40000 ALTER TABLE `type`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user`
(
    `id`           int(11)               NOT NULL AUTO_INCREMENT,
    `username`     varchar(20)           NOT NULL,
    `password`     varchar(120)          NOT NULL,
    `authority`    enum ('user','admin') NOT NULL DEFAULT 'user',
    `icon`         varchar(256)          NOT NULL DEFAULT '../asset/img/default-user-icon.png',
    `age`          int(11)                        DEFAULT NULL,
    `contact_info` varchar(50)                    DEFAULT NULL,
    `gender`       enum ('male','female')         DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_username_uindex` (`username`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 14
  DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user`
    DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `password`, `authority`, `icon`, `age`, `contact_info`, `gender`)
VALUES (1, 'test_user', 'asd', 'user', '../asset/img/default-user-icon.png', NULL, NULL, NULL),
       (13, 'shuang', '$2y$10$.PUdFtY7aKuhvW4rShxqI.dezOMIcb4PiiKOOOKIxxnOhNyHSZ2De', 'user',
        '../asset/img/default-user-icon.png', 15, 'tel: 15636624455', 'male');
/*!40000 ALTER TABLE `user`
    ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2020-06-11 14:07:32
