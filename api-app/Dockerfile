# Etapa 1: Construir a aplicação
FROM node:18 AS builder

# Diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código da aplicação para dentro do container
COPY . .

# Compilar o projeto NestJS
RUN npm run build

# Etapa 2: Configurar a imagem final
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos essenciais da etapa de build
COPY --from=builder /app/dist /app/dist
COPY package*.json ./

# Instalar as dependências de produção
RUN npm install --only=production

# Expor a porta que o NestJS irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]

