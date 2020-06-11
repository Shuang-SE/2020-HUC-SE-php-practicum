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
                if ($stmt = $db->prepare('select id, username, age, gender,contact_info, authority from user where username like :username')) {
                    $stmt->execute([
                        'username' => "%$username%"
                    ]);
                }
            } else {
                $stmt = $db->query('select id, username, age, gender,contact_info, authority from user');
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

        function getBriefUserById($id) {
            $db = $this->getDB();
            if ($stmt = $db->prepare('select username, icon from user where id = :id')) {
                $stmt->execute([
                    'id' => $id
                ]);
                return $stmt->fetch(PDO::FETCH_ASSOC);
            }
            return false;
        }

        /**
         * @param $username
         * @param $password
         * @return bool|mixed
         */
        function getUserId($username, $password) {
            $db = $this->getDB();
            if ($stmt = $db->prepare(
                'select id from user where username = :username and password = :password'
            )) {
                $stmt->execute([
                    'username' => $username,
                    'password' => $password
                ]);
                if ($res = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    return $res['id'];
                }
            }
            return false;
        }

        /**
         * @param $username
         * @return bool
         */
        function isDuplicated($username) {
            $db = $this->getDB();
            if ($stmt = $db->prepare(
                'select count(*) as c from user where username = :username'
            )) {
                $stmt->execute([
                    'username' => $username
                ]);
                if ($res = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    return $res['c'] > 0;
                }
            }
            return false;
        }

        /**
         * @param $username
         * @param $password
         * @return bool
         */
        function exists($username, $password) {
            $db = $this->getDB();
            if ($stmt = $db->prepare(
                'select password from user where username = :username'
            )) {
                $stmt->execute([
                    'username' => $username,
                ]);
                if ($res = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    return password_verify($password, $res['password']);
                }
            }
            return false;
        }

        function isAdmin($userId) {
            $db = $this->getDB();
            $sql = 'select authority from user where id = :user_id';
            if ($stmt = $db->prepare($sql)) {
                if ($stmt->execute(['user_id' => $userId])) {
                    if ($res = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        return $res['authority'] === 'admin';
                    }
                }
            }
            return false;
        }

        /**
         * insert a user info into database,
         * return FALSE if insert failed
         * @param string $username
         * @param string $password
         * @param string $age
         * @param string $contactInfo
         * @param string $gender
         * @return bool
         */
        function addUser(string $username, string $password, string $age, string $contactInfo, string $gender) {
            $db = $this->getDB();
            if ($stmt = $db->prepare(<<<INSERT
insert into user(username, password, age, contact_info, gender) 
values (:username, :password, :age, :contact_info, :gender) 
INSERT
            )) {
                if ($stmt->execute([
                    'username' => $username, 'password' => password_hash($password, PASSWORD_DEFAULT),
                    'age' => $age,
                    'contact_info' => $contactInfo, 'gender' => $gender
                ])) {
                    return $db->lastInsertId();
                }
            }
            return false;
        }

        /**
         * @param string $username
         * @param string $age
         * @param string $contactInfo
         * @param string $gender
         * @return bool
         */
        function updateUser(string $id, string $username, string $age, string $contactInfo, string $gender) {
            $db = $this->getDB();
            $result = false;
            if ($stmt = $db->prepare(<<<UPDATE
update user set username = :username, age = :age, contact_info = :contact_info, gender = :gender 
where id = :user_id
UPDATE
            )) {
                if ($stmt->execute([
                    'username' => $username, 'age' => $age, 'contact_info' => $contactInfo,
                    'gender' => $gender, 'user_id' => $_SESSION['user_id'],
                ])) {
                    return true;
                }
            }
            return false;
        }

        function updatePassword($id, $password) {
            $db = $this->getDB();
            if (!empty($password)) {
                $password = password_hash($password, PASSWORD_DEFAULT);
                if ($stmt = $db->prepare(<<<UPDATE
update user set password = :password where id = :user_id 
UPDATE
                )) {
                    if ($stmt->execute([
                        'password' => $password,
                        'user_id' => $id,
                    ])) {
                        return true;
                    }
                }
            }
            return false;
        }

        function updateIcon($id, $icon) {
            $db = $this->getDB();
            if (!empty($cover)) {
                if ($stmt = $db->prepare(<<<UPDATE
update user set icon = :icon where id = :user_id
UPDATE
                )) {
                    if ($stmt->execute([
                        'icon' => $icon,
                        'user_id' => $id,
                    ])) {
                        return true;
                    }
                }
            }
            return false;
        }

    }
