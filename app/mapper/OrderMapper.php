<?php

    namespace app\mapper;
    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/core/Model.php';

    use app\core\Model;
    use PDO;

    class OrderMapper extends Model {

        /**
         * @return array|bool
         */
        function getAllOrders() {
            $db = $this->getDB();
            $sql = 'select `order`.id as order_id, amount, order_status, book.name as book_name, book.unit_price, total_price 
                    from book, `order`, user 
                    where user.id = user_id 
                      and book.ISBN = book_ISBN ';
            $stmt = $db->query($sql);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

//        /**
//         * @param $userId
//         * @return array|bool
//         */
//        function getOrders($userId) {
//            $db = $this->getDB();
//            $sql = 'select `order`.id as order_id, book_ISBN as ISBN, amount, order_status, book.name as book_name, book.unit_price, total_price
//                    from book, `order`, user
//                    where user.id = user_id
//                      and book.ISBN = book_ISBN
//                      and user_id = :user_id';
//            if ($stmt = $db->prepare($sql)) {
//                if ($stmt->execute([
//                    'user_id' => $userId,
//                ])) {
//                    return $stmt->fetchAll(PDO::FETCH_ASSOC);
//                }
//            }
//            return false;
//        }

        function getShoppingCartByUserId($userId) {
            $db = $this->getDB();
            $sql = 'select `order`.id as order_id, book.name as book_name, amount, unit_price, 
                    total_price, payment_terms, delivery_method, date, cover
                    from `order`, book, user 
                    where user_id = :user_id 
                      and book.ISBN = book_ISBN 
                      and user_id = user.id 
                      and order_status = \'未付款\'';
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute([
                    'user_id' => $userId,
                ])) {
                    return $stmt->fetchAll(PDO::FETCH_ASSOC);
                }
            }
            return false;
        }

        function getOrdersByUserId($userId) {
            $db = $this->getDB();
            $sql = 'select `order`.id as order_id, book.name as book_name, amount, unit_price, 
                    total_price, payment_terms, delivery_method, date, cover
                    from `order`, book, user 
                    where user_id = :user_id 
                      and book.ISBN = book_ISBN 
                      and user_id = user.id 
                      and order_status = \'已付款\'';
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute([
                    'user_id' => $userId,
                ])) {
                    return $stmt->fetchAll(PDO::FETCH_ASSOC);
                }
            }
            return false;
        }

//        function countByUserId($userId) {
//            $db = $this->getDB();
//            $sql = 'select count(*) from `order` where user_id = :user_id';
//            if ($stmt = $db->prepare($sql)) {
//                if ($stmt->execute([
//                    'user_id' => $userId
//                ])) {
//                    return $stmt->rowCount();
//                }
//            }
//            return false;
//        }

        /**
         * @param $userId
         * @param $ISBN
         * @param $amount
         * @param $totalPrice
         * @return bool
         */
        function addToShoppingCart($userId, $ISBN, $amount, $totalPrice) {
            $db = $this->getDB();
            $sql = 'insert into `order`(user_id, book_ISBN, amount, total_price) values (:user_id, :ISBN, :amount, :total_price)';
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute([
                    'user_id' => $userId,
                    'ISBN' => $ISBN,
                    'amount' => $amount,
                    'total_price' => $totalPrice,
                ])) {
                    return $stmt->rowCount() > 0;
                }
            }
            return false;
        }

        function addToOrder($orderId, $paymentTerms, $deliveryMethod) {
            $db = $this->getDB();
            $sql = 'update `order` set payment_terms = :payment_terms, delivery_method = :delivery_method,
                    order_status = \'已付款\'
                    where id = :order_id';
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute([
                    'payment_terms' => $paymentTerms,
                    'delivery_method' => $deliveryMethod,
                    'order_id' => $orderId,
                ])) {
                    return $stmt->rowCount() > 0;
                }
            }
            return false;
        }

        function addToOrderDirectly($userId, $ISBN, $amount, $totalPrice, $paymentTerms, $deliveryMethod) {
            $db = $this->getDB();
            $sql = 'insert into `order`(user_id, book_ISBN, amount, total_price, delivery_method, order_status) 
                    values (:user_id, :ISBN, :amount, :total_price, :delivery_method, \'已付款\')';
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute([
                    'user_id' => $userId, 'ISBN' => $ISBN, 'amount' => $amount,
                    'total_price' => $totalPrice, 'payment' => $paymentTerms, 'delivery_method' => $deliveryMethod,
                ])) {
                    return $stmt->rowCount() > 0;
                }
            }
            return false;
        }

        function deleteOrder($orderId) {
            $db = $this->getDB();
            $sql = 'update `order` set order_status = \'已退货\' where id = :order_id';
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute([
                    'order_id' => $orderId,
                ])) {
                    return $stmt->rowCount();
                }
            }
            return false;
        }

        function deleteShoppingCartItem($orderId) {
            $db = $this->getDB();
            $sql = 'delete from `order` where id = :order_id';
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute([
                    'order_id' => $orderId,
                ])) {
                    return $stmt->rowCount();
                }
            }
            return false;
        }

    }
