
#Heat templates

NOTE: It's important that the K5 user has cpf_systemowner role assigned to the current K5 Project.

#SSL Certs

openssl req -new -sha256 -key cnets-mdiego.pem -out cnets-mdiego.csr
openssl req -x509 -sha256 -days 365 -key cnets-mdiego.pem -in cnets-mdiego.csr -out cnets-mdiego-certificate.pem