# ine5646-g9-monorepo
Este repositório é um monorepo do trabalho em grupo da matéria INE5646 - Programação Web. 

## Proposta

Nosso objetivo é criar um aplicativo web onde pessoas possam fazer perguntas no formato de pools (perguntas com alternativas).

Um usuário pode se registrar e fazer login. Ao se registrar o usuário recebe 10 pontos que serão usados para fazer duas coisas: criar perguntas e responder perguntas.


Ao criar uma pergunta, um valor X (inicialmente 10) é gasto da sua conta e então ele define em quanto tempo ele quer que saia o resultado, o titulo da pergunta e as alternativas.


Usuários também podem responder perguntas de outros usuários ao gastar Y pontos (inicialmente 1). Ao final do período escolhido, os que votaram com a maioria ganham os pontos de quem ficou na minoria.


A cada período (inicialmente 1 hora), o usuário pode clicar em um botão para buscar sua recompensa e receber Z pontos (inicialmente 1).

## Tecnologias

Planejamos fazer o frontend usando next js com bootstrap framework e o backend com graphql, prisma e SQL.