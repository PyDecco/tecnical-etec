# Etapa 1: Build do frontend
FROM node:18 AS frontend-build

# Definindo o diretório de trabalho para o frontend
WORKDIR /app/client-form

# Copiar o package.json do frontend e instalar dependências
COPY client-form/package*.json ./
RUN npm install

# Copiar todos os arquivos do frontend
COPY client-form/ .

# Criar a build do frontend
RUN npm run build

# Etapa 2: Build do backend
FROM node:18 AS backend-build

# Definindo o diretório de trabalho para o backend
WORKDIR /app/api-app

# Copiar o package.json do backend e instalar dependências
COPY api-app/package*.json ./
RUN npm install

# Copiar todos os arquivos do backend
COPY api-app/ .

# Expor a porta 3000 (backend)
EXPOSE 3000

# Copiar o build do frontend para a pasta pública do backend
COPY --from=frontend-build /app/client-form/build /app/api-app/public

# Comando para rodar a aplicação do backend
CMD ["npm", "run", "start:prod"]
