1) Commands for Node.js installation: <br />

   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash <br />
   nvm install 20.10 <br /> <br />

2) Commands for MongoDB installation: <br />

   sudo apt-get install gnupg curl<br />

   curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \ <br />
      sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \ <br />
      --dearmor <br />
   
   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list <br />

   sudo apt-get update <br />

   sudo apt-get install -y mongodb-org <br />

3) Command to start MongoDB: <br />

   sudo systemctl start mongod<br />

4) How to run:<br />
   run "nvm install" and then "nvm start" in server directory<br />

   run "nvm install" and then "nvm start" in client directory<br />

   The application will open in the browser<br />
