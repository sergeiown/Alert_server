/* Copyright (c) 2024 Serhii I. Myshko
https://github.com/sergeiown/Alert_Server/blob/main/LICENSE */

'use strict';

const fs = require('fs').promises;
const path = require('path');

const restoreConfigFiles = async () => {
    const backupDir = path.join(process.env.TEMP, 'backup_configs');
    const configFiles = ['location.json', 'settings.json', 'event.log'];

    try {
        await fs.access(backupDir);

        for (const file of configFiles) {
            const backupFilePath = path.join(backupDir, file);
            const targetFilePath = path.join(process.cwd(), file);

            try {
                await fs.access(backupFilePath);
                await fs.copyFile(backupFilePath, targetFilePath);
            } catch (err) {
                console.error(`Backup file not found: ${backupFilePath}`, err);
            }
        }

        try {
            await fs.rm(backupDir, { recursive: true });
        } catch (err) {
            console.error(`Failed to remove backup directory: ${backupDir}`, err);
        }
    } catch (err) {
        return;
    }
};

module.exports = { restoreConfigFiles };