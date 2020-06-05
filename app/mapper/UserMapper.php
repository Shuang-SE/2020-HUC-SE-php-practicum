<?php


    namespace app\mapper;
    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/core/Model.php';

    use app\core\Model;
    use PDO;

    class UserMapper extends Model {

        /**
         * get all users if the parameter is null, else return a fuzzy search result by username,
         * return FALSE if query failed
         * @param string|null $username
         * @return array|bool
         */
        function getUsers(string $username = null) {
            $db = $this->getDB();
            if ($username) {
                if ($stmt = $db->prepare('select * from user where username like :username')) {
                    $stmt->execute([
                        'username' => "%$username%"
                    ]);
                }
            } else {
                $stmt = $db->query('select * from user');
            }
            if ($stmt) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            return false;
        }

        /**
         * find a user by id,
         * return FALSE if query failed
         * @param $id
         * @return bool|mixed
         */
        function getUserById($id) {
            $db = $this->getDB();
            if ($stmt = $db->prepare('select * from user where id = :id')) {
                $stmt->execute([
                    'id' => $id
                ]);
                return $stmt->fetch(PDO::FETCH_ASSOC);
            }
            return false;
        }

        /**
         * insert a user info into database,
         * return FALSE if insert failed
         * @param string $username
         * @param string $password
         * @param string $authority
         * @param string $age
         * @param string $contactInfo
         * @param string $gender
         * @return bool
         */
        function addUser(string $username, string $password, string $authority,
                         string $age, string $contactInfo, string $gender) {
            $db = $this->getDB();
            if ($stmt = $db->prepare(<<<INSERT
insert into user(username, password, authority, age, contact_info, gender) 
VALUES (:username, :password, :authority, :age, :contact_info, :gender) 
INSERT
            )) {
                if ($stmt->execute([
                    'username' => $username, 'password' => $password,
                    'authority' => $authority, 'age' => $age,
                    'contact_info' => $contactInfo, 'gender' => $gender
                ])) {
                    return $db->lastInsertId();
                }
            }
            return false;
        }
    }