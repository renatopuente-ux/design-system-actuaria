# 📤 GUÍA: Subir Design System a GitHub

Esta guía paso a paso te llevará a crear y configurar tu repositorio de Design System en GitHub para que todo tu equipo pueda usarlo.

---

## 🚀 PASO 1: Crear Repositorio en GitHub

### 1.1 Accede a GitHub

1. Ve a [github.com](https://github.com)
2. Si no estás logueado, inicia sesión con tu cuenta

### 1.2 Crear Nuevo Repositorio

1. Click en **+** (esquina superior derecha)
2. Selecciona **New repository**
3. Completa el formulario:

```
Repository name:     design-system
Description:         Actuaría Design System - Design Tokens (Figma → CSS/TS/Storybook)
Visibility:          Public (para que equipo pueda acceder) o Private (si es interno)
Initialize with:     Add a README file ✗ (lo haremos manualmente)
                     Add .gitignore ✗ (lo haremos manualmente)
                     Choose a license: MIT ✓
```

4. Click **Create repository**

### 1.3 Copiar URL del Repositorio

- Aparecerá algo como: `https://github.com/tu-usuario/design-system.git`
- Copia esta URL (la necesitarás pronto)

---

## 💻 PASO 2: Preparar Archivos Locales

### 2.1 Crear Carpeta del Proyecto

```bash
# En tu terminal local
mkdir design-system
cd design-system

# Inicializar como repo git
git init
git config user.name "Tu Nombre"
git config user.email "tu-email@actuaria.com"
```

### 2.2 Agregar Archivos

Descarga todos estos archivos y colócalos en la carpeta `design-system/`:

**En la raíz:**
```
.gitignore
.env.example
.eslintrc.json
.prettierrc.json
jest.config.js
tsconfig.json
package.json
LICENSE (MIT)
CODE_OF_CONDUCT.md
CHANGELOG.md
README.md (usa GITHUB_README.md)
```

**Crear carpetas:**
```bash
mkdir -p src/tokens
mkdir -p src/styles
mkdir -p src/components
mkdir -p src/.storybook
mkdir -p scripts
mkdir -p tests
mkdir -p docs
mkdir -p .github/workflows
```

**Copiar archivos de tokens:**
- `src/tokens/index.ts` (usa tokens.ts)
- `src/styles/design-tokens.css` (usa design-tokens.css)
- `src/.storybook/Tokens.stories.mdx` (usa Tokens.stories.mdx)

**Documentación:**
```bash
cp IMPLEMENTATION-GUIDE.md docs/GETTING-STARTED.md
cp README-DESIGN-TOKENS-PIPELINE.md docs/ARCHITECTURE.md
```

### 2.3 Crear .github/workflows/

Crear dos archivos en `.github/workflows/`:

1. **sync-tokens.yml** - (copia de .github-workflows.yml - parte 1)
2. **publish.yml** - (copia de .github-workflows.yml - parte 2)
3. **test.yml** - (copia de .github-workflows.yml - parte 3)

---

## 📤 PASO 3: Subir a GitHub

### 3.1 Agregar Todos los Archivos

```bash
# Agregar todos los archivos
git add .

# Ver qué se va a subir
git status

# Crear primer commit
git commit -m "chore: initial design system setup"
```

### 3.2 Conectar con Repositorio Remoto

```bash
# Agregar la URL que copiamos en 1.3
git remote add origin https://github.com/tu-usuario/design-system.git

# Renombrar rama a 'main' si es necesario
git branch -M main

# Subir los archivos
git push -u origin main
```

**Si pide autenticación:**
- GitHub usa tokens en lugar de contraseñas
- Crear token: Settings → Developer settings → Personal access tokens
- Usar token como contraseña cuando pide

### 3.3 Verificar en GitHub

1. Ve a `https://github.com/tu-usuario/design-system`
2. Deberías ver todos tus archivos ✅

---

## 🔐 PASO 4: Configurar Secretos en GitHub (Opcional - Para Auto-Sync)

Si quieres sincronización automática desde Figma:

### 4.1 Obtener Credenciales Figma

1. Ve a [Figma Settings](https://www.figma.com/files/account)
2. Click en **Personal access tokens**
3. Click **Create a new token**
4. Dale nombre: "GitHub Design Tokens Sync"
5. Copia el token (lo usarás una sola vez)

### 4.2 Agregar Secretos a GitHub

1. Ve a tu repo: `https://github.com/tu-usuario/design-system`
2. Click en **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

Agregar estos secretos:

| Nombre | Valor |
|--------|-------|
| FIGMA_API_TOKEN | [token que copiaste en 4.1] |
| FIGMA_FILE_ID | N1wh3u4sX3UGyUU5oWOaz6 |
| NPM_TOKEN | (opcional) tu npm token |
| SLACK_WEBHOOK_URL | (opcional) tu slack webhook |

---

## 👥 PASO 5: Invitar Equipo

### 5.1 Configurar Acceso

1. Ve a **Settings** → **Collaborators**
2. Click **Add people**
3. Busca y agrega miembros del equipo

### 5.2 Roles Recomendados

| Rol | Permisos | Para |
|-----|----------|------|
| **Admin** | Todo | Tech lead, Architects |
| **Maintain** | Merge PRs | Senior developers |
| **Write** | Push, PRs | Developers, Designers |
| **Read** | View only | Stakeholders, QA |

---

## 📚 PASO 6: Documentación en Wiki (Opcional)

Si quieres más documentación accesible:

1. Ve a tu repo
2. Click en **Wiki** tab
3. Click **Create the first page**
4. Crea páginas para:
   - Home
   - Getting Started
   - Tokens Reference
   - Troubleshooting

---

## 🚀 PASO 7: Configurar Rama Protegida

Para evitar que alguien pushee directamente a `main`:

1. **Settings** → **Branches**
2. Click en **Add rule**
3. Configurar:
   ```
   Branch name pattern: main
   
   ✓ Require pull request reviews before merging
   ✓ Require status checks to pass before merging
   ✓ Dismiss stale pull request approvals
   ```

---

## 🔄 PASO 8: Configurar CI/CD (GitHub Actions)

### 8.1 Verificar Workflows

1. Ve a **Actions** en tu repo
2. Deberías ver:
   - ✅ Tests & Linting
   - ✅ Sync Design Tokens from Figma
   - ✅ Publish to NPM

### 8.2 Habilitar Actions

Si aparecen deshabilitadas:

1. **Settings** → **Actions** → **General**
2. Selecciona: "Allow all actions and reusable workflows"
3. Click **Save**

---

## 📖 PASO 9: Crear Documentación Inicial

### 9.1 Crear `docs/CONTRIBUTING.md`

```markdown
# Contributing to Actuaría Design System

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-name/design-system.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Test: `npm test`
6. Push: `git push origin feature/your-feature`
7. Create a Pull Request

## Pull Request Process

1. Update README.md if needed
2. Add tests for new features
3. Ensure `npm test` passes
4. Request review from maintainers

## Code Standards

- Use TypeScript
- Follow ESLint rules: `npm run lint`
- Format with Prettier: `npm run format`
- Write meaningful commit messages
```

### 9.2 Crear `docs/TOKENS-REFERENCE.md`

(Usa EXECUTIVE-SUMMARY.md como base)

---

## ✅ PASO 10: Verificación Final

### Checklist

- [ ] Repositorio creado en GitHub
- [ ] Todos los archivos están en la rama main
- [ ] README.md aparece en la página principal
- [ ] Colaboradores invitados
- [ ] Secretos GitHub configurados (si aplica)
- [ ] GitHub Actions habilitadas
- [ ] Rama main está protegida
- [ ] Documentación en `/docs`

### Test del Repositorio

```bash
# Clonar como si fuera otro usuario
cd /tmp
git clone https://github.com/tu-usuario/design-system.git
cd design-system
npm install
npm run type-check
npm run lint
npm test
```

---

## 🎯 AHORA QUE ESTÁ CONFIGURADO

### Para tu Equipo de Diseño

```bash
# Clonar
git clone https://github.com/tu-usuario/design-system.git

# Ver documentación
open https://github.com/tu-usuario/design-system/blob/main/README.md

# Ver tokens en Storybook (cuando esté deployed)
open https://tu-usuario.github.io/design-system
```

### Para tu Equipo de Desarrollo

```bash
# Clonar
git clone https://github.com/tu-usuario/design-system.git
cd design-system

# Instalar
npm install

# Ver en Storybook
npm run storybook
# Abre http://localhost:6006

# Usar en tu proyecto
npm install @actuaria/design-system
```

---

## 🔗 Enlaces Útiles

- **Tu Repo:** `https://github.com/tu-usuario/design-system`
- **Configuración:** `https://github.com/tu-usuario/design-system/settings`
- **Acciones:** `https://github.com/tu-usuario/design-system/actions`
- **Wiki:** `https://github.com/tu-usuario/design-system/wiki`
- **Proyectos:** `https://github.com/tu-usuario/design-system/projects`

---

## 🆘 Troubleshooting

### "Permiso denegado"

```bash
# Verificar credenciales
git config --global user.name
git config --global user.email

# Usar HTTPS con token
git remote set-url origin https://token@github.com/tu-usuario/design-system.git
```

### "Rama protegida"

- No se puede pushear directamente a `main`
- Crear rama feature: `git checkout -b feature/my-feature`
- Hacer PR desde GitHub

### "GitHub Actions no funciona"

1. Verificar que workflows están en `.github/workflows/`
2. Verificar que Actions estén habilitadas
3. Checar syntax YAML con linter online

---

## 📞 Próximos Pasos

1. **Invita a tu equipo** a colaborar
2. **Crea issues** para nuevas funcionalidades
3. **Agrega el repo a tu documentación** del equipo
4. **Configura notificaciones** en Slack/Email
5. **Haz tu primer release** tagging como `v1.0.0`

---

**¡Felicidades! Tu Design System está en GitHub y listo para todo el equipo! 🎉**

Próximo paso: [Ver README.md para usar los tokens](./README.md)
