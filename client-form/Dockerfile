# Etapa 1: Construção da aplicação React
FROM node:18 AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência para o container
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Etapa 2: Servir os arquivos estáticos com o Nginx
FROM nginx:1.23-alpine

# Copiar a build da etapa anterior para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar o arquivo de configuração do Nginx, se necessário (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta usada pelo Nginx
EXPOSE 80

# Comando padrão para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
