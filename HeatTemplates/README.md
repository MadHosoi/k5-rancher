
#Heat templates

NOTE: It's important that the K5 user has cpf_systemowner role assigned to the current K5 Project.

#SSL Certs

openssl req -new -sha256 -key cnets-mdiego.pem -out cnets-mdiego.csr
openssl req -x509 -sha256 -days 365 -key cnets-mdiego.pem -in cnets-mdiego.csr -out cnets-mdiego-certificate.pem

sudo docker run -d -v /var/rancher/mysql:/var/lib/mysql --restart=unless-stopped -p 8080:8080 -e CATTLE_UI.PL=Fujitsu.CNETS --name rancher-server rancher/server:stable