# AGENTS.md — cabanaspv

Reglas obligatorias para todos los agentes que trabajen en este repositorio.
Ninguna regla de este archivo es opcional.

---

## 1. Indexado MCP — SIEMPRE primero y mantenido al día

- **Antes de cualquier análisis, búsqueda, refactor o modificación**, verificar el estado del índice:
  ```
  codebase-memory-mcp → index_status(project="cabanaspv")
  ```
- Si el índice **falta, está desactualizado** o el HEAD cambió desde la última indexación → re-indexar:
  ```
  codebase-memory-mcp → index_repository(
    repo_path="/mnt/d/LLLIT/Code-W11/NextJS/cabanaspv",
    name="cabanaspv",
    mode="fast"          // primera indexación o cambios grandes → mode="full"
  )
  ```
- **Usar SIEMPRE las herramientas MCP antes que grep/glob**, en este orden:
  1. `search_graph` — buscar por patrón o consulta en lenguaje natural
  2. `get_architecture` — visión general (clusters, boundaries, dependencias)
  3. `trace_path` — trazar llamadores/llamadas y flujo de datos
  4. `get_code_snippet` — leer fuente de una función/clase específica
  5. `query_graph` — consultas Cypher multi-hop
  6. Fallback: `search_code` → grep → glob (**solo si el MCP no encuentra algo**)
- **Regla del parámetro `project`**: usar SIEMPRE el nombre corto `cabanaspv`, **NUNCA** la ruta completa del filesystem.
- **Mantener el índice actualizado**: tras cada cambio sustancial (nuevos módulos, APIs, componentes grandes), re-indexar:
  ```
  codebase-memory-mcp → index_repository(repo_path="/mnt/d/LLLIT/Code-W11/NextJS/cabanaspv", name="cabanaspv", mode="fast")
  ```
  Cierre de tarea: `head_sha` del índice == HEAD del repo y `nodes`/`edges` coherentes con los cambios realizados.

---

## 2. Prohibido ejecutar comandos `git` y `pnpm`

- **NUNCA ejecutar ningún comando `git`**: no `git add`, `git commit`, `git push`, `git checkout`, `git merge`, `git rebase`, `git reset`, `git stash`, ni ningún otro subcomando. El agente **no toca el control de versiones**; el usuario lo hace manualmente.
- **NUNCA ejecutar ningún comando `pnpm`**: no `pnpm install`, `pnpm i`, `pnpm add`, `pnpm remove`, `pnpm update`, `pnpm dev`, `pnpm build`, ni ningún otro subcomando. El agente **no instala, actualiza ni ejecuta scripts de dependencias**.
- Esto aplica también a variantes encadenadas (`cd x && git ...`, `pnpm ... && ...`), scripts npm que invocuen git/pnpm, y flags de cualquier tipo.
- Si una tarea parece requerir uno de estos comandos → **detenerse y preguntar al usuario** para que él lo ejecute, indicando el comando exacto listo para copiar.
- Corolario: no modificar `pnpm-lock.yaml`, `pnpm-workspace.yaml` ni `package.json` (scripts/dependencias) salvo petición explícita del usuario.

---

## 3. PRD obligatorio para toda nueva implementación

- **Toda nueva implementación** (feature, módulo, endpoint, componente relevante, refactor estructural) **requiere un PRD antes de escribir código**.
- Ruta y nombre obligatorios:
  ```
  /docs/PRD-NNN-detalle.md
  ```
  - `NNN` = número correlativo de 3 dígitos, asignado en orden creciente (001, 002, 003…). Revisar `/docs/` para tomar el siguiente disponible.
  - `detalle` = slug corto en kebab-case que describe la implementación (ej: `PRD-001-galeria-propiedades.md`).
- **Estructura mínima del PRD**:
  ```markdown
  # PRD-NNN — <Título de la implementación>

  ## Contexto y problema
  ## Objetivos
  ## Alcance (incluye explícitamente lo que NO está en alcance)
  ## Diseño de la solución (módulos, archivos, flujo)
  ## Plan de tests            ← OBLIGATORIO (ver regla 4)
  ## Criterios de aceptación
  ## Fuera de alcance / Riesgos
  ```
- El PRD se crea **antes** de codificar y se actualiza si el diseño cambia durante la implementación.

---

## 4. Todo PRD debe considerar sus tests

- **Todo PRD DEBE incluir la sección "Plan de tests"** que cubra:
  1. **Tests de la implementación actual** — qué se prueba, tipo (unitario / integración), qué archivos de test se crearán y qué casos de borde se cubren.
  2. **Tests que protegen implementaciones futuras** — cómo el diseño con tests permite extender la funcionalidad sin romper lo existente (contratos, fixtures, mocks reutilizables).
- **No se considera terminada una implementación sin sus tests escritos y en verde.**
- Si aún no hay framework de tests configurado, el PRD debe incluir la decisión e instalación del framework (propuesta al usuario; la instalación la ejecuta el usuario, ver regla 2).

---

## 5. Código siempre modular (diseño para testeo fácil)

- **Todo código debe ser modular**: lógica de negocio y utilidades **fuera** de los componentes/rutas, en módulos pequeños, con una responsabilidad única (SRP).
- Reglas concretas:
  - **Funciones puras y lógica extraída**: la lógica que vale la pena testear vive en módulos independientes (`src/utils/`, `src/lib/` o el dominio correspondiente), no dentro de componentes React ni de route handlers.
  - **Componentes delgados**: los componentes orquestan UI; delegan lógica en módulos importados y son faciles de testear con render + props.
  - **Dependencias inyectables**: preferir parámetros explícitos sobre imports ocultos de estado global/side-effects, para poder sustituirlos en tests.
  - **Interfaces pequeñas y exportaciones claras**: cada módulo expone una API mínima (`index.ts` como fachada cuando aporte).
  - **Sin efectos ocultos en import time**: nada de ejecutar I/O o side-effects al importar el módulo.
  - **Coherencia con la estructura existente** (`src/app`, `src/components/<Seccion>`, `src/utils`): los nuevos módulos siguen esa organización.
- **Criterio de revisión**: si una pieza de lógica no es testeable sin montar toda la app, no está bien modularizada → reestructurarla antes de darla por terminada.

---

## Resumen rápido (checklist por tarea)

1. `index_status(project="cabanaspv")` → indexar/re-indexar si hace falta.
2. Analizar con MCP (`search_graph` → `get_architecture` → `trace_path` → `get_code_snippet` → `query_graph`); grep/glob solo como fallback.
3. ¿Hay que implementar algo nuevo? → crear `/docs/PRD-NNN-detalle.md` con **Plan de tests** obligatorio.
4. Escribir código **modular** (lógica extraída, SRP, dependencias explícitas).
5. Escribir los **tests** del PRD y dejarlos en verde.
6. Re-indexar el MCP si los cambios fueron sustanciales.
7. **Jamás** ejecutar `git` ni `pnpm` → pedirle al usuario que los ejecute.
