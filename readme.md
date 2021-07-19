# REST API для работы с коллекцией контактов

<https://github.com/BigunetsT?tab=repositories>

## Пользователь

**POST /users/signup** Создать нового пользователя

**POST /users/login** Залогинить пользователя

**POST /users/logout** Разлогинить пользователя

**POST /users/current** Получить информацию о текущем пользователе

**PATCH /users/subscription** Обновление подписки пользователя

## Контакт

**GET /contacts** Получить все контакты пользователя

**POST /contacts** Создать новый контакт

**DELETE /contacts/:contactId** Удалить контакт

**PUT /contacts/:contactId** Обновить существующий контакт

**PATCH /contacts/:contactId/favorite** Обновление статуса контакта
