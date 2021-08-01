# REST API для работы с коллекцией контактов

<https://github.com/BigunetsT?tab=repositories>

## Пользователь

**POST /users/signup** Создать нового пользователя

**POST /users/login** Залогинить пользователя

**POST /users/logout** Разлогинить пользователя

**POST /users/current** Получить информацию о текущем пользователе

**PATCH /users/subscription** Обновить подписку пользователя

**PATCH /users/avatars** Обновить аватарку пользователя

**GET /users/verify/:verificationToken** Верификация почты пользователя

**POST /users/verify** Повторная отправка письма пользователю с ссылкой для верификации

## Контакт

**GET /contacts** Получить все контакты пользователя

**POST /contacts** Создать новый контакт

**DELETE /contacts/:contactId** Удалить контакт

**PUT /contacts/:contactId** Обновить существующий контакт

**PATCH /contacts/:contactId/favorite** Обновить статус контакта
