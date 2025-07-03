
# 👤 Manual de Usuario - Proyecto 2

## 🎯 Propósito

Esta herramienta permite analizar código de un lenguaje similar a C# y obtener su traducción a TypeScript, junto con tokens, errores y tabla de símbolos.

---

## 🖥️ Interfaz Principal

Al ingresar a la aplicación web, verás:

- **Editor de código**: donde escribes tu entrada
- **Botón “Analizar”**: ejecuta el análisis
- **Salida de consola**: muestra la ejecución del código
- **Tabla de tokens**: muestra los tokens válidos encontrados
- **Tabla de errores**: muestra los errores léxicos o sintácticos
- **Tabla de símbolos**: identifica variables válidas
- **Traducción generada**: código equivalente en TypeScript

---

## ✍️ Cómo usar

1. **Escribe tu código** en el editor. Ejemplo:

   ```
   int x = 5;
   string saludo = "Hola";
   Console.WriteLine(saludo);
   ```

2. Presiona **“Analizar”**

3. Observa:
   - Traducción generada
   - Consola de salida (simulación de ejecución)
   - Tokens válidos
   - Errores detectados
   - Tabla de símbolos

---

## 🔄 Ejemplo

### Entrada:

```cs
int x = 10;
string saludo = "Hola mundo";
Console.WriteLine(saludo);
```

### Traducción:

```ts
let x = 10;
let saludo = "Hola mundo";
console.log(saludo);
```

### Salida en consola:

```
Hola mundo
```

---

## ❗ Errores

Si cometes errores (como olvidarte un `;` o escribir mal un identificador), el sistema los mostrará en la sección de errores con fila y columna.

---

## 📋 Requisitos

- Navegador actualizado
- Tener el servidor ejecutándose con:

```bash
npm install
npm run dev
```

---

## 🧼 Para reiniciar

Recarga la página o modifica el código y vuelve a analizar.

---

## ✅ Funcionalidad Cubierta

- Análisis léxico y sintáctico
- Simulación de ejecución
- Traducción a TypeScript
- Tabla de símbolos
- Reporte de errores

---

Gracias por usar el sistema 🎉
