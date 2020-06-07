<?php

    namespace app\mapper;
    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/core/Model.php';

    use app\core\Model;
    use PDO;

    class BookMapper extends Model {

        function getBooks(string $name = null) {
            $db = $this->getDB();
            if ($name) {
                if ($stmt = $db->prepare('select * from book where name = :name')) {
                    $stmt->execute([
                        'name' => $name
                    ]);
                }
            } else {
                $stmt = $db->query('select * from book');
            }
            if ($stmt) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            return null;
        }

        function getBriefBooks(string $name = null) {
            $db = $this->getDB();
            if ($name) {
                if ($stmt = $db->prepare('select ISBN, name, type, unit_price, icon from book where name = :name')) {
                    $stmt->execute([
                        'name' => $name
                    ]);
                }
            } else {
                $stmt = $db->query('select ISBN, name, type, unit_price, icon from book');
            }
            if ($stmt) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            return null;
        }

        function getBookByISBN($ISBN) {
            $db = $this->getDB();
            if ($stmt = $db->prepare('select * from book where ISBN = :ISBN')) {
                $stmt->execute([
                    'ISBN' => $ISBN
                ]);
                return $stmt->fetch(PDO::FETCH_ASSOC);
            }
            return false;
        }

        function getBriefUserByISBN($ISBN) {
            $db = $this->getDB();
            if ($stmt = $db->prepare('select ISBN, name, type, unit_price, icon from book where ISBN = :ISBN')) {
                $stmt->execute([
                    'ISBN' => $ISBN
                ]);
                return $stmt->fetch(PDO::FETCH_ASSOC);
            }
            return false;
        }

        function isDuplicated($ISBN) {
            $db = $this->getDB();
            if ($stmt = $db->prepare(
                'select count(*) as c from book where ISBN = :ISBN'
            )) {
                $stmt->execute([
                    'ISBN' => $ISBN
                ]);
                if ($res = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    return $res['c'] > 0;
                }
            }
            return false;
        }

        function addBook(string $ISBN, string $name, string $author, string $press, string $publication_date,
                         string $unit_price, string $quantity, string $type, string $brief, string $electronic,
                         string $icon) {
            $db = $this->getDB();
            if ($stmt = $db->prepare(<<<INSERT
insert into book(
                 ISBN, name, author, press, publication_date, 
                 unit_price, quantity, type, brief, electronic, icon
                 ) 
values (
        :ISBN, :name, :author, :press, :publication_date, 
        :unit_price, :quantity, :type, :brief, :electronic, :icon
        ) 
INSERT
            )) {
                if ($stmt->execute([
                    'ISBN' => $ISBN, 'name' => $name, 'author' => $author, 'press' => $press,
                    'publication_date' => $publication_date, 'unit_price' => $unit_price, 'quantity' => $quantity,
                    'type' => $type, 'brief' => $brief, 'electronic' => $electronic, 'icon' => $icon

                ])) {
                    return $db->lastInsertId();
                }
            }
            return false;
        }
    }
