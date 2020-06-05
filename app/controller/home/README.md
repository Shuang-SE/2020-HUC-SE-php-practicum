## controller - home

* register.php
  * `post`: 注册用户，返回json
    * 注册成功
    ```
    {
        "err_code": 0,
        "user_id": user_id
    }
    ```
    * 注册失败
    ```
    {
        "status": 1,
        "err_code": "insert failed"
    }
    ```
