### Runbook for Swapmeet.
## This runbook assumes the following:
    * That the user has the Swapmeet Github repository cloned locally.
    * That the user has a Digital Ocean account, and the user has created a Droplet.  This droplet should use Ubuntu 20.04 (LTS) x64
    * That the user has created an SSH key somewhere on their computer, and that the SSH key is NOT BEING PUSHED TO THE REMOTE REPOSITORY.
    * Secure copy (scp) is installed on the user's computer.
    * A MongoDB has already been set up
    * There is a Cloudflare account
## Task 1: Link the SSH key to the server.
1. From the Digital Ocean web application, select the Droplet that has been created for the Swapmeet web applcation.
2.  Select "Access" from the menu on the left side of the page.
3. Click "Launch Droplet Console" under the "Droplet Console" heading.  A console will open.
4. Type the following command to edit the SSH keys that are allowed for the server:
    ```nano .ssh/authorized_keys```.
5. Copy the contents of the public portion of the SSH key into the text editor displayed in the console.  Save the changes made to the authorized_keys file.  Close the text editor and return to the console.
6. The user should now be able to use their private SSH key to connect to the server.

## Task #2: Login to the server
1. Open up Windows PowerShell, or another shell of your choice on your PC.
2. In the shell, type ```ssh -i [path_to_key] root@[ip_server_address]```.  This will allow the user to run commands on the server.

## Task #3: Install ngnix and npm, among other packages
1. Type the command ``` sudo apt update ```
2. Type the command ```sudo apt install nginx```
3. nginx is now installed on the Droplet.
4. Type the command ```sudo apt-get install nodejs npm```
5. npm is now installed on the Droplet.
6. Type the command ```npm install```
7. Type the command ```npm install dotenv```
8. Type the command ```npm install -g n```
9. Type the command ```sudo n stable```
10. Type the command ```PATH="$PATH"```
11. Type the command ```npm install mongoose```
12. Type the command ```npm install typescript```
13. All applicable packages are now installed.

## Task #4: Configure nginx
1. To configure nginx, type the command ```sudo nano /etc/nginx/sites-available/autafi.com``.  A text editor pops up in the shell
2. To route the web application correctly, paste in the following code:
```
server {
        listen 80;
        listen [::]:80;
        server_name autafi.com www.autafi.com;
        return 302 https://$server_name$request_uri;
}

server {

    # SSL configuration

    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    ssl_certificate         /etc/ssl/cert.pem;
    ssl_certificate_key     /etc/ssl/key.pem;
    ssl_client_certificate /etc/ssl/cloudflare.pem;
    ssl_verify_client on;
    server_name autafi.com www.autafi.com;

    root /srv/dist;
    index index.html index.htm index.nginx-debian.html;


    location / {
            try_files $uri $uri/ =404;
    }
}

```
3. Activate the firewall by running the following command : ```sudo ufw enable```
4. Create an origin certificate under your Cloudflare account.  Save the contents of a certificate to a file.
5. In the server, type ```sudo nano /etc/ssl/cert.pem``` and paste the contents of the certificate into the file.
6. In the server, type ```sudo nano /etc/ssl/key.pem``` and paste the contents of the key into the file
7. To for the CA certificate, type the command ```/etc/ssl/cloudflare.pem``` and paste in the following:
```
-----BEGIN CERTIFICATE-----
MIIGCjCCA/KgAwIBAgIIV5G6lVbCLmEwDQYJKoZIhvcNAQENBQAwgZAxCzAJBgNV
BAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMRQwEgYDVQQLEwtPcmln
aW4gUHVsbDEWMBQGA1UEBxMNU2FuIEZyYW5jaXNjbzETMBEGA1UECBMKQ2FsaWZv
cm5pYTEjMCEGA1UEAxMab3JpZ2luLXB1bGwuY2xvdWRmbGFyZS5uZXQwHhcNMTkx
MDEwMTg0NTAwWhcNMjkxMTAxMTcwMDAwWjCBkDELMAkGA1UEBhMCVVMxGTAXBgNV
BAoTEENsb3VkRmxhcmUsIEluYy4xFDASBgNVBAsTC09yaWdpbiBQdWxsMRYwFAYD
VQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlhMSMwIQYDVQQD
ExpvcmlnaW4tcHVsbC5jbG91ZGZsYXJlLm5ldDCCAiIwDQYJKoZIhvcNAQEBBQAD
ggIPADCCAgoCggIBAN2y2zojYfl0bKfhp0AJBFeV+jQqbCw3sHmvEPwLmqDLqynI
42tZXR5y914ZB9ZrwbL/K5O46exd/LujJnV2b3dzcx5rtiQzso0xzljqbnbQT20e
ihx/WrF4OkZKydZzsdaJsWAPuplDH5P7J82q3re88jQdgE5hqjqFZ3clCG7lxoBw
hLaazm3NJJlUfzdk97ouRvnFGAuXd5cQVx8jYOOeU60sWqmMe4QHdOvpqB91bJoY
QSKVFjUgHeTpN8tNpKJfb9LIn3pun3bC9NKNHtRKMNX3Kl/sAPq7q/AlndvA2Kw3
Dkum2mHQUGdzVHqcOgea9BGjLK2h7SuX93zTWL02u799dr6Xkrad/WShHchfjjRn
aL35niJUDr02YJtPgxWObsrfOU63B8juLUphW/4BOjjJyAG5l9j1//aUGEi/sEe5
lqVv0P78QrxoxR+MMXiJwQab5FB8TG/ac6mRHgF9CmkX90uaRh+OC07XjTdfSKGR
PpM9hB2ZhLol/nf8qmoLdoD5HvODZuKu2+muKeVHXgw2/A6wM7OwrinxZiyBk5Hh
CvaADH7PZpU6z/zv5NU5HSvXiKtCzFuDu4/Zfi34RfHXeCUfHAb4KfNRXJwMsxUa
+4ZpSAX2G6RnGU5meuXpU5/V+DQJp/e69XyyY6RXDoMywaEFlIlXBqjRRA2pAgMB
AAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgECMB0GA1Ud
DgQWBBRDWUsraYuA4REzalfNVzjann3F6zAfBgNVHSMEGDAWgBRDWUsraYuA4REz
alfNVzjann3F6zANBgkqhkiG9w0BAQ0FAAOCAgEAkQ+T9nqcSlAuW/90DeYmQOW1
QhqOor5psBEGvxbNGV2hdLJY8h6QUq48BCevcMChg/L1CkznBNI40i3/6heDn3IS
zVEwXKf34pPFCACWVMZxbQjkNRTiH8iRur9EsaNQ5oXCPJkhwg2+IFyoPAAYURoX
VcI9SCDUa45clmYHJ/XYwV1icGVI8/9b2JUqklnOTa5tugwIUi5sTfipNcJXHhgz
6BKYDl0/UP0lLKbsUETXeTGDiDpxZYIgbcFrRDDkHC6BSvdWVEiH5b9mH2BON60z
0O0j8EEKTwi9jnafVtZQXP/D8yoVowdFDjXcKkOPF/1gIh9qrFR6GdoPVgB3SkLc
5ulBqZaCHm563jsvWb/kXJnlFxW+1bsO9BDD6DweBcGdNurgmH625wBXksSdD7y/
fakk8DagjbjKShYlPEFOAqEcliwjF45eabL0t27MJV61O/jHzHL3dknXeE4BDa2j
bA+JbyJeUMtU7KMsxvx82RmhqBEJJDBCJ3scVptvhDMRrtqDBW5JShxoAOcpFQGm
iYWicn46nPDjgTU0bX1ZPpTpryXbvciVL5RkVBuyX2ntcOLDPlZWgxZCBp96x07F
AnOzKgZk4RzZPNAxCXERVxajn/FLcOhglVAKo5H0ac+AitlQ0ip55D2/mf8o72tM
fVQ6VpyjEXdiIXWUq/o=
-----END CERTIFICATE-----
```
8. Type ```sudo ln -s /etc/nginx/sites-available/autafi.com /etc/nginx/sites-enabled/``` to link the files
9. Type the command ```sudo nano /etc/nginx/nginx.conf```
10. Find the server_names_hash_bucket_size directive and remove the # symbol to uncomment the line:
```
http {
    ...
    server_names_hash_bucket_size 64;
    ...
}
```
6. Type the command ```nginx -t && nginx -s reload```
7. nginx is now properly configured for the application

## Task #5: Upload the web application front end to the server
1. Navigate to /SwapMeet folder in the local Github repository mentioned in the prerequisites via a command shell.
2. Type ```npm run build``` to create a packaged web application.  This packaged web application will be stored in /SwapMeet/dist.
3. Type in the following command: ```scp -i [key_file_path] -r [swapmeet_file_path]/SwapMeet/dist root@[droplet_ip_address]:/srv```
4. The packaged web application is now in the folder /srv/dist

## Task #6: Upload the web application back end to the server
1. Navigate to /SwapMeet folder in the local Github repository mentioned in the prerequisites via a command shell.
2. Type in the following command: ```scp -i [key_file_path] -r [swapmeet_file_path]/SwapMeet/server root@[droplet_ip_address]:/srv```
3. The web application back end is now in the folder /srv/server
4. Navigate to this folder on the server side.  In the .env file, change the variable BASE_URL to ```http://autafi.com```

## Task #7: Install pm2
Prerequisite: Task 2 has been completed and the user is still logged into the server
1.  Type the command ```npm install pm2 -g``` from any file location on the server
2. pm2 is now installed globally on the server

## Task #8: Start the application
Prerequisite: Task 2 has been completed and the user is still logged into the server
1. Navigate to /srv/server
2. Type the command ```pm2 start index.js```
3. The application should now be running.