# REST API для работы с коллекцией контактов

<https://github.com/BigunetsT?tab=repositories>

## Пользователь

**POST /users/signup** Создать нового пользователя
**POST /users/login** Залогинить пользователя
**POST /users/logout** Разлогинить пользователя
**POST /users/current** Получить информацию о текущем пользователе
**PATCH /users/subscription** Обновление подписки пользователя

### Схема пользователя

> const userSchema = new Schema(
> {
> password: {
> type: String,
> required: [true, 'Password is required'],
> },
> email: {
> type: String,
> required: [true, 'Email is required'],
> unique: true,
> },
> subscription: {
> type: String,
> enum: ['starter', 'pro', 'business'],
> default: 'starter',
> },
> token: {
> type: String,
> default: null,
> },
> }
> )

## Контакт

**GET /contacts** Получить все контакты пользователя
**POST /contacts** Создать новый контакт
**DELETE /contacts/:contactId** Удалить контакт
**PUT /contacts/:contactId** Обновить существующий контакт
**PATCH /contacts/:contactId/favorite** Обновление статуса контакта

### Схема контакта

> const contactSchema = new Schema(
> {
> name: {
> type: String,
> required: [true, 'Set name for contact'],
> },
> email: {
> type: String,
> },
> phone: {
> type: String,
> },
> favorite: {
> type: Boolean,
> default: false,
> },
> owner: {
> type: mongoose.SchemaTypes.ObjectId,
> ref: 'user',
> },
> }
> )
