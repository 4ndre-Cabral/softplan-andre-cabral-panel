# Painel desafio Softplan (softplan-andre-cabral-panel)

Painel com todas as funcionalidades do desafio

---

## Instalação

## Instalar dependências
```bash
npm install
```

### Instalar Quasar
Veja (https://quasar.dev/quasar-cli).

### Apontar app para a URL da api
– Antes de rodar o app é necessário aponta-lo para a URL da api:
Para isso vá até o arquivo config/dev.env.js que fica na raiz do projeto e altere a variável API
```json
API: '"http://localhost:8080/api"'
```
Obs.: Neste exemplo a api está rodando na porta 8080 no endereço localhost
Atenção: Não remova as aspas dupla

### Iniciar app no modo de desenvolvimento (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Liberar app para produção
```bash
quasar build
```

---

## Suposições e caracteristicas do projeto

### UX
Este projeto possui uma aparência moderna, totalmente responsiva e com várias dicas ao longo das telas
para orientar o usuário. Essas dicas estão em forma de ícones, textos em descate, tooltip e mensagens
de erro caso uma restriçaõ seja acionada.

### Validação
Todos os campos com restrição possuem validação. Caso a restrição seja quebrada o sistema alerta o usuário
sobre o possível erro.

### Menu
O projeto possui um menu principal que só pode ser acessado de acordo com os privilégios do usuário.
Ele possui as seguintes opções:

#### Usuários
Este menu é destinado ao usuário com privilégio de Administrador. Aqui ele pode visualizar, cadastrar, editar 
e excluir (se possível) os usuários do sistema.
Obs.: Não é possível excluir usuários que já realizarm ao menos um parecer.

#### Processos
Este menu é destinado ao usuário com privilégio de Triador. Aqui ele pode visualizar, cadastrar e atribuir um
processo a um ou vários usuários que deveram realizar um parecer sobre ele. 
Obs.: É possivel editar a lista de usuários para cada processo já cadastrado. O sistema não proíbe excluir
usuários que já realizaram um parecer sobre o processo, porem o parecer não é deletado, ficando assim como 
um registro de histórico.

#### Processos pendentes
Este menu é destinado ao usuário com privilégio de Finalizador. Aqui ele pode visualizar a lista de processos pendentes
de parecer destinados a ele e adicionar um parecer para cada um deles.

### Níveis de Acesso
Este app conta com 3 níveis de acesso as suas funcionalidades:
– Administrador
– Triador
– Finalizador
Cada usuário deve estar vinculado ao menos em um desses perfis. O sistema permite q um usuário seja vinculado a mais
de um perfil, dando a ele maior acesso a aplicação.
Ex.: Se um usuário tiver todos os perfís, ele terá acesso as todas as funcionalidades.

#### Rotas
As rotas da aplicação são liberadas por nível de acesso. Caso um usuário tente acessar uma roda não permitida
ele será redirecionado para sua rota de destino principal

#### Tela de erro
Caso o usuário tente acessa um destino (rota) não existente ele será enviado para uma tela de Erro 404