# Increasing Import Limits for Large MySQL Databases in XAMPP

## 1. Increase PHP and MySQL Limits

Modify the following settings in `php.ini` and `my.ini` to prevent timeouts and memory issues when importing large databases.

### a) Update `php.ini`

1. Open `C:\xampp\php\php.ini` in a text editor.
2. Increase these values:
   ```ini
   max_execution_time = 3000
   max_input_time = 3000
   memory_limit = 512M
   post_max_size = 512M
   upload_max_filesize = 512M
   ```
3. Save and close the file.

### b) Update `my.ini`

1. Open `C:\xampp\mysql\bin\my.ini` in a text editor.
2. Add or modify the following under `[mysqld]`:
   ```ini
   max_allowed_packet = 512M
   innodb_buffer_pool_size = 512M
   net_read_timeout = 600
   net_write_timeout = 600
   ```
3. Save and close the file.

### c) Restart Apache and MySQL

1. Open the XAMPP Control Panel.
2. Click `Stop` on **Apache** and **MySQL**.
3. Click `Start` to restart both services.

## 2. Importing the Database via Command Line

1. Open the terminal or command prompt.
2. Navigate to MySQL `bin`:
   ```bash
   cd C:\xampp\mysql\bin
   ```
3. Import the database using the following command:
   ```bash
   mysql -u root -p switchwebsite < C:\path\to\your\database_file.sql
   ```
   - Replace `switchwebsite` with your database name.
   - Replace `C:\path\to\your\database_file.sql` with the actual path to your SQL file.

## 3. Fixing `#1046 - No Database Selected` Error

Ensure your SQL file includes:

```sql
USE switchwebsite;
```

If it doesn't, manually add it at the beginning of the file and retry the import.

## 4. Verifying the Import

1. Open [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/).
2. Check if the database appears in the list.
3. If issues persist, restart MySQL and retry the import.

---

Now, you should be able to import large databases without timeout issues!
