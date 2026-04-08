# ⚡ QUICK START: Subir a GitHub en 10 Minutos

## 📋 Resumen

Este documento te guía **paso a paso** para subir tu Design System a GitHub en poco tiempo.

---

## PASO 1️⃣ Crear Repositorio en GitHub (2 min)

1. Ve a https://github.com/new
2. Completa:
   - **Repository name:** `design-system`
   - **Description:** `Actuaría Design System - Design Tokens`
   - **Visibility:** `Public` (equipo puede acceder) o `Private`
   - **License:** `MIT`
3. Click **Create repository**
4. Copia la URL que aparece: `https://github.com/tu-usuario/design-system.git`

---

## PASO 2️⃣ Descargar Archivos (1 min)

Descarga todos estos archivos desde `/mnt/user-data/outputs/`:

**Archivos principales:**
- `design-tokens.css`
- `tokens.ts`
- `Tokens.stories.mdx`
- `IMPLEMENTATION-GUIDE.md`
- `GITHUB_README.md`
- `package.json`
- `GITHUB_CONFIGS.md`

**Coloca en una carpeta local** llamada `design-system/`

---

## PASO 3️⃣ Crear Estructura de Carpetas (1 min)

```bash
cd design-system

# Crear carpetas
mkdir -p src/tokens
mkdir -p src/styles
mkdir -p src/.storybook
mkdir -p src/components
mkdir -p scripts
mkdir -p tests
mkdir -p docs
mkdir -p .github/workflows
```

---

## PASO 4️⃣ Organizar Archivos (2 min)

```
design-system/
├── src/
│   ├── tokens/
│   │   └── index.ts (copia de tokens.ts)
│   ├── styles/
│   │   └── design-tokens.css
│   ├── .storybook/
│   │   └── Tokens.stories.mdx
│   └── components/
│       └── (archivos de componentes)
├── docs/
│   ├── GETTING-STARTED.md (copia de IMPLEMENTATION-GUIDE.md)
│   └── ARCHITECTURE.md
├── .github/
│   └── workflows/
│       ├── sync-tokens.yml
│       ├── test.yml
│       └── publish.yml
├── README.md (copia de GITHUB_README.md)
├── package.json
├── LICENSE (MIT)
├── .gitignore
├── .eslintrc.json
├── .prettierrc.json
├── tsconfig.json
├── .env.example
└── CHANGELOG.md
```

**Para los archivos de configuración, copia el contenido de `GITHUB_CONFIGS.md`**

---

## PASO 5️⃣ Inicializar Git Localmente (2 min)

```bash
cd design-system

# Inicializar repo
git init

# Configurar usuario
git config user.name "Tu Nombre"
git config user.email "tu-email@actuaria.com"

# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "chore: initial design system setup"

# Renombrar rama a main
git branch -M main
```

---

## PASO 6️⃣ Subir a GitHub (2 min)

```bash
# Agregar repositorio remoto (reemplaza URL)
git remote add origin https://github.com/TU-USUARIO/design-system.git

# Subir archivos
git push -u origin main
```

**Si pide contraseña:**
- Usar **GitHub Personal Access Token** (no contraseña)
- Crear en: Settings → Developer settings → Personal access tokens

---

## ✅ VERIFICAR

Abre https://github.com/tu-usuario/design-system

Deberías ver:
- ✅ Todos los archivos
- ✅ README.md mostrando en la página principal
- ✅ Estructura de carpetas

---

## 🚀 SIGUIENTE FASE (Opcional)

### Invitar Equipo
1. Settings → Collaborators → Add people
2. Busca y agrega miembros

### Configurar GitHub Actions (para auto-sync)
1. Settings → Secrets and variables → Actions
2. New repository secret: `FIGMA_API_TOKEN`
3. New repository secret: `FIGMA_FILE_ID` = `N1wh3u4sX3UGyUU5oWOaz6`

### Proteger Rama Main
1. Settings → Branches
2. Add rule para `main`
3. Require pull request reviews

---

## 📚 DOCUMENTACIÓN COMPLETA

Para detalles completos, ver:
- **GITHUB-SETUP-GUIDE.md** → Guía paso a paso detallada
- **GITHUB_README.md** → README del repositorio
- **IMPLEMENTATION-GUIDE.md** → Cómo usar los tokens

---

## ❓ PROBLEMAS COMUNES

### "fatal: not a git repository"
```bash
git init
# Luego repite desde PASO 5
```

### "Permission denied"
- Usar token en lugar de contraseña
- Crear token en: https://github.com/settings/tokens

### "Rama protegida"
- Crear rama: `git checkout -b feature/my-feature`
- Hacer PR desde GitHub

---

## 🎉 ¡LISTO!

Tu Design System está en GitHub. Ahora:

1. **Comparte la URL** con tu equipo
2. **Invita colaboradores**
3. **Comienza a usar los tokens** en tus proyectos

```bash
# Tu equipo puede clonar con:
git clone https://github.com/tu-usuario/design-system.git
cd design-system
npm install
npm run storybook  # Ver tokens en localhost:6006
```

---

**¿Preguntas?** Consulta GITHUB-SETUP-GUIDE.md o abre un issue en GitHub.

**Tiempo total:** ~10 minutos ⚡
