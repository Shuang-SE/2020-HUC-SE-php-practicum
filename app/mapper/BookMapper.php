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
                if ($stmt = $db->prepare('select book.*, type.name as type 
                                                        from book, type 
                                                        where book.name like :name 
                                                          and type_id = type.id')) {
                    $stmt->execute([
                        'name' => "%$name%"
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
                if ($stmt = $db->prepare('select ISBN, book.name, type.name as type, unit_price, cover 
                                                        from book, type 
                                                        where book.name like :name 
                                                          and type_id = type.id')) {
                    $stmt->execute([
                        'name' => "%$name%"
                    ]);
                }
            } else {
                $stmt = $db->query('select ISBN, name, type_id, unit_price, cover from book');
            }
            if ($stmt) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            return null;
        }

        function getPagesOfBooks(int $page = 1, int $size = 10, string $keyword = null, string $type = null) {
            $db = $this->getDB();
            $start = $size * ($page - 1);
            $params = [
                'keyword' => "%$keyword%",
            ];
            $tmp = '';
            if (!empty($type)) {
                $tmp = ' and type.name = :type ';
                $params['type'] = $type;
            }
            $sql = "select ISBN, book.name, unit_price, cover, type.name as type 
                    from book, type 
                    where type_id = type.id 
                      " . $tmp . "
                      and (
                        ISBN like :keyword or
                        book.name like :keyword or
                        type.name like :keyword
                      )                    
                    limit $start, $size";
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute($params)) {
                    return $stmt->fetchAll(PDO::FETCH_ASSOC);
                } else {
                    return $stmt->errorInfo();
                }
            }
            return $db->errorInfo();
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

        function getBriefBookByISBN($ISBN) {
            $db = $this->getDB();
            if ($stmt = $db->prepare('select ISBN, book.name, type.name as type, unit_price, cover 
                                                    from book, type 
                                                    where ISBN = :ISBN 
                                                      and type_id = type.id')) {
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
                 unit_price, quantity, type, brief, electronic, cover
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
