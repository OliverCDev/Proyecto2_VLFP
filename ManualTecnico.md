
# 📘 Manual Técnico - Proyecto 2: Analizador y Transpilador

## 🧠 Descripción General

Este proyecto implementa un analizador léxico y sintáctico para un lenguaje similar a C#, con un transpilador que genera código compatible con TypeScript. Incluye una interfaz gráfica web que permite ingresar código, analizarlo y visualizar los resultados.

---

## 📁 Estructura del Proyecto

```
Proyecto2/
│
├── src/
│   ├── Analyzer/              # Analizadores léxico, sintáctico y transpilador
│   ├── controllers/           # Controladores para manejo de rutas
│   ├── models/                # AST, tabla de símbolos, tipos y tokens
│   ├── routers/               # Rutas para peticiones al backend
│   └── index.ts               # Punto de entrada principal
│
├── views/                     # Vistas EJS de la interfaz
├── public/                    # JS y CSS para frontend
├── ManualTecnico.md
└── ManualUsuario.md
```

---

## 🔍 Analizador Léxico

Se encuentra en `src/Analyzer/LexicalAnalyzer.ts`. Usa un AFD para reconocer:

- Palabras reservadas (`int`, `string`, `Console`, etc.)
- Identificadores, números (`INTEGER`, `FLOAT`)
- Cadenas (`STRING`), caracteres (`CHAR`), booleanos
- Comentarios (`//`, `/* */`)
- Errores léxicos

Produce una lista de tokens y otra de errores léxicos.

---

## 🧾 Analizador Sintáctico

Ubicado en `src/Analyzer/SyntaxAnalyzer.ts`.

- Reconoce instrucciones como `Console.WriteLine(...)`
- Construye una lista de nodos del AST
- Detecta errores sintácticos

---

## 🌳 Árbol de Sintaxis Abstracta (AST)

Cada instrucción (como `Print`) extiende de una clase `Instruction` y tiene métodos:

- `translate()`: devuelve la traducción a TypeScript
- `execute()`: simula la ejecución y genera salida

---

## 🔁 Transpilador

Archivo: `src/Analyzer/Transpiler.ts`

- Recorre el AST y genera código TypeScript
- Traduce `Console.WriteLine("Hola")` a `console.log("Hola");`

---

## 🧠 Tabla de Símbolos

- Clase `SymbolTable` (singleton)
- Guarda identificadores encontrados
- Se puede consultar desde el frontend

---

## ⚙️ Backend

- Usa Express y TypeScript
- Rutas en `src/routers/analyzer.router.ts`
- Controlador principal en `analyze.controller.ts`

---

## 💻 Interfaz Web

- Entrada de texto para el código fuente
- Botones: Analizar, Ver errores, Ver tokens, Ver símbolos
- Resultados: consola, tabla de tokens, errores, símbolos y traducción

---

## 🚀 Ejecución

```bash
npm install
npm run dev
```

---

## ✅ Cumplimiento del Enunciado

- Analizador léxico y sintáctico ✔️
- AST y transpilación ✔️
- Tabla de símbolos ✔️
- Interfaz gráfica web ✔️
- Manuales ✔️

