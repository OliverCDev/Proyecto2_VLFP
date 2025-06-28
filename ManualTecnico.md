# Manual Técnico: Analizador Léxico y Visualización de Carreras

## Índice
- [Manual Técnico: Analizador Léxico y Visualización de Carreras](#manual-técnico-analizador-léxico-y-visualización-de-carreras)
  - [Índice](#índice)
  - [Introducción](#introducción)
  - [Descripción del Analizador Léxico](#descripción-del-analizador-léxico)
  - [Estructura del Código](#estructura-del-código)
  - [Funcionamiento del Analizador](#funcionamiento-del-analizador)
  - [Alfabeto y Tokens Reconocidos](#alfabeto-y-tokens-reconocidos)
  - [Autómata Finito Determinista (AFD)](#autómata-finito-determinista-afd)
  - [Enumeración `Type` y Clase `Token`](#enumeración-type-y-clase-token)
    - [Enumeración `Type`](#enumeración-type)
    - [Clase `Token`](#clase-token)
  - [Construcción de Carreras desde Tokens](#construcción-de-carreras-desde-tokens)
  - [Interfaz Web del Analizador de Carreras](#interfaz-web-del-analizador-de-carreras)
    - [Características](#características)
    - [Flujo](#flujo)
  - [Vista de Carreras, Semestres y Cursos](#vista-de-carreras-semestres-y-cursos)
    - [Características](#características-1)
  - [Vista de Errores Léxicos](#vista-de-errores-léxicos)

---

## Introducción

Este manual describe el funcionamiento del sistema desarrollado para el análisis léxico de estructuras de carreras universitarias, que incluyen semestres y cursos. El sistema se compone de un analizador léxico, una lógica de construcción de objetos a partir de tokens, y una interfaz web para visualizar el contenido de manera estructurada.

## Descripción del Analizador Léxico

El analizador procesa texto plano para extraer tokens como palabras reservadas, cadenas, números y símbolos especiales. Utiliza un autómata de estados para determinar la validez y tipo de cada componente del texto.

## Estructura del Código

- **Variables internas principales:**
  - `row` y `column`: posición actual del análisis.
  - `auxChar`, `auxWord`: acumuladores temporales.
  - `state`: estado actual del AFD.
  - `tokenList`, `errorList`: almacenamiento de resultados.

- **Constantes:**
  - `RESERVED_WORDS`: palabras clave como `"Carrera"`, `"Semestre"`, `"Curso"`, etc.

- **Funciones clave:**
  - `scanner(input: string)`: analiza el texto.
  - `addToken(...)`, `addError(...)`: gestión de resultados.
  - `addCharacter(...)`, `clear(...)`: manejo de buffers.

## Funcionamiento del Analizador

1. Se recorre el texto carácter por carácter.
2. Dependiendo del tipo y del estado actual, se acumulan caracteres y se cambia de estado.
3. Cuando se reconoce un token, se agrega a la lista.
4. Los caracteres inválidos generan errores léxicos.
5. El análisis finaliza al llegar al carácter `#`.

## Alfabeto y Tokens Reconocidos

- **Símbolos:** `{`, `}`, `[`, `]`, `:`, `;`, `"`, `(`, `)`
- **Palabras reservadas:** `"Carrera"`, `"Semestre"`, `"Curso"`, `"Nombre"`, `"Area"`, `"Prerrequisitos"`
- **Cadenas:** textos entre comillas `"..."`.
- **Números:** cualquier secuencia numérica.
- **Errores:** cualquier carácter no válido.

## Autómata Finito Determinista (AFD)

Consta de varios estados numerados que identifican transiciones según caracteres válidos. Entre ellos:

- `0`: estado inicial
- `11`: palabras reservadas y cadenas
- `10`: números
- `2-5`, `7`, `9`, `12-14`: símbolos y delimitadores

Las transiciones permiten construir una tabla o diagrama

![Diagrama AFD](./afd.png)

## Enumeración `Type` y Clase `Token`

### Enumeración `Type`

Define los tipos de tokens como `PALABRA_RESERVADA`, `CADENA_DE_TEXTO`, `NUMERO`, `LLAVE_ABRE`, etc.

### Clase `Token`

Contiene:

- `row`, `column`: ubicación del token
- `lexema`: valor exacto
- `typeToken`: tipo según `Type`
- `typeTokenString`: nombre legible del tipo

## Construcción de Carreras desde Tokens

La función `construirCarreras(tokens)`:

- Recorre la lista de tokens detectando estructuras de carreras.
- Identifica semestres, cursos, nombres, áreas y prerrequisitos.
- Construye objetos `Carrera`, `Semestre` y `Curso`.

El resultado es una lista estructurada de carreras que se puede visualizar dinámicamente.

## Interfaz Web del Analizador de Carreras

### Características

- **Editor** con soporte para escritura, carga y guardado.
- **Botón Analizar** que envía el contenido al backend.
- **Tabla de Tokens** con información detallada del análisis.
- **Resaltado de colores** (opcional con CodeMirror) para:
  - Azul: palabras reservadas
  - Naranja: cadenas
  - Morado: números
  - Negro: símbolos

### Flujo

1. El usuario escribe o carga un archivo.
2. Se hace `fetch("/analyze")`.
3. Se muestran tokens, errores o la vista de carreras.

## Vista de Carreras, Semestres y Cursos

### Características

- Muestra todas las carreras con sus semestres y cursos.
- Por cada curso: número, nombre, área, prerrequisitos.
- Al hacer clic en un curso:
  - Se selecciona.
  - Se resaltan en **amarillo** sus prerrequisitos.
- Si hay múltiples carreras con cursos iguales, se distingue usando prefijos únicos.

## Vista de Errores Léxicos

- Tabla que muestra errores detectados con fila, columna y tipo.
- Se accede desde el menú "Error Report".
- Utiliza `localStorage` para persistencia temporal.

---
