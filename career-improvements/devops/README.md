# DevOps

Afim de seguir princípios básicos do DevOps, este repositório reúne estratégias e receitas para melhorar o uso das dependências e o workflow de desenvolvimento.

## Sumário

* [Introdução](#introdu-o)
* [Objetivo do DevOps](#objetivo-do-devops)
* [Riscos](#riscos)
* [Pensamento](#pensamento)
* [Top 10 problemas](#top-10-problemas)
* [Por onde começar?](#por-onde-come-ar-)
* [Conclusões e estatísticas](#conclus-es-e-estat-sticas)
* [Links para acessar](#links-para-acessar)
* [Minhas dependências e objetos de desenvolvimento](#minhas-depend-ncias-e-objetos-de-desenvolvimento)

## Introdução

Segundo o site *Wikipedia*:

> DevOps é a reação à interdependência entre desenvolvimento de software e operações de TI. Pretende ajudar organizações a produzir software e serviços rapidamente. Empresas que liberam novas versões de software frequentemente podem precisar das considerações ou orientações de um DevOps.

![Interdependência na área de T.I](https://upload.wikimedia.org/wikipedia/commons/0/0f/Devops_Traduzido.png
)

**DevOps: É um movimento. É uma revolução.**

[Ver mais em DevOps – Wikipédia, a enciclopédia livre](https://pt.wikipedia.org/wiki/DevOps)

### Documentação baseada nos links

* [DevOps, por onde começar?](http://www.globalcode.com.br/videos/tdc-2015-florianopolis-online/trilha-stadium-quarta/devops-por-onde-comecar)
* [Piratas do DevOps: Navegando em Águas Misteriosas](http://www.globalcode.com.br/videos/tdc-2015-florianopolis-online/trilha-stadium-quarta/piratas-do-devops-navegando-em-aguas-misteriosas)
* [Piratas do DevOps](http://anonovoprojetonovo.com/video-nuvem-e-open-source/)

## Objetivo do DevOps

Foco em teu negócio, usar **SaaS** aumenta tua eficiência e reduz custos. - Lean Startup.

## Riscos

Risco de errar é um padrão do **sucesso** e **inovação**.

***Como evitar?*** Tente diminuir aprendendo da experiência dos outros e de você.

Aprende de seus erros, mas, foque nos acertos. (Cultura Agile).

## Pensamento

> "You might know what won't work, but you still don't know what will work. That’s not much of a lesson."

(Jason Fried - Co-founder Basecamp) -  [https://signalvnoise.com/posts/1555-learning-from-failure-is-overrated](https://signalvnoise.com/posts/1555-learning-from-failure-is-overrated)

#### Hora humana deve ser aproveitada para criar!

## Top 10 problemas

1. **Diferenças entre ambientes** do mesmo projeto: "Na minha máquina funciona."

2. **Falta de padronização** nas soluções implementadas.

3. **Alto custo** para criação de **infraestrutura / topologia**.

4. **Desperdício das experiências** adquiras **entre os projetos**.

5. Refatoração, manutenção e desenvolvimento **geram quebras e atrasos**.

6. **Deploy** custoso, periogo, lento e de baixa frequência.

7. **Alto custo** para **replicação de ambientes**.

8. **Não existe monitoramento pós-deploy**.

9. Time com pouca ou **nenhuma liberdade para realizar melhorias de ambiente**.

10. Horas gastas e tarefas **repetitivas**, onde o **erro humano** tende a crescer exponecialmente pelo **débito técnico.**

## Por onde começar?

### Cultura e Princípios: Cultura é importante!

### Automatizar

* Automatize tudo que não agregue valor pro cliente, aumentando a qualidade e previsibilidade das estimativas.

* Não faça mais: apt-get install ... Opte por: "**Automatização com um toque humano.**" (Jidõka)

#### Ferramentas de automatização

* GitFlow; Githooks; Build scripts.
* BeanstalkApp; Bluemix; Heroku.
* StriderCD; CircleCI; CodeShip;
* Vagrant; Ansible; Ubuntu Juju;
* SourceLab (SouceLab); Cucumbler; Behat.

### Ambientes

#### Local

Desenvolvimento diário, **instável**.

#### DEV

Integrações constantes.

#### QA

Validação e teste de novas features.

#### Stage

Integração de novas features com uma versão de produção.

#### Produção

Ambiente de produção: cliente está vendo.

### Entrega contínua: Kanban

### Cultura de monitoração

### Monitoração

* Pingdom; ServerCheck.in.
* NewRelic; Nagios; Zabbix.
* JMeter; BlazeMeter; Blitz.
* Google Analytics; El Tracker.

### Cultura de compartilhar / Responsabilidade compartilhada

* Comunicação constante.
* Integração contínua.
* Pair programming / Code review.
* Coaching.
* Acordos de trabalho.
* Melhora contínua.
* GitHub; BeanstalkApp; Acquia;
* Acordos de trabalho em equipe;
* Slack; HipChat; Hall; IRC
* Notiticações integradas. (Quando eu dou um push, todos do projeto são notificados)

### Kaizen vs. Kaikaku

Na adoção do DevOps, é possível adotar dois tipos de abordagens/posturas:

**Kaizen**: evolução com pequenos passos. Implementar por exemplo, um CRM por módulos, permitindo que os mesmos possam ser utilizados.

**Kaikaku**: uma grande mudança de um dia para outro. Implementar por exemplo, um CRM ao longo de um ano e só depois utilizar.

#### Antes de apresentar algo...

Coma sua própria comida. Teste você mesmo antes de expor ao time.

## Conclusões e estatísticas

### Mas será que funciona?

Com mais ou menos **1 ano de DevOps**:

* Frequência de entrega de código: **30x mais frequente**.

* Velocidade de entrega de código: **8000x mais rápido! Prazos se encurtam**.

* Entrega de código com **menos bugs**. **50% menos bugs**.

#### Para tudo isso...

Para se alcançar tudo isso, confiança e respeito são itens cruciais.

## Links para acessar

* [10+ Deploys per Day (2009) - John Allspaw - Flickr](bit.ly/1AVGcOt)
* [2014 State of DevOps - Puppet Labs and IT Revolution Press](bit.ly/1ptXa92m)

## Minhas dependências e objetos de desenvolvimento

Veja [aqui](./SUMMARY.md).
