THE BLOODLINE WEBSITE — VERSION 2

FILES
- index.html: home page
- style.css: shared design styles
- style-pages.css: styles for registration and welcome pages
- script.js: navigation
- registration.js: registration form validation/messages
- inscription.php: registration controller and session lock
- inscription.html: registration page markup (blocked from direct URL)
- welcome.php: protected welcome page controller
- welcome.html: welcome page markup
- connection.php: PDO database connection
- bloodline.sql: database and table
- .htaccess: blocks direct access to inscription.html

IMPORTANT SETUP
1. Extract the folder into C:\xampp\htdocs\the_bloodline_website_v2
2. Start Apache and MySQL in XAMPP.
3. Open http://localhost/phpmyadmin
4. Import bloodline.sql.
5. Open http://localhost/the_bloodline_website_v2/

DEFAULT XAMPP DATABASE SETTINGS
Host: localhost
Database: bloodline_fans
Username: root
Password: (empty)

JOIN FLOW
- Click JOIN THE BLOODLINE on the home page.
- inscription.php checks the session and displays the registration form.
- A successful registration is saved in MySQL.
- The session is marked as joined and the visitor is redirected to welcome.php.
- Trying to open inscription.php again in the same browser session redirects to welcome.php.
- A duplicate email is rejected by the database unique constraint.

SESSION LIMITATION
The registration lock is per browser session, not a permanent account login.
A new browser session or cleared cookies can open the registration page again.
For permanent account-based restrictions, add login/password authentication.

PHOTOS
Images are loaded from Wikimedia Commons using Special:FilePath links.
Internet access is required to display them. Review each image's file page for its
license and attribution requirements before publishing the site publicly.
