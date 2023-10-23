# Etapa de construcción para instalar dependencias
FROM node:14-alpine AS builder
ENV WORKDIR /usr/src/app/
WORKDIR $WORKDIR
COPY package*.json $WORKDIR
RUN npm install --production --no-cache

# Etapa final para copiar las dependencias y aplicar la seguridad
FROM node:14-alpine
ENV USER=node
ENV WORKDIR /home/$USER/app
WORKDIR $WORKDIR

# Copiar las dependencias del contenedor builder
COPY --from=builder /usr/src/app/node_modules node_modules

# Establecer permisos adecuados
RUN chown -R $USER:$USER $WORKDIR

# Copiar el código de la aplicación con el usuario no root
COPY --chown=node . $WORKDIR
# In production environment uncomment the next line
#RUN chown -R $USER:$USER /home/$USER && chmod -R g-s,o-rx /home/$USER && chmod -R o-wrx $WORKDIR
# Then all further actions including running the containers should be done under non-root user.
# Asegurar permisos de directorio

RUN chmod -R o-rwx $WORKDIR && chmod -R g-s $WORKDIR

# Usar un usuario no root para ejecutar la aplicación
USER $USER

# Exponer el puerto necesario
EXPOSE 4000
