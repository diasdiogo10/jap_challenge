## **Tecnologias Utilizadas**

-   **Backend:** .NET Core, C#, Entity Framework Core
-   **Frontend:** Next.js, React, Tailwind CSS, Shadcn UI
-   **Database:** SQL Server

## **Pré-requisitos**

-   [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
-   [Node.js LTS](https://nodejs.org/)
-   Git

## **Como Executar**

### 1 **Git Clone**

-   **https://github.com/diasdiogo10/jap_challenge.git**

### **Configuração do ".env" - Backend**

#### Crie um ficheiro ".env" na pasta "backend" com a seguinte variável:

    DefaultConnection="Server=tcp:japchallengeserver.database.windows.net,1433;Initial Catalog=JAPChallengeDB;Persist Security Info=False;User ID=adminchallenge;Password=JAPchallenge0608;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

### 2 **Executar o Backend**

-   **cd backend:**
-   **dotnet run**

### **Configuração do ".env" - Frontend**

#### Crie um ficheiro ".env" na pasta "backend" com a seguinte variável:

    NEXT_PUBLIC_API_BASE_URL = "http://localhost:5003"

### 2 **Executar o Frontend**

-   **cd frontend**
-   **npm install**
-   **npm run dev**

## **Nota importante!**

#### A base de dados está hospedada num servidor com recursos limitados e pode entrar em modo repouso (hibernação) após algum tempo de inatividade.

#### Se os dados não aparecerem imediatamente ao abrir o frontend, para "acordar" o serviço, navegue pela app, por exemplo, carregue em clients, depois vehicles, depois new vehicle, etc.

#### Depois disso, os dados deverão carregar normalmente.
