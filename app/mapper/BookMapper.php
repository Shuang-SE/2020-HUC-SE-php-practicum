<?php

    namespace app\mapper;
    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/core/Model.php';

    use app\core\Model;
    use PDO;

    class BookMapper extends Model {

        function count($keyword = null, $type = null) {
            $sql = 'select count(*) as c from book';
            $params = [];
            if (!empty($type)) {
                $sql .= ', type where type_id = type.id and type.name = :type ';
                $params['type'] = $type;
            } else {
                $sql .= ' where 1 = 1';
            }
            if (!empty($keyword)) {
                $sql .= ' and (
                        book.ISBN like :keyword or
                        book.name like :keyword
                        )';
                $params['keyword'] = "%$keyword%";
            }
            $db = $this->getDB();
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute($params)) {
                    return $stmt->fetch(PDO::FETCH_ASSOC)['c'];
                } else {
                    return $stmt->errorInfo();
                }
            }
            return false;
        }

        /**
         * @param int $page
         * @param int $size
         * @param string|null $keyword
         * @param string|null $type
         * @return array|bool
         */
        function getPagesOfBooks(int $page = 1, int $size = 10, string $keyword = null, string $type = null) {
            $db = $this->getDB();
            $start = $size * ($page - 1);
            $params = [
                'keyword' => "%$keyword%",
            ];
            $tmp = '';
            if (!empty($type)) {
                $tmp = ' and type . name = :type ';
                $params['type'] = $type;
            }
            $sql = "select ISBN, book.name, author, unit_price, cover, type.name as type 
                    from book, type 
                    where type_id = type.id 
                      " . $tmp . "
                      and (
                        ISBN like :keyword or
                        book.name like :keyword
                      )                    
                    limit $start, $size";
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute($params)) {
                    return $stmt->fetchAll(PDO::FETCH_ASSOC);
                }
            }
            return false;
        }

        function getBookByISBN($ISBN) {
            $db = $this->getDB();
            if ($stmt = $db->prepare('select book.*, type.name as type from book, type where type_id = type.id and ISBN = :ISBN')) {
                $stmt->execute([
                    'ISBN' => $ISBN
                ]);
                return $stmt->fetch(PDO::FETCH_ASSOC);
            }
            return false;
        }

        function getTypes() {
            $db = $this->getDB();
            if ($stmt = $db->query('select name as class from type')) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            return false;
        }

    }
