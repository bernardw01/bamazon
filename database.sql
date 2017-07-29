CREATE DATABASE `bamazon` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `orders` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `order_date` datetime DEFAULT NULL,
  `customer_name` varchar(45) DEFAULT NULL,
  `remarks` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `products` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `short_name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `qty_on_hand` varchar(45) DEFAULT NULL,
  `unit_price` decimal(10,0) DEFAULT '0',
  `category` varchar(45) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  `re_order_qty` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

CREATE TABLE `order_items` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_orders_order_item_idx` (`order_id`),
  KEY `fk_products_order_item_idx` (`product_id`),
  CONSTRAINT `fk_orders_order_item` FOREIGN KEY (`order_id`) REFERENCES `orders` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_order_item` FOREIGN KEY (`product_id`) REFERENCES `products` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



