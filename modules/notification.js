const notifier = require('node-notifier');
const path = require('path');
const checkLocations = require('./checkLocations');
const alertTypes = require('../alert.json');

// Зберігаємо ідентифікатори виведених повідомлень разом із location_title
const displayedAlerts = new Map();

const showNotification = async () => {
    try {
        const { alerts } = await checkLocations();

        alerts.forEach((alert) => {
            // Знаходимо ім'я за ідентифікатором alert_type в файлі alert.json
            const alertType = alertTypes.find((type) => type.id === alert.alert_type);

            // Перевіряємо, чи повідомлення про цей alert вже виведено
            if (!displayedAlerts.has(alert.id)) {
                // Повідомлення про новий alert
                notifier.notify({
                    title: `${alertType ? alertType.name : alert.alert_type}`,
                    message: `${alert.location_title}`,
                    sound: true,
                    icon: path.join(__dirname, '../alert.png'),
                    wait: true,
                    urgency: 'critical',
                });
                // Зберігаємо інформацію про alert для майбутнього використання
                displayedAlerts.set(alert.id, alert.location_title);
            }
        });

        // Перевіряємо, чи alert, який був виведений, більше не існує
        displayedAlerts.forEach((locationTitle, displayedAlert) => {
            if (!alerts.some((alert) => alert.id === displayedAlert)) {
                // Виводимо повідомлення про відміну тривоги
                notifier.notify({
                    title: 'Тривога скасована',
                    message: `${locationTitle}`,
                    sound: true,
                    icon: path.join(__dirname, '../alert.png'),
                    wait: true,
                    urgency: 'critical',
                });
                // Видаляємо ідентифікатор зі списку виведених повідомлень
                displayedAlerts.delete(displayedAlert);
            }
        });
    } catch (error) {
        console.error(`Помилка: ${error.message}`);
    }
};

setInterval(showNotification, 60000);

module.exports = showNotification;
