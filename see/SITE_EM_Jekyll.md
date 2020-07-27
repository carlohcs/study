Curso grátis de Jekyll -> http://willianjusten.teachable.com/p/criando-sites-estaticos-com-jekyll

gem install jekyll -v 3.1.6

1- Crie o repositório no github com a extensão "github.io". 
Exemplo: https://github.com/carlohcs/carlohcs.github.io.git

2 - Clone o repositório para a máquina, acesse-o

3 - instalar o Ruby
sudo apt-get install ruby-full

4 - Instalar o Ruby Gems
https://rubygems.org/pages/download
Com apenas isso funcionou: gem update --system  

5 - Se der erro com essa mensagem:

#http://stackoverflow.com/a/40498784/3929980
Instale: 
sudo gem install bundler

6 - remova todos os arquivos novamente da pasta e rode novamente o comando

- Execute o comando 
jekyll new ./

4 - Acesse https://github.com/carlohcs/carlohcs.github.io/settings

5 - Na guia "GitHub Pages"
  - Clique em "Launch automatic page generator"
  - Clique em "Continue to layouts"
  - Clique em "Publish"
  
- Você pode ver sua página funcionando em  https://carlohcs.github.io/

- Remova o conteúdo de dentro da pasta.

- Execute o comando 
jekyll new ./

- Execute o comando
jekyll server dev.carlohcs.github.io:4000

- Você pode adicionar hosts a sua máquina para responder com o nome de dev.carlohcs.github.io:4000

- Você pode baixar um tema, remover todos os arquivos da pasta atual e colar com o conteúdo do novo tema

- Ferramentas/PLugins itens adaptados para o Jekyll
http://import.jekyllrb.com/


