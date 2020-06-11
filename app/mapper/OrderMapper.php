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
            $sql = 'select `order`.id, amount, order_status, book.name, book.unit_price, total_price 
                    from book, `order`, user 
                    where user.id = user_id 
                      and book.ISBN = book_ISBN ';
            $stmt = $db->query($sql);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        /**
         * @param $userId
         * @return array|bool
         */
        function getOrders($userId) {
            $db = $this->getDB();
            $sql = 'select `order`.id, book_ISBN, amount, order_status, book.name, book.unit_price, total_price 
                    from book, `order`, user 
                    where user.id = user_id 
                      and book.ISBN = book_ISBN 
                      and user_id = :user_id';
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute([
                    'user_id' => $userId,
                ])) {
                    return $stmt->fetchAll(PDO::FETCH_ASSOC);
                }
            }
            return false;
        }

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

        function addToOrder($userId, $ISBN, $amount, $totalPrice, $paymentTerms, $delivery_method) {

        }

        function addToOrderDirectly($userId, $ISBN, $amount, $totalPrice, $paymentTerms, $delivery_method) {

        }

    }
