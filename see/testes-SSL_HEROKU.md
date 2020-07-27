Make sure your web server displays the following content at
http://missaopessoal.com.br/.well-known/acme-challenge/4bMG85u1hjrm1YyX3ODKV5JCkUaVy54R3CQw78n0xkA before continuing:

4bMG85u1hjrm1YyX3ODKV5JCkUaVy54R3CQw78n0xkA.Ua1DhAv9Y7Dk5HBf34YRHC-5kSNPJjrhpBC_eJot0h8





printf "%s" 4bMG85u1hjrm1YyX3ODKV5JCkUaVy54R3CQw78n0xkA.Ua1DhAv9Y7Dk5HBf34YRHC-5kSNPJjrhpBC_eJot0h8 > 4bMG85u1hjrm1YyX3ODKV5JCkUaVy54R3CQw78n0xkA

// Get SSL file from server
curl http://missaopessoal.com.br/ssl/4bMG85u1hjrm1YyX3ODKV5JCkUaVy54R3CQw78n0xkA


http://missaopessoal.com.br/.well-know/acme-challenge/4bMG85u1hjrm1YyX3ODKV5JCkUaVy54R3CQw78n0xkA
http://missaopessoal.com.br/well-know/acme-challenge/4bMG85u1hjrm1YyX3ODKV5JCkUaVy54R3CQw78n0xkA

O server só reconhece um nível de pasta
utilize preferencialmente pastas com nome simples, ao inves do tipo "well-known"


heroku vim --app missaopessoal


./certbot-auto certonly --manual --email carlohcs@gmail.com -d missaopessoal.com.br -d www.missaopessoal.com.br

// Morreu: heroku labs:enable http-sni --app missaopessoal
heroku plugins:install heroku-certs


http://missaopessoal.com.br/.well-known/acme-challenge/hj630aOSb_EZZpKt9ZQ3Lrrq673GtsCpvTvAIZgFYoc before continuing:

hj630aOSb_EZZpKt9ZQ3Lrrq673GtsCpvTvAIZgFYoc.Ua1DhAv9Y7Dk5HBf34YRHC-5kSNPJjrhpBC_eJot0h8


heroku logs --force-colors -a missaopessoal -t


// DEPOIS DE TER GERADO O ARQUIVO DO LETS'ENCRYPT
sudo heroku certs:add --app missaopessoal /etc/letsencrypt/live/missaopessoal.com.br/fullchain.pem /etc/letsencrypt/live/missaopessoal.com.br/privkey.pem

