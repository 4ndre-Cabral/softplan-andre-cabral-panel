# Painel desafio Softplan (softplan-andre-cabral-panel)

Painel com todas as funcionalidades do desafio

---

## Instalação

### Instalar dependências
```bash
npm install
```

### Instalar Quasar
Veja [Quasar CLI](https://quasar.dev/quasar-cli).

### Apontar app para a URL da api
Antes de rodar o app é necessário aponta-lo para a URL da api.
Para isso vá até o arquivo
`src/config/dev.env.js`
e altere a variável API
```json
API: '"http://localhost:8080/api"'
```
> Obs.: Neste exemplo a api está rodando na porta 8080 no endereço localhost

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
para orientar o usuário. Essas dicas estão em forma de ícones, textos em destaque, tooltip e mensagens
de erro caso uma restrição seja acionada.

### Validação
Todos os campos com restrição possuem validação. Caso a restrição seja quebrada o sistema alerta o usuário
sobre o possível erro.

### Níveis de Acesso
Este app conta com 3 níveis de acesso as suas funcionalidades:
> Administrador

> Triador

> Finalizador

Cada usuário deve estar vinculado ao menos em um desses perfis. O sistema permite q um usuário seja vinculado a mais
de um perfil, dando a ele maior acesso a aplicação.

> Ex.: Se um usuário tiver todos os perfis, ele terá acesso as todas as funcionalidades.

### Menu
O projeto possui um menu principal que só pode ser acessado de acordo com os privilégios do usuário.
Ele possui as seguintes opções:

#### Usuários
Este menu é destinado ao usuário com privilégio de Administrador. Aqui ele pode visualizar, cadastrar, editar 
e excluir (se possível) os usuários do sistema.
> Obs.: Não é possível excluir usuários que já cadastraram ao menos um parecer.

#### Processos
Este menu é destinado ao usuário com privilégio de Triador. Aqui ele pode visualizar, cadastrar e atribuir um
processo a um ou vários usuários que deverão realizar um parecer sobre ele.

#### Processos pendentes
Este menu é destinado ao usuário com privilégio de Finalizador. Aqui ele pode visualizar a lista de processos pendêntes
de parecer destinados a ele e adicionar um parecer para cada um deles.

### Rotas
As rotas da aplicação são liberadas por nível de acesso. Caso um usuário tente acessar uma roda não permitida
ele será redirecionado para sua rota de destino principal

### Tela de erro
Caso o usuário tente acessar um destino (rota) não existente ele será enviado para uma tela de Erro 404

### Referência
https://quasar.dev