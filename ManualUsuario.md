# 📘 Manual del Usuario Final: Sistema de Análisis de Pensum y Carreras

Este sistema permite analizar archivos con la estructura de carreras universitarias, identificar errores léxicos, y visualizar gráficamente las carreras, semestres y cursos, resaltando prerrequisitos.

---
![Menu principal](img/principal.png)

## 🏠 Página Principal: Editor de Texto

### Funcionalidad
El editor es el punto de inicio donde puedes escribir o cargar un archivo `.plfp` que describe carreras y sus estructuras.

### Opciones disponibles:
- **✏️ Área de Texto**: Ingresar código manualmente.
- **📤 Cargar Archivo**: Leer archivos `.plfp` desde tu equipo.
- **💾 Guardar Archivo**: Descargar el contenido actual como `.plfp`.
- **🔍 Analizar**: Envía el texto para su procesamiento léxico.

### Resultado del análisis:
- **Tabla de Tokens**: Muestra fila, columna, lexema y tipo de cada token reconocido.
- **Texto resaltado por colores**:
  - 🔵 Azul: Palabras reservadas
  - 🟠 Naranja: Cadenas de texto
  - 🟣 Morado: Números
  - ⚫ Negro: Otros símbolos

**🖼 Imagen de ejemplo del editor y resaltado:**
![Editor con resaltado](img/editor.png)

Además, puedes volver a editar después del análisis con el botón **"Volver a editar"**.

---

## 📚 Vista de Carreras, Semestres y Cursos

Si el análisis es exitoso, se abre automáticamente una nueva pestaña que presenta toda la estructura de carreras.

### ¿Qué muestra?
- Nombre de la carrera.
- Cada semestre con sus cursos.
- Por cada curso:
  - Número y nombre
  - Área
  - Prerrequisitos

### Interactividad
- Al hacer clic en un curso:
  - Se marca en rojo (seleccionado).
  - Se resaltan en amarillo los **prerrequisitos** del curso.
- Cada carrera está identificada de forma única, incluso si comparten cursos similares entre sí.

**🖼 Imagen de ejemplo de la vista de carreras:**
![Vista de pensum](img/pensum.png)

---

## ❌ Página de Errores Léxicos

Si el texto tiene errores léxicos, se abrirá una nueva vista con los detalles.

### Tabla de errores:
- **#**: Número de error
- **Fila**: Línea donde ocurrió
- **Columna**: Posición exacta
- **Lexema**: Texto problemático
- **Token**: Tipo de error

Si no se encontraron errores, verás un mensaje indicando que no hay errores léxicos.

**🖼 Imagen de ejemplo de errores:**
![Vista de errores](img/error.png)

## ℹ️ Consejos para el Usuario

- Asegúrate de que el archivo `.plfp` siga la estructura definida (palabras reservadas como `"Carrera"`, `"Semestre"`, etc.).
- Para corregir errores léxicos, revisa los lexemas indicados en la tabla de errores.
- Puedes reanalizar el texto después de editarlo sin necesidad de recargar la página.

---

## 🔁 Flujo Completo

1. Escribe o carga un archivo `.plfp` en el editor.
2. Haz clic en **"Analizar"**.
3. Si hay errores: se muestra la **vista de errores**.
4. Si no hay errores: se muestra la **vista de carreras y cursos**.
5. Siempre puedes regresar al editor usando **“Volver al Editor”**.

---