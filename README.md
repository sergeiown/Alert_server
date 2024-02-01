# Сервер оновлення тривог

Простий Node.js сервер, який із завданою періодичністю отримує дані про тривоги з [alerts.in.ua API](https://alerts.in.ua/) та зберігає їх у файл `current_alert.json` з подальшою обробкою ти виводом пвідомлення про початок та закінчення тривоги для зазначеного регіону України.

![image](https://github.com/sergeiown/Current_Alert/assets/112722061/769aa783-543c-49e6-b482-3e6ccf435d84)

## Встановлення

Встановіть залежності: `npm install`.
Створіть файл `token.json` у корені проекту та додайте свій API токен:

```
{
  "token": "ваш-токен"
}
```

Відредагуйте `location.json` за своєю потребою.

## Використання
Запустіть сервер через термінал, або з використанням `start.bat`, після чого сервер автоматично отримуватиме дані про тривоги кожну хвилину та зберігатиме їх у файлі current_alert.json.
Повідомлення про поточну тривогу та її відміну буде виводитись через центр повідомлень Windows.
Всі дії записуються у `log.txt`.

## Внесок
Якщо у вас є пропозиції або бажання внести внесок до проекту, будь ласка, відкривайте Pull Request.

## Ліцензія
[Copyright (c) 2024 Serhii I. Myshko](https://github.com/sergeiown/Current_Alert/blob/main/LICENSE)
