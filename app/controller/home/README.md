## controller - home

> 所有接口均以json形式返回数据, \
> 若执行成功, 返回信息中的err_code均为0, \
> 否则返回错误代码及相对的信息
---
### 例如:
* register.php
  * 参数: 
  ```json
  {
    "username": "string",
    "password": "string",
    "authority": "string",
    "age": "integer",
    "contact_info": "string",
    "gender": "string"  
  }
  ```
  * `post`: 注册用户，成功错误代码为0，返回用户ID，失败返回错误信息
    * 注册成功
    > 返回数据:`err_code: 0, user_id: 对应用户的ID`
    ```
    {
        "err_code": 0,
        "user_id": user_id
    }
    ```
    * 注册失败
    > 返回数据: `err_code: 1, err_info: 'register failed'`
    ```
    {
        "err_code": 1,
        "err_info": "insert failed"
    }
    ```    

---

* login.jsp
  * `post`: 用户登录, 成功则将用户ID存入当前session中，返回成功信息，否则返回失败信息
  

* getProfile.php
  * 

* captchaGenerator.php


* getCaptcha.php
