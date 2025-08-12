# Backend

## Abordagem

-   **Code-First** - Criar as entidades (models) necessários para o desafio, a partir dessas classes, o EF Core cria automaticamente a base de dados e as tabelas correspondentes.

## Tecnologias e Ferramentas

-   .NET Core
-   C#
-   Entity Framework Core (ORM)
-   SQL Server

## Estrutura do projeto

-   **Controllers**
    -   Responsáveis por gerir as requisições e devolver as respostas, controlando a lógica de entrada e saída
-   **Data/AppDbContext.cs**
    -   Faz a ligação entre a aplicação e a base de dados, gerindo as entidades e operações de leitura/escrita.
-   **Dtos**
    -   Objetos usados para transferir dados entre camadas da aplicação, simplificando e protegendo a estrutura interna.
-   **Mappings/ConfigurationMapping.cs**
    -   Definem as regras para converter dados entre diferentes objetos, Models e Dtos.
-   **Migrations**
    -   Scripts que permitem criar e atualizar a estrutura da base de dados de forma controlada e versionada.
-   **Models**
    -   Representações das entidades do domínio da aplicação, refletindo as tabelas e dados principais.
-   **Program.cs**
    -   Ponto de entrada da aplicação, onde a configuração inicial e o arranque do servidor são definidos.
-   **.env**
    -   Ficheiro de configuração onde se armazenam variáveis sensíveis e parâmetros importantes, como a string de ligação à base de dados.
